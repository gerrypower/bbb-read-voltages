/*global require: false, file: false, setTimeout: false */
/*jslint node: true, stupid: true */
(function () {
    "use strict";

    var b = require('bonescript'),
        path = require('path'),
        fs = require('fs'),
        fileNameExtension = '.csv',
        fileName = '/home/root/voltages_1' + fileNameExtension,
        fileNameDivider = '_',
        file,
        inputPin = 'P9_36',
        delayInMilliSeconds = 1000 * 60,
        accumulatedSeconds = delayInMilliSeconds / 1000 * -1;

    function log(seconds, volts) {
        file.write(seconds + "," + volts + "\n");
    }

    function valueToVolts(value) {
        var ADC_TO_VOLT_CONSTANT = 1.8;
        return value * ADC_TO_VOLT_CONSTANT;
    }

    function createUniqueFileName(fname) {
        var basename = path.basename(fname, fileNameExtension),
            splitName,
            nextFileNum;

        splitName = basename.split(fileNameDivider);
        nextFileNum = parseInt(splitName[1], 10) + 1;
        return uniqueFileName(splitName[0] + fileNameDivider +
                              nextFileNum + fileNameExtension);
    }

    function uniqueFileName(fname) {
        return fs.existsSync(fname) ? createUniqueFileName(fname) : fname;
    }

    function readVoltage() {
        var volts = valueToVolts(b.analogRead(inputPin));
        accumulatedSeconds = accumulatedSeconds + (delayInMilliSeconds / 1000);
        log(accumulatedSeconds, volts);
        if (volts > 0.02) { setTimeout(readVoltage, delayInMilliSeconds); }
    }

    file = fs.createWriteStream(uniqueFileName(fileName));
    readVoltage();

}());