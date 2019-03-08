#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
detect human
"""

from uvctypes import *
from lut import *
import grpc
import time
import cv2
import sys
import numpy as np
try:
	from queue import Queue
except ImportError:
	from Queue import Queue
import platform
import cam_pb2_grpc
import cam_pb2

BUF_SIZE = 2
q = Queue(BUF_SIZE)

KELVIN_RMIN = 0 * 100.0
KELVIN_RMAX = 305.15 * 100.0

def py_frame_callback(frame, userptr):

	array_pointer = cast(frame.contents.data, POINTER(c_uint16 * (frame.contents.width * frame.contents.height)))
	data = np.frombuffer(
	array_pointer.contents, dtype=np.dtype(np.uint16)
	).reshape(
	frame.contents.height, frame.contents.width
	)

	if frame.contents.data_bytes != (2 * frame.contents.width * frame.contents.height):
		return

	if not q.full():
		q.put(data)

PTR_PY_FRAME_CALLBACK = CFUNCTYPE(None, POINTER(uvc_frame), c_void_p)(py_frame_callback)

def ktof(val):
	return (1.8 * ktoc(val) + 32.0)

def ktoc(val):
	return (val - 27315) / 100.0

def ctok(val):
	return (val * 100.0) + 27315

def raw_to_8bit(data):
	cv2.normalize(data, data, 0, 65535, cv2.NORM_MINMAX)
	np.right_shift(data, 8, data)
	return cv2.cvtColor(np.uint8(data), cv2.COLOR_GRAY2RGB)

def display_temperature(img, val_k, loc, color):
	val = ktoc(val_k)
	cv2.putText(img,"{0:.1f} degC".format(val), loc, cv2.FONT_HERSHEY_SIMPLEX, 0.75, color, 2)
	x, y = loc
	cv2.line(img, (x - 2, y), (x + 2, y), color, 1)
	cv2.line(img, (x, y - 2), (x, y + 2), color, 1)

def humanRange(data):
	mask = cv2.inRange(data, KELVIN_RMIN, KELVIN_RMAX)
	d = cv2.bitwise_and(data, data, mask=mask)
	return mask

# Delete > 39deg
def deleteHigh(data):
	# white mask
	d = cv2.inRange(data, 312.15*100, 65535)
	#return d.copyTo(data, d)

# Media Server output.
out = cv2.VideoWriter('appsrc ! videoconvert ! '
					  'x264enc speed-preset=ultrafast tune=zerolatency ! '
					  #'rtph264pay config-interval=1 pt=96 !'
					  'flvmux streamable=true ! queue !'
					  'rtmpsink location="rtmp://0.0.0.0:1935/test/app" sync=false',
					  0, 9, (640, 480))


def main():
	ctx = POINTER(uvc_context)()
	dev = POINTER(uvc_device)()
	devh = POINTER(uvc_device_handle)()
	ctrl = uvc_stream_ctrl()

	res = libuvc.uvc_init(byref(ctx), 0)
	if res < 0:
		#print ("uvc_init error")
		exit(1)

	try:
		res = libuvc.uvc_find_device(ctx, byref(dev), PT_USB_VID, PT_USB_PID, 0)
		if res < 0:
			#print ("uvc_find_device error")
			exit(1)

		try:
			res = libuvc.uvc_open(dev, byref(devh))
			if res < 0:
				print ("uvc_open error")
				exit(1)

			print ("device opened!")

			channel = grpc.insecure_channel('localhost:50051')
			stub = cam_pb2_grpc.SHRouteStub(channel)

			print_device_info(devh)
			print_device_formats(devh)

			frame_formats = uvc_get_frame_formats_by_guid(devh, VS_FMT_GUID_Y16)
			if len(frame_formats) == 0:
				print ("device does not support Y16")
				exit(1)

			libuvc.uvc_get_stream_ctrl_format_size(devh, byref(ctrl), UVC_FRAME_FORMAT_Y16,
				frame_formats[0].wWidth, frame_formats[0].wHeight, int(1e7 / frame_formats[0].dwDefaultFrameInterval)
			)

			res = libuvc.uvc_start_streaming(devh, byref(ctrl), PTR_PY_FRAME_CALLBACK, None, 0)
			if res < 0:
				print ("uvc_start_streaming failed: {0}".format(res))
				exit(1)

			# https://github.com/andrewvaughanj/purethermal1-uvc-capture/blob/master/python/uvc-radiometry.py#L346
			min_c = ctok(7)
			max_c = ctok(20)

			"""
			Main
			"""
			try:
				while True:
					data = q.get(True, 500)
					if data is None:
						break
					data = cv2.resize(data[:,:], (640, 480))

					# https://github.com/andrewvaughanj/purethermal1-uvc-capture/blob/master/python/uvc-radiometry.py#L360
					#data[0][0] = min_c
					#data[-1][-1] = max_c
					minVal, maxVal, minLoc, maxLoc = cv2.minMaxLoc(data)
					#img = deleteHigh(data)
					mask = humanRange(data)
					img = raw_to_8bit(data)
					raw = img.copy()
					cv2.rectangle(img, (640, 150), (0, 0), (0, 0, 0), -1) # lazyness ilght mask
					#img = cv2.bitwise_and(img, img, mask=mask)
					img = cv2.LUT(img, colormapGray)
					raw = cv2.LUT(raw, colormapRainbow)


					# Simple detection bythreshold method
					_, detection = cv2.threshold(cv2.cvtColor(np.uint8(img), cv2.COLOR_RGB2GRAY), 160, 256, cv2.THRESH_BINARY)
					contours, hierarchy = cv2.findContours(np.uint8(detection), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

					# put object rect
					obj = 0
					for i in range(0, len(contours)):
						rect = contours[i]
						area = cv2.contourArea(rect)
						x, y, w, h = cv2.boundingRect(rect)
						if area < 100 or 1e6 < area:
							continue
						if len(rect) > 0:
							obj+=1
							cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

					# send data
					stub.SendDeg(cam_pb2.HumanCount(human=obj, mindeg=int(ktoc(minVal)), maxdeg=int(ktoc(maxVal))))
					display_temperature(img, minVal, minLoc, (255, 0, 0))
					display_temperature(img, maxVal, maxLoc, (0, 0, 255))
					font = cv2.FONT_HERSHEY_SIMPLEX
					timestr = time.strftime("%Y/%m/%d %H:%M:%S")
					time_str = "{:s} ({:.2f}, {:.2f})".format(
						timestr, ktoc(minVal), ktoc(maxVal))
					cv2.putText(raw, time_str, (10, 26),
								font, 0.70, (255, 255, 215), 1, 2)

					out.write(raw) # Stream output
					cv2.imshow('Lepton Radiometry', img)
					cv2.waitKey(1)

				cv2.destroyAllWindows()
			finally:
				libuvc.uvc_stop_streaming(devh)

			#print ("done")
		finally:
			libuvc.uvc_unref_device(dev)
	finally:
		libuvc.uvc_exit(ctx)

if __name__ == '__main__':
	main()

