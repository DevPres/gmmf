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

async function readDir(req, res) {
    console.log(client.status)
    if (client.status !== "connected") {
        res.writeHead(400, { 'content-type': 'application/json' });
        res.end(JSON.stringify({
            client: "Client not ready",
        }));
        return
    }

    client.connection.sftp((err, sftp) => {
        if (err) {
            errorHandler({
                code: 500,
                message: `Can't create sftp connection -> ${err}`
            }, req, res);
            return
        }
        sftp.readdir('Downloads', (err, list) => {
            if (err) {
                errorHandler({ code: 400, message: err }, req, res);
                return
            }
            console.dir(list);
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(JSON.stringify({
                client: "connected",
                data: list

            }));

        });
    })
}


export {
    connect,
    disconnect,
    readDir,
}

