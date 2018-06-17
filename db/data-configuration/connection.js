const mySQL = require('mysql');

var conn;

conn = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "tree_node_view_db"
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("MYSQL connected")
});

module.exports = conn;