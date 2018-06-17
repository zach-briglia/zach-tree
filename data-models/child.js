const objectRelator = require("../db/data-configuration/objectRelator.js");

const child = {

    select: function(cb) {
        objectRelator.selectAll("children", function(result){
            cb(result);
        });
    },

    deleteChildren: function(columns,values,cb){
        objectRelator.deleteChildren("children",columns,values,function(result){
            cb(result);
        });
    },

    insertFactory: function(columns, values, cb) {
        objectRelator.insertFactories("children", columns, values, function(result){
            cb(result);
        });
    }

}

module.exports = child;