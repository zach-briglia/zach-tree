const conn = require("./connection.js")

function objToSql(ob){
    var arr = [];
    for(var key in ob){
        var value = ob[key];
        if(Object.hasOwnProperty.call(ob,key)){
            if(typeof value === "string" && value.indexOf(" ") >= 0){
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
};

const objectRelator = {

    selectAll: function(dbTable, cb) {
        var query = `SELECT * from ${dbTable};`
        conn.query(query, function(error, result) {
            if (error) throw error;
            cb(result);
        });
    },

    insertParent: function(dbTable, columns, values, cb) {
        var query = `INSERT INTO ${dbTable}(${columns.toString()}) VALUES("${values}");`;
        conn.query(query, values, function(error, result) {
            if (error) throw error;
            cb(result);
        });
    },

    deleteParents: function(dbTable,columns,values,cb) {
        var query = `DELETE FROM ${dbTable} WHERE ${columns.toString()} = "${values}";`;
        conn.query(query, values, function(error,result) {
            if (error) throw error;
            cb(result);
        });
    },

    deleteChildren: function(dbTable,columns,values,cb) {
        var query = `DELETE FROM ${dbTable} WHERE ${columns.toString()} = "${values}";`;
        conn.query(query, values, function(error,result) {
            if (error) throw error;
            cb(result);
        });
    },

    updateParentName: function(dbTable, value, whereCondition, cb) {
        var query = `UPDATE ${dbTable} SET parent_name = "${value}" WHERE ${whereCondition};`
        conn.query(query, value, function(error, result){
            if (error) throw error
            cb(result)
        });
    },

    updateFactories: function(dbTable, columnsValues, whereCondtition, cb) {
        var query = `UPDATE ${dbTable} SET ${objToSql(columnsValues)} WHERE ${whereCondtition};`
        //console.log(query)
        conn.query(query, function(error, result){
            if (error) throw error;
            cb(result);
        });
    },

    insertFactories: function(dbTable, columns, values, cb) {
        var query = `INSERT INTO ${dbTable}(${columns.toString()}) VALUES ?;`
        conn.query(query, [values], function(error, result){
            //console.log(query);
            if (error) throw error;
            cb(result);
        });
    }
}

module.exports = objectRelator;