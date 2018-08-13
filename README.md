# k8 Robotics Board

This library provides functions to interface with the motors, sensors and other inputs & outputs that are part of the k8 Robotics Kit. More information at https://www.inksmith.co/k8-robotics-kit.  

## Example Usage

To drive forward, then backward
```blocks
basic.forever(() => {
    motion.driveStraight(50)
    basic.pause(1000)
    motion.driveStraight(-50)
    basic.pause(1000)
})
```

```blocks
basic.forever(() => {
    lineSensors.displaySensors()
})
```


## Supported targets

* for PXT/microbit

## License

MIT

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
