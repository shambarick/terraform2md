
module.exports = {

/**
 * Parse the content to JSON
 * @param {string} content - The content to read as JSON
 */
parse: function (content) {
    data = JSON.parse(content);
    //data.resources = this.parseResources(data.modules[0].resources);
    return data;
},

/**
 * Parse the resources to get the following format for each resource:
 * {id: "some_id_vm.server.dev", data: {}}
 * @param {Object.<string, Object>} content - The resources to parse
 */
parseResources: function (content) {
    var resources = [];
    var i = 0;
    for (var key in content) {
        resources[i] = {
            id: key,
            data: content[key]
        };
        i++;
    }
    return resources;
}

}
