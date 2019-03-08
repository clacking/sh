
#include "esp_system.h"
#include <WebSockets.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>
#include <Adafruit_TSL2561_U.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>
#include "config.h"
#include "e_bme680.h"
#include "defs.h"

#define USE_SERIAL Serial
#define SEALEVELPRESSURE_HPA (1013.25)

const int LUX = 10;

WebSocketsClient webSocket;
WiFiMulti WiFiMulti;

class EServo {
private:
	int pin;
	int c;
	bool turn;
	static int channel;
public:
	EServo(int p) {
		turn = false;
		pin = p;
	}

	void begin() {
		this->c = channel++;
		ledcSetup(this->c, 50, 10);
		ledcAttachPin(pin, this->c);
		this->write(35);
		delay(600);
	}

	void write(int deg) {
		if(this->turn) return;
		long d;
		d = map(deg, 0, 180, 26, 123);
		this->turn = true;
		ledcWrite(this->c, d);
		delay(600);
		this->turn = false;
	}
};

int EServo::channel = 1;

/*
 * 26 - top left
 * 27 - top right
 * 25 - bottom left
 * 14 - bottom right
 */
const int LIGHT_SERVO_ON = 3;
const int LIGHT_SERVO_OFF = 67;
const int LIGHT_SERVO_MID = 35;
class LightManage {
private:
	EServo servos[4];
	Adafruit_TSL2561_Unified light;
	float before;
	float after;
public:
	LightManage(): servos {EServo(26), EServo(27), EServo(25), EServo(14)}, light(Adafruit_TSL2561_Unified(TSL2561_ADDR_FLOAT, 12345)) {}

	void begin() {
		for(EServo& s: servos) {
			s.begin();
		}
		this->light.begin();
		this->light.enableAutoRange(true);
		this->light.setIntegrationTime(TSL2561_INTEGRATIONTIME_13MS);
	}

	void on() {
		this->getBefore();
		servos[1].write(LIGHT_SERVO_ON);
		servos[2].write(LIGHT_SERVO_ON);
		this->back();
		//if(this->lightControl()) this->off();
	}

	void off() {
		this->getBefore();
		servos[0].write(LIGHT_SERVO_OFF);
		servos[3].write(LIGHT_SERVO_OFF);
		this->back();
		//if(this->lightControl()) this->on();
	}

	// Switches by operation.
	void topOn() {
		this->getBefore();
		servos[1].write(LIGHT_SERVO_ON);
		this->back();
		if(this->lightControl()) this->topOff();
	}

	void topOff() {
		this->getBefore();
		servos[0].write(LIGHT_SERVO_OFF);
		this->back();
		if(this->lightControl()) this->topOn();
	}

	void botOn() {
		this->getBefore();
		servos[2].write(LIGHT_SERVO_ON);
		this->back();
		if(this->lightControl()) this->botOff();
	}

	void botOff() {
		this->getBefore();
		servos[3].write(LIGHT_SERVO_OFF);
		this->back();
		if(this->lightControl()) this->botOn();
	}

	// fix all.
	void back() {
		servos[0].write(LIGHT_SERVO_MID);
		servos[1].write(LIGHT_SERVO_MID);
		servos[2].write(LIGHT_SERVO_MID);
		servos[3].write(LIGHT_SERVO_MID);
	}

	float getLightVal() {
		sensors_event_t event;
		light.getEvent(&event);
		return event.light;
	}

	// When light is flipped, retry another way.
	// :<<<
	void getBefore() {
		this->before = this->getLightVal();
	}

	// true means light not changed...
	bool lightControl() {
		delay(300);
		this->after = this->getLightVal();
		return abs(this->before - this->after) < 10;
	}

};

LightManage light;

// No base class :angry:
class AirCon {
private:
	EServo servo;
public:
	AirCon(): servo(19) {}

	void begin() {
		servo.begin();
	}

	void toggle() {
		this->servo.write(LIGHT_SERVO_ON);
	}

	void back() {
		this->servo.write(LIGHT_SERVO_MID);
	}
};

AirCon aircon;

// A class for collecting sensor date and make payload to message. xd
StaticJsonBuffer<200> jsonBuffer;
JsonObject& root = jsonBuffer.createObject();
class Messenger {
private:
	// interval
	const static int interval = 3000;
	int current;
	unsigned long last;
	Adafruit_TSL2561_Unified light;
	E_BME680 bme;
public:
	Messenger(): light(Adafruit_TSL2561_Unified(TSL2561_ADDR_FLOAT, 12345)) {}

	void initialize() {
		this->light.begin();
		this->light.enableAutoRange(true);
		this->light.setIntegrationTime(TSL2561_INTEGRATIONTIME_13MS);

		bme.begin();
	}

	// Every 1000ms.
	void update() {
		if((millis() - last) > 1000) {
			last = millis();
			String json;

			sensors_event_t event;
			light.getEvent(&event);
			root["lux"] = event.light;
			root["temperature"] = bme.getTemp();
			root["humidity"] = bme.getHumidity();
			root.printTo(json);
			webSocket.sendTXT(json);
		}
	}
};

// for payload
StaticJsonBuffer<200> jsonPayload;
void messageParser(uint8_t *payload) {
	char* json = (char*)payload;
	USE_SERIAL.printf(json);
	JsonObject& object = jsonPayload.parseObject(json);

	const String event = object.get<String>("event");
	const String pos = object.get<String>("pos");
	const String turn = object.get<String>("turn");

	// mad
	if(event != NULL && pos != NULL) {
		if(event == "LIGHT") {
			if (pos == DOOR_LIGHT) 
				if(turn == ON) light.topOn(); else light.topOff();
			else if (pos == WNDW_LIGHT)
				if(turn == ON) light.botOn(); else light.botOff();
			else if(pos == ALL_LIGHT)
				if(turn == ON) light.on(); else light.off();
		} else if(event == "AIRCON") {
			aircon.toggle();
		}
	}

	object.printTo(Serial);
}

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
	switch(type) {
		case WStype_DISCONNECTED:
				USE_SERIAL.printf("[WS] Disconnected\n");
				break;
		case WStype_CONNECTED:
				USE_SERIAL.printf("[WS] Connected to url: %s\n",  payload);
				break;
		case WStype_TEXT:
				USE_SERIAL.printf("[WS] get text: %s\n", payload);
				messageParser(payload);
				break;
		case WStype_BIN:
		case WStype_ERROR:
		case WStype_FRAGMENT_TEXT_START:
		case WStype_FRAGMENT_BIN_START:
		case WStype_FRAGMENT:
		case WStype_FRAGMENT_FIN:
			break;
	}
}

Messenger messageSender;

void setup() {
	Serial.begin(115200);

	light.begin();
	aircon.begin();
	messageSender.initialize();

	USE_SERIAL.setDebugOutput(true);

	WiFiMulti.addAP(SSID, PASSWORD);

	while (WiFiMulti.run() != WL_CONNECTED) {
		Serial.print(".");
		delay(200);
	}

	Serial.println(" connected\n");
	Serial.println(WiFi.SSID());
	Serial.print(WiFi.localIP());

	webSocket.beginSSL(host, 1234, DEVICENAME);
	webSocket.setReconnectInterval(5000);
	webSocket.onEvent(webSocketEvent);

}


void loop() {
	webSocket.loop();
	messageSender.update();
}
