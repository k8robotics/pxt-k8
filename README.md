# k8 Robotics Board

This library provides functions to interface with the motors, sensors and other inputs & outputs that are part of the k8 Robotics Kit.  

## Basic usage

```blocks
// Control one of the drive motors (either LEFT or RIGHT) by setting a direction (FORWARD or REEVERSE, where FORWARD spins the right wheel clockwise and the left wheel CCW), and a speed between 0 and 100.

motion.motorControl(k8Moto.RIGHT, k8Invert.FORWARD, 25)
```

## Supported targets

* for PXT/microbit

## License

MIT

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
