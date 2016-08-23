var tf2md  = require('terraform2md');

/**
 * Example how to use programmatically to generate markdown file
 */

data = tf2md.loadFromFile('./terraform.tfstate');

// We want to display the resources
Object.keys(data.modules[0].resources).forEach(function (key) {
    var vm = data.modules[0].resources[key];
    // We display the id of the resource as a title
    tf2md.addRow({ h1: vm.primary.id });
    // Then we display some information related to the resource as a list
    tf2md.addRow({ ul: [
        "First attribute: " + vm.primary.attributes['first.attribute#'],
        "Second attribute: " + vm.primary.attributes['second.attribute'],
        "Third attribute: " + vm.primary.attributes['third_attribute'],
        "Fourth attribute: " + vm.primary.attributes['fourth_attribute']
    ]});
});

// Finally, we generate what we defined previously
tf2md.generate(); // Output Console
tf2md.generate('output.md'); // Output File
