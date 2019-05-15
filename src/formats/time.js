// numeral.js format configuration
// format : time
// author : Adam Draper : https://github.com/adamwdraper

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('format', 'time', {
        regexps: {
            format: /(:)/,
            unformat: /(:)/
        },
        format: function(value, format, roundingFunction) {
            var hours = Math.floor(value / 60 / 60),
                minutes = Math.floor((value - (hours * 60 * 60)) / 60),
                seconds = Math.round(value - (hours * 60 * 60) - (minutes * 60));

            return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
        },
        unformat: function(string) {
            var timeArray = string.split(':'),
                seconds = 0,
                bigSecs = new numeral.options.BigDecimalLib(0);

            var big60 = new numeral.options.BigDecimalLib(60);

            // turn hours and minutes into seconds and add them all up
            if (timeArray.length === 3) {
                // hours
                seconds = seconds + (Number(timeArray[0]) * 60 * 60);
                bigSecs = bigSecs.add((new numeral.options.BigDecimalLib(timeArray[0])).multiply(big60).multiply(big60));
                // minutes
                seconds = seconds + (Number(timeArray[1]) * 60);
                bigSecs = bigSecs.add((new numeral.options.BigDecimalLib(timeArray[1])).multiply(big60));
                // seconds
                seconds = seconds + Number(timeArray[2]);
                bigSecs = bigSecs.add(new numeral.options.BigDecimalLib(timeArray[2]));
            } else if (timeArray.length === 2) {
                // minutes
                seconds = seconds + (Number(timeArray[0]) * 60);
                bigSecs = bigSecs.add((new numeral.options.BigDecimalLib(timeArray[0])).multiply(big60));
                // seconds
                seconds = seconds + Number(timeArray[1]);
                bigSecs = bigSecs.add(new numeral.options.BigDecimalLib(timeArray[1]));
            }
            return {value : Number(seconds), bigValue:bigSecs};
        }
    });
}));