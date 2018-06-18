require('dotenv').config();
const mySQL = require('mysql');

function handleDisconnect() {
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
            handleDisconnect();                         
        } else {                                      
            throw err;
            return;                                  
        }
    });
}
handleDisconnect()

module.exports = connection;