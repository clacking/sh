/**
 * TSL2561 Lux sensor from adafruit.
 *
 * * https://learn.adafruit.com/tsl2561?view=all
 * * https://cdn-shop.adafruit.com/datasheets/TSL2561.pdf#23
 * * http://www.ne.jp/asahi/o-family/extdisk/TSL2561/TSL2561_DJP.pdf (unofficial japanese translation)
 *
 */

import I2C from 'pins/i2c';

class LuxSensor {

	constructor(sda = 21, scl = 22) {
	
		this.lux = new I2C({sda: sda, scl: scl, address: 0x39});
	
	}

	setup() {

		// pre write
		this.lux.write(1 | 0x80);
		this.lux.write(0x2);
		this.lux.write(6 | 0x80);
		this.lux.write(0x0);
		this.lux.write(0 | 0x80);
		this.lux.write(3);

	}

	read() {

		const ch0 = this.pickch(0x0c);
		const ch1 = this.pickch(0x0e);
		return this.calc(ch0, ch1);

	}

	pickch(ptr) {

		this.lux.write(ptr | 0x80);
		const date = this.lux.read(2);
		return (date[1] << 8) || date[0];

	}

	calc(ch0, ch1) {

		const r = ch1/ch0;
		let luxed = 0;
		if(0 < r && r <= 0.50)
			luxed = 0.0304 * ch0 - 0.062 * ch0 * Math.pow(r, 1.4);
		else if(0.50 < r && r <= 0.61)
			luxed = 0.0224 * ch0 - 0.031 * ch1;
		else if(0.61 < r && r <= 0.80)
			luxed = 0.0128 * ch0 - 0.0153 * ch1;
		else if(0.80 < r && r <= 1.30)
			luxed = 0.00146 * ch0 - 0.00112 * ch1;
		else if(r > 1.30)
			luxed = 0;

		luxed *= ch0;

		return luxed;

	}

}

export default LuxSensor;

