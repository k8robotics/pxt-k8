enum Comparison {
    //% block="closer"
    CLOSER,
    //% block="further"
    FURTHER
}

//% weight=11 color=#ff6f00 icon=""
namespace sonar {
    let MAX_PULSE = 7800

    /**
    * Returns the distance the robot is from an object (in centimetres)
    * Max range 150cm
    */
    //% block
    //% weight=50
    export function checkSonar(): number {
        let list = [0, 0, 0, 0, 0];

        for (let index = 0; index <= 4; index++) {
            list[index] = ping()
        }
        list = list.sort()

        return list[2];
    }

    /**
     * Test that sonar is closer or further than the threshold in cm.
     */
    //% block
    //% blockId=sonar_is block="sonar is %comparison| than %threshold cm"
    //% weight=60
    export function isSonar(comparison: Comparison = Comparison.FURTHER, threshold: number): boolean {
        let distance = checkSonar()
        if (comparison == Comparison.FURTHER) {
            return threshold < distance || distance == 0
        } else {
            return threshold >= checkSonar()
        }
      }

    /**
    * Display the current sonar reading to leds.
    */
    //% block
    //% weight=40
    export function displaySonar(): void {
        led.plotBarGraph(checkSonar(), 80)
    }

    // d / 39 is the ratio that most resembled actual centimeters
    // The datasheet says use d / 58 but that was off by a factor of 2/3
    function ping(): number {
        // send pulse
        pins.setPull(k8.SONAR, PinPullMode.PullNone);
        pins.digitalWritePin(k8.SONAR, 0);
        control.waitMicros(2);
        pins.digitalWritePin(k8.SONAR, 1);
        control.waitMicros(10);
        pins.digitalWritePin(k8.SONAR, 0);

        // read pulse
        const d = pins.pulseIn(k8.SONAR, PulseValue.High, MAX_PULSE);
        return Math.min(150, d / 39)
    }
}
