var tf2md = require('../index.js');
var _     = require('lodash');

/**
 * Default template to generate markdown file
 */
module.exports = {

    run: function (outputPath) {

        var data = tf2md.loadFromFile('./terraform.tfstate');

        var d = this.parse(data);

        tf2md.addRow(d);

        tf2md.generate(outputPath);
    },

    parse: function (input) {
        if (input === '') {
            return '';
        }
        if (!_.isArray(input) && !_.isObject(input)) {
            return input;
        }
        if (_.isObject(input) || _.isArray(input)) {
            var self = this;
            var data = [];
            _.forEach(input, function(value, key) {
                var v = self.parse(value);
                if (_.isObject(value) || _.isArray(value)) {
                    data.push([key, v]);
                } else {
                    data.push(key + ': ' + v);
                }
            });
            return { ul: data };
        }
    }
};
