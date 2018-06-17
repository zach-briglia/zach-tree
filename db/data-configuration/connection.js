require('dotenv').config();
const mySQL = require('mysql');

var conn;

conn = mySQL.createConnection(process.env.DATABASE_URL);

conn.connect(function(err) {
    if (err) throw err;
    console.log("MYSQL connected")
});

module.exports = conn;