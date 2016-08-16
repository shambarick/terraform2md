var fs        = require('fs');
var parser    = require('./lib/parse.js');
var generator = require('./lib/generate.js');
var process   = require('process');

module.exports = {
    loadFromFile: function (file) {
        if (!fs.existsSync(file)) {
            console.log("File not found : " + file);
            process.exit(1);
        } else {
            content = fs.readFileSync(file, 'utf-8');
            return parser.parse(content);       
        }
    },
    addRow: function (row) {
        generator.addRow(row);
    },
    generate: function (output) {
        generator.generate(output);
    }
    
}

