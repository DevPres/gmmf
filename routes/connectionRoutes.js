import { ssh as client } from '../client.js'
import { errorHandler } from '../core/errorHandler.js';

export const connectionRoutes = async (req, res, pathname, method) => {
    console.log(pathname);
    const endpoint = pathname.split('/')[2];
    console.log(endpoint);
    if (method === 'GET' && endpoint === 'connect') {

        if (client.status === "connected") {
            console.log('client already connected. Skipping...')
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(JSON.stringify({
                client: "Already connected",
            }, null, 2));
            return
        }

        if (client.status === "pending") {
            console.log("client already in connection. Skipping...")
            res.writeHead(200, { 'content-type': 'application/json' });
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
    }

}
