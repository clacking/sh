# has

## pre-req

Linux server. 

```
node
arduino-cli
postgres
arduino
python3
opencv4
```

and some for Camera [README.md](PDCam/README.md).

docker
```
docker-compose build
docker-compose run
```

## structure
```
- src: frontend codes
- backend: backend codes. Read README.md.
- esp32: arduino codes for ESP32s
- public: build frontend
- devices: esp32 codes. Read README.md.
- PDCam: Human detection. Read README.md.
```

## commands
```
$ npm run start		# start frontend develop env
$ npm run server:dev	# start backend (in ./backend)
$ npm run build 	# build frontend 
```

## Used hardwares
```
- esp32
    - SG-5010 Servo motor
    - BME680
    - TSL2561
- PureThermal 2
    - FLIR Lepton 3.5
```
