//% weight=10 color=#01579B icon=""
namespace Servos {

     //% block
     //% blockId=servos_turn_left block="turn left servo |degrees: %degrees"
     //% degrees.min=-90 degrees.max=90
     //% weight=60
    export function turnLeftServo(degrees: number) {
        pins.servoWritePin(k8.SERVO_1, -degrees + 90)
    }

     //% block
     //% blockId=servos_turn_right block="turn right servo |degrees: %degrees"
     //% degrees.min=-90 degrees.max=90
     //% weight=50
     export function turnRightServo(degrees: number) {
        pins.servoWritePin(k8.SERVO_2, degrees + 90)
    }
}

