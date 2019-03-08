/**
 * main.js
 *
 * this should split
 */

import Servo from "pins/servo";
import Timer from "timer";
import Net from "net";
import I2C from "pins/i2c";

import { Client } from "websocket";
import SecureSocket from "securesocket";

import { Server } from "http";

import { Socket, Listener } from "socket";

import LuxSensor from 'lux';
import BME680 from 'bme680';

//const servo = new Servo({pin: 2});

let angle = 0;

const servos = {
	'on':  new Servo({pin: 16}),
	'off': new Servo({pin: 17})
}

let wss = new Client({host: "192.168.163.22", port: 1234,
//let wss = new Client({host: "192.168.10.101", port: 1234,
	Socket: SecureSocket, secure: {protocolVersion: 0x302, verify: false}});

wss.callback = (message, val) => {

	if (1 == message)
		trace('connected wss');
	if (3 == message) {
		trace(val);
		sarvoTurn(true, val);
	}

}

trace(`IP address ${Net.get("IP")}\n`);

const sensor = new LuxSensor();
sensor.setup();

const temp = new BME680();

const sarvoTurn = (bool, obj) => {
	const way = (bool) ? 35 : -35;
	servos[obj].write(way);
	Timer.delay(700);
	servos[obj].write(0);
	Timer.delay(700);
}

Timer.repeat(() => {

	trace(sensor.read() + '\n');
	trace(temp.read() + '\n');
	
	const json = JSON.stringify({ lux: sensor.read()});
	wss.write(json);
	//socket.write(String(sensor.read()));

}, 3000);

let server = new Server({port: 80});
server.callback = function(message, value)
{
	if (2 == message)
		this.path = value;
	if (8 == message) {
		sarvoTurn(true, servo);
		return {headers: ["Content-type", "text/plain"], body: `hello, client at path .\n`};
	}
}


