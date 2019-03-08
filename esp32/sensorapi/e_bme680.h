/*
* Based https://www.mgo-tec.com/blog-entry-bme680-m5stack-esp32-ambient.html/3
*/
#ifndef E_BME680_H_
#define E_BME680_H_

#include <Wire.h>
#include "bme680.h"
#include "bme680_defs.h"

class E_BME680 {
private:
	bme680_dev gas_sensor;
	bme680_field_data data;
	uint16_t meas_period;
public:
	E_BME680 () {}

	void begin() {
		Wire.begin( 21, 22, 100000 );
		gas_sensor.dev_id = BME680_I2C_ADDR_PRIMARY;
		gas_sensor.intf = BME680_I2C_INTF;
		gas_sensor.read = user_i2c_read;
		gas_sensor.write = user_i2c_write;
		gas_sensor.delay_ms = user_delay_ms;
		gas_sensor.amb_temp = 28;

		int8_t rslt = BME680_OK;
		rslt = bme680_init(&gas_sensor);

		uint8_t set_required_settings;

		gas_sensor.tph_sett.os_hum = BME680_OS_2X;
		gas_sensor.tph_sett.os_pres = BME680_OS_4X;
		gas_sensor.tph_sett.os_temp = BME680_OS_8X;
		gas_sensor.tph_sett.filter = BME680_FILTER_SIZE_3;
		gas_sensor.gas_sett.run_gas = BME680_ENABLE_GAS_MEAS;
		gas_sensor.gas_sett.heatr_temp = 320;
		gas_sensor.gas_sett.heatr_dur = 150;
		gas_sensor.power_mode = BME680_FORCED_MODE;
		set_required_settings = BME680_OST_SEL | BME680_OSP_SEL | BME680_OSH_SEL | BME680_FILTER_SEL | BME680_GAS_SENSOR_SEL;

		rslt = bme680_set_sensor_settings(set_required_settings,&gas_sensor);
		rslt = bme680_set_sensor_mode(&gas_sensor);

		bme680_get_profile_dur(&meas_period, &gas_sensor);
	}

	float getTemp() {
		user_delay_ms(meas_period);

		int8_t rslt = bme680_get_sensor_data(&data, &gas_sensor);
		float d = (float)data.temperature / 100.0f;

		if (gas_sensor.power_mode == BME680_FORCED_MODE) {
			rslt = bme680_set_sensor_mode(&gas_sensor);
		}
		return d;
		
	}

	float getHumidity() {
		user_delay_ms(meas_period);

		int8_t rslt = bme680_get_sensor_data(&data, &gas_sensor);
		float d = (float)data.humidity / 1000.0f;

		if (gas_sensor.power_mode == BME680_FORCED_MODE) {
			rslt = bme680_set_sensor_mode(&gas_sensor);
		}
		return d;
	}

	static int8_t user_i2c_read( uint8_t dev_id, uint8_t reg_addr, uint8_t *reg_data, uint16_t len ) {
		int8_t rslt_read = 0;

		Wire.beginTransmission( dev_id );
		Wire.write( reg_addr );
		Wire.endTransmission();
		uint8_t req_from_ret = Wire.requestFrom((uint16_t)dev_id, (uint8_t)len, true);

		if( req_from_ret == 0 ) {
			Serial.println("------- Error requestForm return 0 --------");
			rslt_read = 1;
		} else {
			for(int i=0; i<len; i++) {
				reg_data[i] = Wire.read();
			}
			rslt_read = 0;
		}

		return rslt_read;
	}

	static int8_t user_i2c_write(uint8_t dev_id, uint8_t reg_addr, uint8_t *reg_data, uint16_t len) {
		int8_t rslt_write = 0;

		Wire.beginTransmission( dev_id );
		Wire.write( reg_addr );
		for( int i = 0; i < len; i++ ) {
			Wire.write( reg_data[i] );
		}
		rslt_write = Wire.endTransmission();

		return rslt_write;
	}

	static void user_delay_ms(uint32_t period) {
		delay(period);
	}
};

#endif
