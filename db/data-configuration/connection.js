const mySQL = require('mysql');

var conn;

conn = mySQL.createConnection('mysql://b97ec1b95d497a:143f2ac0@us-cdbr-iron-east-04.cleardb.net/heroku_4a9ac6654cfc0f6?reconnect=true');

conn.connect(function(err) {
    if (err) throw err;
    console.log("MYSQL connected")
});

module.exports = conn;