{
    // Motors
    motion.driveStraight(50)
    basic.pause(1000)
    motion.driveStraight(-50)
    basic.pause(1000)
    motion.turnLeft(50)
    basic.pause(1000)
    motion.turnRight(50)
    basic.pause(1000)
    motion.setPowers(MotorPower.OFF)

    // Sonar
    let i: number
    for (i = 0; i < 5000; i++) {
        sonar.displaySonar()
        basic.pause(1)
    }

    // Line Sensors
    for (i = 0; i < 5000; i++) {
        lineSensors.displaySensors()
        basic.pause(1)
    }

    // Servos
    servos.resetServos()
    basic.pause(1000)
    servos.turnLeftServo(80)
    servos.turnRightServo(80)
    basic.pause(1000)
    servos.turnLeftServo(-80)
    servos.turnRightServo(-80)
    basic.pause(1000)
}