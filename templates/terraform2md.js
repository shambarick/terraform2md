var tf2md  = require ('../index.js');

/**
 * Default template to generate markdown file
 */
module.exports = {

    run: function (output) {

        data = tf2md.loadFromFile('./terraform.tfstate');

        data.resources.forEach(function (vm, index) {
            tf2md.addRow({ h1: vm.data.primary.id });
            tf2md.addRow({ ul: [ 
                "Domain: " + vm.data.primary.attributes.domain,
                "Cluster: " + vm.data.primary.attributes.cluster,
                "Datacenter: " + vm.data.primary.attributes.datacenter,
                "Cpu: " + vm.data.primary.attributes.vcpu,
                "Memory: " + vm.data.primary.attributes.memory,
                "Ip: " + vm.data.primary.attributes["network_interface.0.ipv4_address"],
                "Passerelle: " + vm.data.primary.attributes["network_interface.0.ipv4_gateway"],
                "TimeZone: " + vm.data.primary.attributes.time_zone
            ]});
        });

        tf2md.generate(output);
    }
}
