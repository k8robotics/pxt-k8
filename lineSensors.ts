
//% weight=12 color=#ab47bc icon="\uf06e"
namespace lineSensors {
  export enum IRSensor {
    //% block="left"
    LEFT = 7,
    //% block="middle"
    MIDDLE = 8,
    //% block="right"
    RIGHT = 9
  }

  export enum IRColour {
    //% block="black"
    BLACK,
    //% block="white"
    WHITE
  }

  /** 
  * Check all sensors state and return a boolean array of the results.
  * Indices: 0 is left, 1 is middle, 2 is right
  */
  //% block
  //% weight=50
  //% advanced=true
  export function checkAllSensors(): Array<boolean> {
    let result: Array<boolean>
    result.push(pins.analogReadPin(k8.IR_SENSOR_LEFT) > 200)
    result.push(pins.analogReadPin(k8.IR_SENSOR_MIDDLE) > 200)
    result.push(pins.analogReadPin(k8.IR_SENSOR_RIGHT) > 200)
    return result
  }

  /**
   * Check if a chosen sensor is reading black or white
   * @param sensor which of the three sensors
   * @param colour whether the sensor looks for black or white
   */
  //% block
  //% blockId=line_check_sensor block="%sensor| sensor is %colour|"
  //% weight=60
  export function checkSensor(sensor: IRSensor, colour: IRColour = IRColour.WHITE): boolean {
    let read: boolean
      switch (sensor) {
        case IRSensor.LEFT:
          read = pins.analogReadPin(k8.IR_SENSOR_LEFT) > 200
          break
        case IRSensor.MIDDLE:
          read = pins.analogReadPin(k8.IR_SENSOR_MIDDLE) > 200
          break
        case IRSensor.RIGHT:
          read = pins.analogReadPin(k8.IR_SENSOR_RIGHT) > 200
          break
      }
      if (colour == IRColour.WHITE) {
        return !read
      }
      return read
  }

  /**
   * Displays current status of all line sensors
   */
  //% block
  //% weight=50
  export function displaySensors(): void {
    let i: number
    for (i = 0; i < 5; i++)
      led.plot(i, 4)

    if (checkSensor(IRSensor.LEFT)) {
      plotBar(4)
    } else {
      unplotBar(4)
    }

    if (checkSensor(IRSensor.MIDDLE)) {
      plotBar(2)
    } else {
      unplotBar(2)
    }

    if (checkSensor(IRSensor.RIGHT)) {
      plotBar(0)
    } else {
      unplotBar(0)
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
