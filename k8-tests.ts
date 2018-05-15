// tests go here; this will not be compiled when this package is used as a library
input.onButtonPressed(Button.A, () => {
    motion.motorControl(k8Moto.RIGHT, k8Invert.FORWARD, 75)
    motion.motorControl(k8Moto.LEFT, k8Invert.FORWARD, 75)
})
input.onButtonPressed(Button.B, () => {
    motion.motorControl(k8Moto.RIGHT, k8Invert.FORWARD, 25)
    motion.motorControl(k8Moto.LEFT, k8Invert.FORWARD, 25)
})
input.onButtonPressed(Button.AB, () => {
    motion.motorControl(k8Moto.RIGHT, k8Invert.FORWARD, 0)
    motion.motorControl(k8Moto.LEFT, k8Invert.FORWARD, 0)
})