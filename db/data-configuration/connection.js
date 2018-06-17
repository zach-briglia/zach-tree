require('dotenv').config();
const mySQL = require('mysql');

var conn;

function handleDisconnect() {
    conn = mySQL.createConnection(process.env.CLEARDB_DATABASE_URL);
    conn.query()
    conn.connect(function(err) {
        if (err){
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
        console.log("MYSQL connected")
    });

    conn.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
            handleDisconnect();                         
        } else {                                      
            throw err;
        }
      });
}

handleDisconnect();

module.exports = conn;