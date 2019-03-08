/**
 * main.js
 *
 * this should split
 */

import Servo from "pins/servo";
import Timer from "timer";
import Net from "net";

import { Client } from "websocket";
import SecureSocket from "securesocket";

import { Server } from "http";

import { Socket, Listener } from "socket";
import Digital from "pins/digital";
import PWM from "pins/pwm";
//const servo = new Servo({pin: 2});
import MServo from "./MServo";

let angle = 0;

const servos = {
	'on':  new MServo({pin: 16, channel: 0}),
	'off': new MServo({pin: 17, channel: 2})
}

//let wss = new Client({host: "192.168.163.22", port: 1234,
let wss = new Client({host: "192.168.10.101", port: 1234,
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

const sarvoTurn = (bool, obj) => {
	const way = (bool) ? 35 : -35;
	servos['on'].write(way);
	Timer.delay(700);
	servos['off'].write(way);
	Timer.delay(700);
	servos['on'].write(0);
	Timer.delay(700);
	servos['off'].write(0);
}

Timer.repeat(() => {

	
	const json = JSON.stringify({ lux: 'ping'});
	wss.write(json);
	//socket.write(String(sensor.read()));
	servos['on'].write(30,0);
	Timer.delay(1400);
	servos['off'].write(30,2);
	Timer.delay(1400);
	servos['on'].write(0,0);
	Timer.delay(1400);
	servos['off'].write(0,2);
	Timer.delay(1400);

}, 3000);


