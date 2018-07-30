//% weight=10 color=#01579B icon=""
namespace servos {

    export enum Position {
        //% block="up"
        UP = 85,
        //% block="half up"
        HALF_UP = 40,
        //% block="middle"
        MIDDLE = 0,
        //% block="half down"
        HALF_DOWN= -40,
        //% block="down"
        DOWN = -85
    }

    //% block
    //% blockId=servos_set_left block="set left servo to |position: %position"
    //% weight=60
    export function setLeftServoPosition(position: Position) {
        let n: number = position
        pins.servoWritePin(k8.SERVO_1, -n + 90)
    }

    //% block
    //% blockId=servos_set_right block="set right servo to |position: %position"
    //% weight=50
     export function setRightServoPosition(position: Position) {
        let n: number = position
        pins.servoWritePin(k8.SERVO_2, -n + 90)
    }

    //% block
    //% blockId=servos_reset block="reset servos"
    //% weight=40
    export function resetServos() {
        pins.servoWritePin(k8.SERVO_1, 90)
        pins.servoWritePin(k8.SERVO_2, 90)
    }

    //% block
    //% blockId=servos_turn_left block="turn left servo |degrees: %degrees"
    //% degrees.min=-90 degrees.max=90
    //% weight=60
    //% advanced=true
     export function turnLeftServo(degrees: number) {
        pins.servoWritePin(k8.SERVO_1, -degrees + 90)
    }

    //% block
    //% blockId=servos_turn_right block="turn right servo |degrees: %degrees"
    //% degrees.min=-90 degrees.max=90
    //% weight=50
    //% advanced=true
     export function turnRightServo(degrees: number) {
        pins.servoWritePin(k8.SERVO_2, degrees + 90)
    }
}

servos.resetServos()