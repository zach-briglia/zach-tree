require('dotenv').config();
const mySQL = require('mysql');

var conn;
conn = mySQL.createConnection(process.env.JAWSDB_URL);

conn.connect(function(err) {
    if (err) {
        throw err;
    }
});

module.exports = conn;