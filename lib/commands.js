var tf2md = require('../index.js');

module.exports = {

    generate: function (file, output) {
        tf2md.loadFromFile(file);
        if (output != undefined) {
            fs.writeFile(
        }
    }

}
