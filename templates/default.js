var tf2md = require('../index.js');

/**
 * Default template to generate markdown file
 */
module.exports = {

    run: function (output) {

        var data = tf2md.loadFromFile('./terraform.tfstate');

        var base_properties = [];

        Object.keys(data).forEach(function (key) {
            // Simple Root properties (string, number)
            if (typeof(data[key]) != 'object' && !Array.isArray(data[key]) && typeof(data[key]) != '') {
                base_properties.push({p: key + ': ' + data[key]})
            } else {
                // Complex properties (array, object)
                var sub_properties = {};
                var properties_array = [];
                base_properties.push({p: key});
                
                if (typeof(data[key]) == 'object') {
                    data[key].forEach(function (value) {
                        // Value of the properties is simple (string, number)
                        if (typeof(value) != 'object' && !Array.isArray(value) && typeof(value) != '') {
                            base_properties.push(value);
                        } else {
                            // Value of the properties is complex (object, array)
                            if (Array.isArray(value)) {
                                // Value is simple
                                data[key].forEach(function (v) {
                                    if (typeof(data[key]) != 'object' && !Array.isArray(data[key]) && typeof(data[key]) != '') {
                                        properties_array.push(v);
                                    }
                                });
                            } else if (typeof(value) == 'object') {
                                // Value is object
                                Object.keys(value).forEach(function (k) {
                                    
                                    if (typeof(value[k]) == 'string') {
                                    } else if (Array.isArray(value[k])) {
                                        var sub = [];
                                        value[k].forEach(function (a) {
                                            sub.push(a);
                                        });
                                        properties_array.push([ k, {ul: sub}]);
                                    } else if (typeof(value[k]) == 'object') {
                                        var sub = [];
                                        Object.keys(value[k]).forEach(function (d) {
                                            var sub2 = [];
                                            if (typeof(value[k][d]) == 'string') {
                                                sub2.push([d + ': ' + value[k][d]]);
                                                sub.push(sub2);
                                            } else {
                                                Object.keys(value[k][d]).forEach(function (s) {
                                                    if (typeof(value[k][d][s]) == 'string') {
                                                        sub2.push(s + ': ' + value[k][d][s]);
                                                    } else if (typeof(value[k][d][s]) == 'object') {
                                                        var sub3 = [];
                                                        Object.keys(value[k][d][s]).forEach(function (u) {
                                                            var sub4 = [];
                                                            if (typeof(value[k][d][s][u]) == 'object') {
                                                                Object.keys(value[k][d][s][u]).forEach(function (g) {
                                                                    sub4.push(g + ': ' + value[k][d][s][u][g]);
                                                                });
                                                                sub3.push([u, { ul: sub4 }]);
                                                            } else if (typeof(value[k][d][s][u]) == 'string') {
                                                                sub3.push(u + ': ' + value[k][d][s][u]);
                                                            }

                                                        });
                                                        sub2.push([s, { ul: sub3 } ]);
                                                    }
                                                });
                                                sub.push([ d, { ul: sub2 }]);
                                            }
                                            
                                        });
                                        properties_array.push([k, {ul: sub}]);
                                    }
                                });
                            }
                        }
                    });
                }
                sub_properties = {ul: properties_array};

                base_properties.push(sub_properties);
            }
        })
        tf2md.addRow(base_properties);

        tf2md.generate(output);
    }
}
