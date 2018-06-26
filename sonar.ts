enum k8PingUnit {
    //% block="μs"
    MicroSeconds,
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
}

//% weight=11 color=#ff6f00 icon=""
namespace sonar {
    /**
    * Displays the distance the robot is from an object (in centimetres)
    */
    //% block
    export function checkSonar(): number {
        let list = [0, 0, 0, 0, 0];

        for (let index = 0; index <= 4; index++) {
            list[index] = ping(k8PingUnit.Centimeters)
        }
        list = list.sort()

        return list[2];
    }

    function ping(unit: k8PingUnit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(k8.SONAR, PinPullMode.PullNone);
        pins.digitalWritePin(k8.SONAR, 0);
        control.waitMicros(2);
        pins.digitalWritePin(k8.SONAR, 1);
        control.waitMicros(10);
        pins.digitalWritePin(k8.SONAR, 0);

        // read pulse
        const d = pins.pulseIn(k8.SONAR, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case k8PingUnit.Centimeters: return d / 58;
            case k8PingUnit.Inches: return d / 148;
            default: return d;
        }
    }
}
