var fs      = require('fs');
var json2md = require('json2md');

module.exports = {

    input: [],

    addRow: function(row) {
        this.input.push(row);
    },

    generate: function (output) {
        if (output == undefined) {
            console.log(json2md(this.input));
        } else {
            fs.writeFile(output, json2md(this.input), function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log(output + " has been generated successfully");
            });
        }
    }

}
