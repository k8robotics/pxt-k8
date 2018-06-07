enum k8IRsensor {
    //% block="right"
    RIGHT = 7,
    //% block="centre"
    CENTRE = 8,
    //% block="left"
    LEFT = 9
}

//% weight=100 color=#18DC29 icon="\uf06e"
namespace infrared {
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
    export function checkSensor(sensor: k8IRsensor): boolean {
        switch(sensor) {
          case k8IRsensor.LEFT:
            return pins.analogReadPin(k8.IR_SENSOR_LEFT) > 200
          case k8IRsensor.CENTRE:
            return pins.analogReadPin(k8.IR_SENSOR_CENTRE) > 200
          case k8IRsensor.RIGHT:
            return pins.analogReadPin(k8.IR_SENSOR_RIGHT) > 200
        }
    }

    /**
     * Displays binary values from 3 IR sensors (used for line detection)
     */
    //% block
    export function displaySensors(): void {
      basic.clearScreen()
      for (i = 0; i < 5; i++)
        led.plot(i, 4)

      if (checkSensor(k8IRsensor.LEFT) > 200) {
        plotBar(0)
      }
      if (checkSensor(k8IRsensor.CENTRE) > 200) {
        plotBar(2)
      }
      if (checkSensor(k8IRsensor.RIGHT) > 200) {
        plotBar(4)
      }
    }
    function plotBar(x: number) {
      led.plot(x, 1)
      led.plot(x, 2)
      led.plot(x, 3)
    }
}
