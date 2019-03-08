export class MServo @ "xs_servo_destructor" {
	constructor(dictionary) @ "xs_servo";
	close() @ "xs_servo_close";
	write() @ "xs_servo_write";
	writeMicroseconds() @ "xs_servo_writeMicroseconds";
};
Object.freeze(MServo.prototype);

export default MServo;
