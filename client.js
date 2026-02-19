import { Client } from './ssh.cjs';



class ClientSSH {
    connection;
    status = 'disconnected';

    setConnected() {
        this.status = 'connected';
    }
    setConnectionPending() {
        this.status = 'connection';
    }
    setDisconnectionPending() {
        this.status = 'disconnection'
    }

    setDisconnected() {
        this.status = 'disconnected';
    }


    createConnection() {
        console.log('Create connection...')
        if (this.status === 'disconnected') {
            if (!this.connection) {
                this.connection = new Client();
            }
            this.setConnectionPending();
            this.connection.connect({
                host: process.env.REMOTE_IP,
                port: 22,
                username: process.env.REMOTE_USERNAME,
                password: process.env.REMOTE_PASSWORD
            })
            this.connection.on('close', () => {
                console.log('Closing connection')
                this.setDisconnected();
            });

            this.connection.on('end', () => {
                console.log('Closing connection')
                this.setDisconnected();
            });
        }
    }

    closeConnection() {
        if (this.connection) {
            console.log('Closing connection...')
            this.setDisconnectionPending();
            this.connection.end();
        }
    }
}

export const ssh = new ClientSSH()
