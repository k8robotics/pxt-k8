enum Motor {
    //% block="left"
    LEFT = 0,
    //& block="right"
    RIGHT = 1
}

enum MotorDirection {
    //% block="forward"
    FORWARD = 0,
    //% block="reverse"
    REVERSE = 1
}

//% weight=100 color=#64dd17 icon=""
namespace motion {
    /**
    * Simplified drive function
    */
    //% block
    //% leftWheelSpeed.min=-100 leftWheelSpeed.max=100
    //% rightWheelSpeed.min=-100 rightWheelSpeed.max=100
    //% weight=80
    export function drive(leftWheelSpeed: number, rightWheelSpeed: number): void {
      motorControl(Motor.LEFT, leftWheelSpeed)
      motorControl(Motor.RIGHT, rightWheelSpeed)
    }

    /**
     *Drives the robot straight at a specified speed
     */
     //% block
     //% speed.min=-100 speed.max=100
    export function driveStraight(speed: number): void {
        motorControl(Motor.LEFT, speed)
        motorControl(Motor.RIGHT, speed)
    }

    /**
     *Turns the robot to the left at a specified speed
     */
     //% block
     //% speed.min=-100 speed.max=100
    export function turnLeft(speed: number): void {
      motorControl(Motor.LEFT, 0)
      motorControl(Motor.RIGHT, speed)
    }

    /**
     *Turns the robot to the right at a specified speed
     */
     //% block
    //% speed.min=-100 speed.max=100
    export function turnRight(speed: number): void {
      motorControl(Motor.LEFT, speed)
      motorControl(Motor.RIGHT, 0)
    }

    /**
     * Advanced control of an individual motor. PWM is set to constant value.
     */
    //% block
    //% speed.min=-100 speed.max=100
    //% weight=80
    function motorControl(whichMotor: Motor, speed: number): void {
        let motorSpeed: number
        let direction: MotorDirection

        direction = speed < 0 ? MotorDirection.REVERSE: MotorDirection.FORWARD
        speed = Math.abs(speed)

        motorSpeed = remapSpeed(speed)

        if (whichMotor == Motor.LEFT) {
            pins.digitalWritePin(k8.M1_DIR, direction)
            pins.analogSetPeriod(k8.M1_PWR, 512)
            pins.analogWritePin(k8.M1_PWR, motorSpeed)
        } else {
            pins.digitalWritePin(k8.M2_DIR, direction)
            pins.analogSetPeriod(k8.M2_PWR, 512)
            pins.analogWritePin(k8.M2_PWR, motorSpeed)
        }
    }

  // Rescale values from 0 - 100 to 0 - 1023
  function remapSpeed(s: number): number {
      let returnSpeed: number
      if (s <= 0) {
          returnSpeed = 0
      }
      else if (s >= 100) {
          returnSpeed = 1023
      }
      else {
        returnSpeed = Math.min(100, s * 10)
      }
      return returnSpeed;
  }
}
