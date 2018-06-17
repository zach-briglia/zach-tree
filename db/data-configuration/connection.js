const mySQL = require('mysql');

var conn;

conn = mySQL.createConnection({
    host: "us-cdbr-iron-east-04.cleardb.net",
    user: "b97ec1b95d497a",
    password: "143f2ac0",
    database: "heroku_4a9ac6654cfc0f6"
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("MYSQL connected")
});

module.exports = conn;