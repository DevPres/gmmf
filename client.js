import { Client } from './ssh.cjs';



class ClientSSH {
    connection;
    status = 'disconnected';

    setConnected() {
        this.status = 'connected';
    }
    setPending() {
        this.status = 'pending';
    }

    setDisconnected() {
        this.status = 'disconnected';
    }


    createConnection() {
        console.log('Create connection...')
        if (this.status === 'disconnected') {
            this.connection = new Client();
            this.connection.connect({
                host: process.env.REMOTE_IP,
                port: 22,
                username: process.env.REMOTE_USERNAME,
                password: process.env.REMOTE_PASSWORD
            })
            this.connection.on('close', () => {
                console.log('Closing this.connection')
                this.setDisconnected();
            });

            this.connection.on('end', () => {
                console.log('Closing this.connection')
                this.setDisconnected();
            });
        }
    }

    closeConnection() {
        if (this.connection) {
            console.log('Closing this.connection')
            this.connection.end();
        }
        console.log('Exiting...')
    }
}

export const ssh = new ClientSSH()
