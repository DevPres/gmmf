import { Client } from './ssh.cjs';

let connection;
let clientConnected = false;

function createConnection() {
    if (!clientConnected) {
        connection = new Client();
        connection.connect({
            host: process.env.REMOTE_IP,
            port: 22,
            username: process.env.REMOTE_USERNAME,
            password: process.env.REMOTE_PASSWORD
        })
        connection.on('close', () => {
            console.log('Closing connection')
            clientConnected = false;
        });

        connection.on('end', () => {
            console.log('Closing connection')
            clientConnected = false;
        });
    }
}


function closeConnection() {
    if (connection) {
        console.log('Closing connection')
        connection.end();
    }
    console.log('Exiting...')
}

export {
    connection,
    clientConnected,
    createConnection,
    closeConnection,
}

