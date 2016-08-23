var fs      = require('fs');
var file    = require('./file.js');
var json2md = require('json2md');

module.exports = {

    input: [],

    addRow: function(row) {
        this.input.push(row);
    },

    generate: function (output) {
        // By default, we use console output
        if (output === undefined) {
            console.log(json2md(this.input));
        } else {
            // File ooutput
            file.write(output, json2md(this.input));
        }
    }

};
