var fs = require('fs');
var ps = require('process');

module.exports = {
	load: function (filepath, charset) {
		// Default charset to use when loading the file
		charset = charset === undefined ? 'utf-8' : charset;

		// Return the content if the file exists
		if (fs.existsSync(filepath)) {
			return fs.readFileSync(filepath, charset);
		}
		// Display an error if the file does not exist
		console.log('File not found : ' + filepath);
		ps.exit(1);
	},

	write: function (filepath, content) {
		fs.writeFile(filepath, content, function(err) {
			if (err) {
				console.log(err);
				ps.exit(1);
			}
			console.log(filepath + " has been generated successfully");
		});
	}
};
