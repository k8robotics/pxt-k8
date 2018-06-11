enum k8IRsensor {
    //% block="right"
    RIGHT = 7,
    //% block="centre"
    CENTRE = 8,
    //% block="left"
    LEFT = 9
}

//% weight=12 color=#ab47bc icon="\uf06e"
namespace lineSensors {
    /*
    * Return the state of each sensor encoded as a 3 digit number
    * Each digit represents the on/off state of a sensor
    * Hundreds place is 'L', tens place is 'C', ones place is 'R'
    */
    //% block
    export function checkSensors(): number {
      let result: number
      result = 0
      if (pins.analogReadPin(k8.IR_SENSOR_LEFT) > 200) {
        result += 100
      }
      if (pins.analogReadPin(k8.IR_SENSOR_CENTRE) > 200) {
        result += 10
      }
      if (pins.analogReadPin(k8.IR_SENSOR_RIGHT) > 200) {
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
    //% blockId=line_check_sensor block="check|sensor: %sensor"
    export function checkSensor(sensor: k8IRsensor): boolean {
        switch(sensor) {
          case k8IRsensor.LEFT:
            return pins.analogReadPin(k8.IR_SENSOR_LEFT) > 200
          case k8IRsensor.CENTRE:
            return pins.analogReadPin(k8.IR_SENSOR_CENTRE) > 200
          case k8IRsensor.RIGHT:
            return pins.analogReadPin(k8.IR_SENSOR_RIGHT) > 200
        }
        return false
    }

    /**
     * Displays binary values from 3 IR sensors (used for line detection)
     */
    //% block
    export function displaySensors(): void {
      let i: number
      for (i = 0; i < 5; i++)
        led.plot(i, 4)

      if (checkSensor(k8IRsensor.LEFT)) {
        plotBar(0)
      } else {
        unplotBar(0)
      }

      if (checkSensor(k8IRsensor.CENTRE)) {
        plotBar(2)
      } else {
        unplotBar(2)
      }

      if (checkSensor(k8IRsensor.RIGHT)) {
        plotBar(4)
      } else {
        unplotBar(4)
      }
    }

    function plotBar(x: number) {
      led.plot(x, 1)
      led.plot(x, 2)
      led.plot(x, 3)
    }
    function unplotBar(x: number) {
      led.unplot(x, 1)
      led.unplot(x, 2)
      led.unplot(x, 3)
    }
}
