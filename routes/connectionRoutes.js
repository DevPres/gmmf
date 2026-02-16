import * as client from '../client.js'

export const connectionRoutes = async (req, res, pathname, method) => {
    const endpoint = patname.split('/')[1];

    if (method === 'GET', endpoint === '/connect') {

        if (client.clientConnected) {
            const responseData = JSON.stringify({
                client: "Already connected",
            }, null, 2);
            res.end(responseData + "\n");
            return
        }

        client.createConnection()

        client.connection.on('ready', () => {
            client.clientConnected = true;
            console.log('Connection ready');
            res.writeHead(200, { 'content-type': 'application/json' });
            const responseData = JSON.stringify({
                client: "connected",
                path: req.headers.host
            }, null, 2);

            res.end(responseData + "\n");
        })

        client.connection.on('error', (err) => {
            console.error(`Connection error: ${err}`);
            throw Error({ code: 500, message: err.message })

        })
    }

}
