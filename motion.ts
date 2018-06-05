enum k8Moto {
    //% block="left"
    LEFT = 0,
    //& block="right"
    RIGHT = 1
}

enum k8Invert {
    //% block="forward"
    FORWARD = 0,
    //% block="reverse"
    REVERSE = 1
}



//% weight=100 color=#421C52 icon="\uf1b9"
namespace motion {
    /**
     *Drives the robot straight at a specified speed
     */
    //% block
    export function driveStraight(speed: number): void {
        let motorSpeed: number

        motorSpeed = remapSpeed(speed)

        pins.digitalWritePin(k8.M1_DIR, 0)
        pins.analogSetPeriod(k8.M1_PWR, 256)

        pins.digitalWritePin(k8.M2_DIR, 1)
        pins.analogSetPeriod(k8.M2_PWR, 256)
        pins.analogWritePin(k8.M1_PWR, motorSpeed)
        pins.analogWritePin(k8.M2_PWR, motorSpeed)
    }

    /**
     *Turns the robot to the left at a specified speed
     */
    //% block
    export function turnLeft(speed: number): void {
        let motorSpeed: number

        motorSpeed = remapSpeed(speed)

        pins.digitalWritePin(k8.M1_DIR, 0)
        pins.analogSetPeriod(k8.M1_PWR, 512)

        pins.digitalWritePin(k8.M2_DIR, 1)
        pins.analogSetPeriod(k8.M2_PWR, 512)
        pins.analogWritePin(k8.M1_PWR, motorSpeed)
        pins.analogWritePin(k8.M2_PWR, 0)
    }

    /**
     *Turns the robot to the right at a specified speed
     */
    //% block
    export function turnRight(speed: number): void {
        let motorSpeed: number

        motorSpeed = remapSpeed(speed)

        pins.digitalWritePin(k8.M1_DIR, 0)
        pins.analogSetPeriod(k8.M1_PWR, 512)

        pins.digitalWritePin(k8.M2_DIR, 1)
        pins.analogSetPeriod(k8.M2_PWR, 512)
        pins.analogWritePin(k8.M1_PWR, 0)
        pins.analogWritePin(k8.M2_PWR, motorSpeed)
    }

    /**
     *Advanced control of an individual motor. PWM is set to constant value.
     */
    //% block
    //% speed.min=0 speed.max=100
    //% weight=80
    export function motorControl(whichMotor: k8Moto, direction: k8Invert, speed: number): void {
        let motorSpeed: number
        motorSpeed = remapSpeed(speed)

        
        if (whichMotor == k8Moto.Left) {
            pins.digitalWritePin(k8.M1_DIR, direction)
            pins.analogSetPeriod(k8.M1_PWR, 512)
            pins.analogWritePin(k8.M1_PWR, motorSpeed)
        } else if (whichMotor == k8Moto.RIGHT) {
            pins.digitalWritePin(k8.M2_DIR, direction)
            pins.analogSetPeriod(k8.M2_PWR, 512)
            pins.analogWritePin(k8.M2_PWR, motorSpeed)
        }
    }

    /**
    * Simplified drive function built on top of motorControl
    */
    //% block
    //% leftWheelSpeed.min=-100 leftWheelSpeed.max=100
    //% rightWheelSpeed.min=-100 rightWheelSpeed.max=100
    //% weight=80
    export function drive(leftWheelSpeed: number, rightWheelSpeed: number): void {
    let leftWheelDirection = leftWheelSpeed >= 0 ? k8Invert.FORWARD : k8Invert.REVERSE
    let rightWheelDirection = rightWheelSpeed >= 0 ? k8Invert.FORWARD : k8Invert.REVERSE

    motorControl(k8Moto.LEFT, leftWheelDirection, Math.abs(leftWheelSpeed))
    motorControl(k8Moto.RIGHT, rightWheelDirection, Math.abs(rightWheelSpeed))
  }

  function remapSpeed(s: number): number {
      let returnSpeed: number

      if (s <= 0) {
          returnSpeed = 0
      }
      else if (s >= 100) {
          returnSpeed = 1023
      }
      else {
          returnSpeed = (24200 + (s * 800 - s * 19)) / 100
      }

      return returnSpeed;
  }
}
