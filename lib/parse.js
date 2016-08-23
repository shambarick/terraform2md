
module.exports = {
    /**
     * Parse the content to JSON
     * @param {string} content - The content to read as JSON
     */
    parse: function (content) {
        data = JSON.parse(content);
        return data;
    }
};
