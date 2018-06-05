enum k8IRsensor {
    //% block="right"
    RIGHT = 7,
    //% block="centre"
    CENTRE = 8,
    //% block="left"
    LEFT = 9
}

enum k8Colour {
    //% block="black"
    BLACK = 0,
    //% block="white"
    WHITE = 1
}

//% weight=100 color=#18DC29 icon="\uf06e"
namespace infrared {

    /*
    * Return the state of each sensor encoded as a 3 digit number
    * Each digit represents the on/off state of a sensor
    * Hundreds place is 'L', tens place is 'C', ones place is 'R'
    */
    //% block
    export function readSensors(): number {
      let result: number
      result = 0
      if (pins.analogReadPin(k8.IR_SENSOR_0) > 200) {
        result += 100
      }
      if (pins.analogReadPin(k8.IR_SENSOR_1) > 200) {
        result += 10
      }
      if (pins.analogReadPin(k8.IR_SENSOR_2) > 200) {
        result += 1
      }

      return result
    }

    /**
     * Reads binary values from 3 IR sensors
     * @param sensor which of the three sensors
     * @param colour whether the sensor looks for black or white
     */
    //% block
    export function checkSensors(sensor: k8IRsensor, colour: k8Colour): boolean {
        let isSee = true

        if (colour == k8Colour.BLACK) {
            if (sensor == k8IRsensor.RIGHT) {
                isSee = pins.analogReadPin(k8.IR_SENSOR_0) > 200
            }
            else if (sensor == k8IRsensor.CENTRE) {
                isSee = pins.analogReadPin(k8.IR_SENSOR_1) > 200
            }
            else if (sensor == k8IRsensor.LEFT) {
                isSee = pins.analogReadPin(k8.IR_SENSOR_2) > 200
            }
            else {
                isSee = false
            }
        }
        else if (colour == k8Colour.WHITE) {
            if (sensor == k8IRsensor.RIGHT) {
                isSee = pins.analogReadPin(k8.IR_SENSOR_0) < 200
            }
            else if (sensor == k8IRsensor.CENTRE) {
                isSee = pins.analogReadPin(k8.IR_SENSOR_1) < 200
            }
            else if (sensor == k8IRsensor.LEFT) {
                isSee = pins.analogReadPin(k8.IR_SENSOR_2) < 200
            }
            else {
                isSee = false
            }
        }
        return isSee;
    }

    /**
     * Displays binary values from 3 IR sensors (used for line detection)
     */
    //% block
    export function displaySensors(): void {
        led.plot(0, 4)
        led.plot(2, 4)
        led.plot(4, 4)
        if (pins.analogReadPin(k8.IR_SENSOR_0) > 200) {
            led.plot(0, 1)
            led.plot(0, 2)
            led.plot(0, 3)
        } else {
            led.unplot(0, 1)
            led.unplot(0, 2)
            led.unplot(0, 3)
        }
        if (pins.analogReadPin(k8.IR_SENSOR_1) > 200) {
            led.plot(2, 1)
            led.plot(2, 2)
            led.plot(2, 3)
        } else {
            led.unplot(2, 1)
            led.unplot(2, 2)
            led.unplot(2, 3)
        }
        if (pins.analogReadPin(k8.IR_SENSOR_2) > 200) {
            led.plot(4, 1)
            led.plot(4, 2)
            led.plot(4, 3)
        } else {
            led.unplot(4, 1)
            led.unplot(4, 2)
            led.unplot(4, 3)
        }
    }
}
