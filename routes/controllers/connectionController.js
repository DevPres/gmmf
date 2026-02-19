import { ssh as client } from '../../client.js'
import { errorHandler } from '../../core/errorHandler.js';

async function connect(req, res) {
    if (client.status === "connected") {
        console.log('client already connected. Skipping...')
        res.writeHead(204, { 'content-type': 'application/json' });
        res.end(JSON.stringify({
            client: "Already connected",
        }, null, 2));
        return
    }

    if (client.status === "pending") {
        console.log("client already in connection. Skipping...")
        res.writeHead(204, { 'content-type': 'application/json' });
        res.end(JSON.stringify({
            client: "Already connected",
        }, null, 2));
        return
    }
    client.createConnection()

    client.connection.on('ready', () => {
        client.setConnected();
        console.log('Connection ready');
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({
            client: "connected",
            path: req.headers.host
        }, null, 2));
    })

    client.connection.on('error', (err) => {
        console.error(`Connection error: ${err}`);
        errorHandler(err, req, res);

    })
    return
}

async function disconnect(req, res) {
    if (client.status === "disconnected") {
        console.log('client already disconnected. Skipping...')
        res.writeHead(204, { 'content-type': 'application/json' });
        res.end(JSON.stringify({
            client: "Already disconnected",
        }, null, 2));
        return
    }
    if (client.status === "disconnection") {
        console.log("client already in disconnection. Skipping...")
        res.writeHead(204, { 'content-type': 'application/json' });
        res.end(JSON.stringify({
            client: "Already in disconnection. Skipping...",
        }, null, 2));
        return
    }

    client.closeConnection()

    this.connection.on('close', () => {
        console.log('Closing connection')
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({
            client: "disconnected",
        }, null, 2));

    });
    return
}


export {
    connect,
    disconnect,
}

