// numeral.js format configuration
// format : percentage
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
    numeral.register('format', 'percentage', {
        regexps: {
            format: /(%)/,
            unformat: /(%)/
        },
        format: function(value, format, roundingFunction) {
            var space = numeral._.includes(format, ' %') ? ' ' : '',
                output;

            if (numeral.options.scalePercentBy100) {
                value = value * 100;
            }

            // check for space before %
            format = format.replace(/\s?\%/, '');

            output = numeral._.numberToFormat(value, format, roundingFunction);

            if (numeral._.includes(output, ')')) {
                output = output.split('');

                output.splice(-1, 0, space + '%');

                output = output.join('');
            } else {
                output = output + space + '%';
            }

            return output;
        },
        unformat: function(string) {
            var numValue = numeral._.stringToNumber(string);

            var number = numValue.value,
                bigValue = numValue.bigValue;

            if (numeral.options.scalePercentBy100) {
                number = number * 0.01;
                bigValue = bigValue.multiply(new numeral.options.BigDecimalLib('0.01'));
            }
            return {value:number,bigValue:bigValue};
        }
    });
}));
