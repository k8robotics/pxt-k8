enum k8Moto {
    //% block="left"
    LEFT = 0,
    //& block="right"
    RIGHT = 1
}

enum k8Invert {
    //% block="forward"
    FORWARD = 1,
    //% block="reverse"
    REVERSE = 0
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

        pins.digitalWritePin(k8Pins.motorADir, 0)
        pins.analogSetPeriod(k8Pins.motorAPwr, 256)

        pins.digitalWritePin(k8Pins.motor2Dir, 1)
        pins.analogSetPeriod(k8Pins.motor2Pwr, 256)
        pins.analogWritePin(k8Pins.motorAPwr, motorSpeed)
        pins.analogWritePin(k8Pins.motor2Pwr, motorSpeed)
    }

    /**
     *Turns the robot to the left at a specified speed
     */
    //% block
    export function turnLeft(speed: number): void {
        let motorSpeed: number

        motorSpeed = remapSpeed(speed)

        pins.digitalWritePin(k8Pins.motor1Dir, 0)
        pins.analogSetPeriod(k8Pins.motor1Pwr, 512)

        pins.digitalWritePin(k8Pins.motor2Dir, 1)
        pins.analogSetPeriod(k8Pins.motor2Pwr, 512)
        pins.analogWritePin(k8Pins.motor1Pwr, motorSpeed)
        pins.analogWritePin(k8Pins.motor2Pwr, 0)
    }

    /**
     *Turns the robot to the right at a specified speed
     */
    //% block
    export function turnRight(speed: number): void {
        let motorSpeed: number

        motorSpeed = remapSpeed(speed)

        pins.digitalWritePin(k8Pins.motor1Dir, 0)
        pins.analogSetPeriod(k8Pins.motor1Pwr, 512)

        pins.digitalWritePin(k8Pins.motor2Dir, 1)
        pins.analogSetPeriod(k8Pins.motor2Pwr, 512)
        pins.analogWritePin(k8Pins.motor1Pwr, 0)
        pins.analogWritePin(k8Pins.motor2Pwr, motorSpeed)
    }

    /**
     *Advanced control of an individual motor. PWM is set to constant value.
     */
    //% block
    //% speed.min=0 speed.max=100
    //% weight=80
    export function motorControl(whichMotor: k8Moto, direction: k8Invert, speed: number): void {
        let motorSpeed: number
        let invertDirection: number
        motorSpeed = remapSpeed(speed)

        if (direction == k8Invert.FORWARD)
            invertDirection = 0
        else if (direction == k8Invert.REVERSE)
            invertDirection = 1

        if (whichMotor == 0) {
            pins.digitalWritePin(k8Pins.motor2Dir, direction)
            pins.analogSetPeriod(k8Pins.motor2Pwr, 512)
            pins.analogWritePin(k8Pins.motor2Pwr, motorSpeed)
        }
        else if (whichMotor == 1) {
            pins.digitalWritePin(k8Pins.motor1Dir, invertDirection)
            pins.analogSetPeriod(k8Pins.motor1Pwr, 512)
            pins.analogWritePin(k8Pins.motor1Pwr, motorSpeed)
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
}
