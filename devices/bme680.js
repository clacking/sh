/**
 * BME680
 *
 * Humidity, temperature and pressure sensor.
 *
 *  * https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST-BME680-DS001-00.pdf
 *  * https://github.com/BoschSensortec/BME680_driver
 *  * https://learn.adafruit.com/adafruit-bme680-humidity-temperature-barometic-pressure-voc-gas
 */

import I2C from 'pins/i2c';

class BME680 {

	constructor(sda = 21, scl = 22) {
	
		this.bme = new I2C({sda: sda, scl: scl, address: 0x76});

	}

	setup() {
	
		this.bme.write(0);
		this.bme.write(1);
	
	}

	read() {

		this.bme.write(0x72);
		this.bme.write(3);
		return this.bme.read(15);

	}

	calc_humidity() {}

	calc_pressure() {}

	calc_temperature() {}

}

export default BME680;

