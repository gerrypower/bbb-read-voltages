# BeagleBone Black - Read Voltage


## Decription
Continuously read the voltage from the specified pin, log it to a file, until some lower voltage threshold is passed. Was used to monitor voltage drop over time of different batteries for a science project.

## Usage
Copy to your BeagleBone and run 'node read_voltages.js'. See the source for various config options, such as the pin that is monitored and the output file naming options. By default it will create a voltages_*n*.csv file, where '*n*' will be number used to ensure file name uniqueness. 


## License

This repository is released under the [MIT license](http://www.opensource.org/licenses/MIT).

## Author

* [Gerry Power](https://github.com/gerrypower)