const objectRelator = require("../db/data-configuration/objectRelator.js");

const parent = {
    selectAll: function(cb) {
        objectRelator.selectAll("parents", function(result) {
            cb(result);
        });
    },
    createParent: function(columns, values, cb) {
        objectRelator.insertParent("parents", columns, values, function(result){
            cb(result);
        });
    },
    deleteParent: function(columns,values,cb) {
        objectRelator.deleteParents("parents",columns,values,function(res){
            cb(res);
        });
    },
    updateParentName: function(value, whereCondition, cb) {
        objectRelator.updateParentName("parents", value, whereCondition, function(result){
            cb(result);
        });
    },
    updateFactories: function(values, whereCondition, cb) {
        objectRelator.updateFactories("parents", values, whereCondition, function(result){
            cb(result);
        });
    }
}

module.exports = parent;