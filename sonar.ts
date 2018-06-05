
enum k8PingUnit {
    //% block="μs"
    MicroSeconds,
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
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
                k8Pins.sonar,
                k8Pins.sonar,
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

function ping(unit: k8PingUnit, maxCmDistance = 500): number {
    // send pulse
    pins.setPull(k8Pins.sonar, PinPullMode.PullNone);
    pins.digitalWritePin(k8Pins.sonar, 0);
    control.waitMicros(2);
    pins.digitalWritePin(k8Pins.sonar, 1);
    control.waitMicros(10);
    pins.digitalWritePin(k8Pins.sonar, 0);

    // read pulse
    const d = pins.pulseIn(k8Pins.sonar, PulseValue.High, maxCmDistance * 58);

    switch (unit) {
        case k8PingUnit.Centimeters: return d / 58;
        case k8PingUnit.Inches: return d / 148;
        default: return d;
    }
}
