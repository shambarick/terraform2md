# terraform2md

Generate a .md from a terraform.tfstate

## Installation

For CLI usage

```
npm install -g terraform2md
```

For project usage

```
npm install --save terraform2md
```

## Usage

### CLI

Print the markdown in the console from the terraform.tfstate of the current directory

```
terraform2md generate
```

Generate the terraform.md from the terraform.tfstate of the current directory

```
terraform2md generate -o terraform.md
```

### Project

Example

```
var tf2md = require('tf2md');

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

tf2md.generate(); // Print console
tf2md.generate('terraform.md'); // Generate a terraform.md
```

### JSON2MD

See: [https://github.com/IonicaBizau/json2md#memo-documentation](https://github.com/IonicaBizau/json2md#memo-documentation)
