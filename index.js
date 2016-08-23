var file      = require('./lib/file.js');
var fs        = require('fs');
var generator = require('./lib/generate.js');
var parser    = require('./lib/parse.js');

module.exports = {
    loadFromFile: function (filepath) {
        return parser.parse(file.load(filepath));
    },
    addRow: function (row) {
        generator.addRow(row);
    },
    generate: function (output) {
        generator.generate(output);
    }
};

