require('dotenv').config();
const mySQL = require('mysql');

var connection;
connection = mySQL.createConnection(process.env.CLEARDB_DATABASE_URL); 
handleDisconnect(connection);

function handleDisconnect(client) {
    connection = mySQL.createConnection(process.env.CLEARDB_DATABASE_URL); 
                                                    

    connection.connect(function(err) {              
        if(err) {                                     
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect(), 2000); 
        }                                     
    });                                     
                                            
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
            handleDisconnect(connection);                         
        } else {                                      
            throw err;
            return;                                  
        }
    });
}
handleDisconnect(connection)

module.exports = connection;