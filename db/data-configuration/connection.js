require('dotenv').config();
const mySQL = require('mysql');

var conn;

conn = mySQL.createConnection(process.env.CLEARDB_DATABASE_URL);

conn.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + conn.threadId);
});

module.exports = conn;