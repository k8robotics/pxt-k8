
enum k8Invert {
    //% block="forward"
    FORWARD = 1,
    //% block="reverse"
    REVERSE = 0
}

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

enum k8PingUnit {
    //% block="μs"
    MicroSeconds,
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
}

enum k8Moto {
    //% block="left"
    LEFT = 0,
    //& block="right"
    RIGHT = 1
}

//% weight=100 color=#18DC29 icon="\uf06e"
namespace infrared {

    /*
    * Return the real IR values of IR sensors
    */
    //% block
    export function readLeftSensor(): number {
    let sensor: number
    sensor = pins.analogReadPin(AnalogPin.P0)
    return sensor
    }

    /*
    * Return the real IR values of IR sensors
    */
    //% block
    export function readCentreSensor(): number {
      let sensor: number
      sensor = pins.analogReadPin(AnalogPin.P1)
      return sensor
    }

    /*
    * Return the real IR values of IR sensors
    */
    //% block
    export function readRightSensor(): number {
      let sensor: number
      sensor = pins.analogReadPin(AnalogPin.P2)
      return sensor
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
                isSee = pins.analogReadPin(AnalogPin.P0) > 200
            }
            else if (sensor == k8IRsensor.CENTRE) {
                isSee = pins.analogReadPin(AnalogPin.P1) > 200
            }
            else if (sensor == k8IRsensor.LEFT) {
                isSee = pins.analogReadPin(AnalogPin.P2) > 200
            }
            else {
                isSee = false
            }
        }
        else if (colour == k8Colour.WHITE) {
            if (sensor == k8IRsensor.RIGHT) {
                isSee = pins.analogReadPin(AnalogPin.P0) < 200
            }
            else if (sensor == k8IRsensor.CENTRE) {
                isSee = pins.analogReadPin(AnalogPin.P1) < 200
            }
            else if (sensor == k8IRsensor.LEFT) {
                isSee = pins.analogReadPin(AnalogPin.P2) < 200
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
        if (pins.analogReadPin(AnalogPin.P0) > 200) {
            led.plot(0, 1)
            led.plot(0, 2)
            led.plot(0, 3)
        } else {
            led.unplot(0, 1)
            led.unplot(0, 2)
            led.unplot(0, 3)
        }
        if (pins.analogReadPin(AnalogPin.P1) > 200) {
            led.plot(2, 1)
            led.plot(2, 2)
            led.plot(2, 3)
        } else {
            led.unplot(2, 1)
            led.unplot(2, 2)
            led.unplot(2, 3)
        }
        if (pins.analogReadPin(AnalogPin.P2) > 200) {
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

//% weight=100 color=#421C52 icon="\uf1b9"
namespace motion {
    // Motor defines
    let M1_PWM: number //M1 also know as A on schematic
    let M1_DIR: number
    let M2_PWM: number //M2 also know as B on schematic
    let M2_DIR: number
    M1_PWM = DigitalPin.P13
    M1_DIR = DigitalPin.P14
    M2_PWM = DigitalPin.P15
    M2_DIR = DigitalPin.P16

    /**
     *Drives the robot straight at a specified speed
     */
    //% block
    export function driveStraight(speed: number): void {
        let motorSpeed: number

        motorSpeed = remapSpeed(speed)

        pins.digitalWritePin(M1_DIR, 0)
        pins.analogSetPeriod(M1_PWM, 256)

        pins.digitalWritePin(M2_DIR, 1)
        pins.analogSetPeriod(M2_PWM, 256)
        pins.analogWritePin(M1_PWM, motorSpeed)
        pins.analogWritePin(M2_PWM, motorSpeed)
    }

    /**
     *Turns the robot to the left at a specified speed
     */
    //% block
    export function turnLeft(speed: number): void {
        let motorSpeed: number

        motorSpeed = remapSpeed(speed)

        pins.digitalWritePin(M1_DIR, 0)
        pins.analogSetPeriod(M1_PWM, 512)

        pins.digitalWritePin(M2_DIR, 1)
        pins.analogSetPeriod(M2_PWM, 512)
        pins.analogWritePin(M1_PWM, motorSpeed)
        pins.analogWritePin(M2_PWM, 0)
    }

    /**
     *Turns the robot to the right at a specified speed
     */
    //% block
    export function turnRight(speed: number): void {
        let motorSpeed: number

        motorSpeed = remapSpeed(speed)

        pins.digitalWritePin(M1_DIR, 0)
        pins.analogSetPeriod(M1_PWM, 512)

        pins.digitalWritePin(M2_DIR, 1)
        pins.analogSetPeriod(M2_PWM, 512)
        pins.analogWritePin(M1_PWM, 0)
        pins.analogWritePin(M2_PWM, motorSpeed)
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
            pins.digitalWritePin(M2_DIR, direction)
            pins.analogSetPeriod(M2_PWM, 512)
            pins.analogWritePin(M2_PWM, motorSpeed)
        }
        else if (whichMotor == 1) {
            pins.digitalWritePin(M1_DIR, invertDirection)
            pins.analogSetPeriod(M1_PWM, 512)
            pins.analogWritePin(M1_PWM, motorSpeed)
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

//% weight=100 color=#421C52 icon="\uf1b9"
namespace sonar {
    /**
 * Displays the distance the robot is from an object (in centimetres)
 */
    //% block
    export function checkSonar(): number {
        let list = [0, 0, 0, 0, 0];

        for (let index = 0; index <= 4; index++) {
            list[index] = ping(
                DigitalPin.P8,
                DigitalPin.P8,
                k8PingUnit.Centimeters
            )
        }

        let len = list.length,     // number of items in the array
            value: number,                      // the value currently being compared
            i: number,                          // index into unsorted section
            j: number,                          // index into sorted section
            distance: number;

        for (i = 0; i < len; i++) {

            // store the current value because it may shift later
            value = list[i];

            /*
             * Whenever the value in the sorted section is greater than the value
             * in the unsorted section, shift all items in the sorted section over
             * by one. This creates space in which to insert the value.
             */
            for (j = i - 1; j > -1 && list[j] > value; j--) {
                list[j + 1] = list[j];
            }

            list[j + 1] = value;
        }

        distance = list[2]; // return the median of the five measurements made

        return distance;
    }
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

function ping(trig: DigitalPin, echo: DigitalPin, unit: k8PingUnit, maxCmDistance = 500): number {
    // send pulse
    pins.setPull(trig, PinPullMode.PullNone);
    pins.digitalWritePin(trig, 0);
    control.waitMicros(2);
    pins.digitalWritePin(trig, 1);
    control.waitMicros(10);
    pins.digitalWritePin(trig, 0);

    // read pulse
    const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

    switch (unit) {
        case k8PingUnit.Centimeters: return d / 58;
        case k8PingUnit.Inches: return d / 148;
        default: return d;
    }
}
