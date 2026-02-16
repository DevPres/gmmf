import { Client } from './ssh.cjs';
import * as  http from 'http';

let conn;
let clientConnected = false;

const formatError = (err) => {
    return {
        message: err.message || 'Errore sconosciuto',
        stack: err.stack, // Opzionale: utile per il debug
        code: err.code
    };
};

function createConnection() {
    if (!clientConnected) {
        conn = new Client();
        conn.connect({
            host: process.env.REMOTE_IP,
            port: 22,
            username: process.env.REMOTE_USERNAME,
            password: process.env.REMOTE_PASSWORD
        })
        conn.on('close', () => {
            console.log('Closing connection')
            clientConnected = false;
        });

        conn.on('end', () => {
            console.log('Closing connection')
            clientConnected = false;
        });
    }
}

function closeConnection() {
    if (conn) {
        console.log('Closing connection')
        conn.end();
    }
    console.log('Exiting...')

}


const server = http.createServer((req, res) => {
    const { method, url } = req;
    const parsedUrl = new URL(url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;



    if (method === 'GET' && pathname === '/connect') {

        if (clientConnected) {
            const responseData = JSON.stringify({
                client: "Already connected",
            }, null, 2);
            res.end(responseData + "\n");
            return
        }

        createConnection()

        conn.on('ready', () => {
            clientConnected = true;
            console.log('Connection ready');
            res.writeHead(200, { 'content-type': 'application/json' });
            const responseData = JSON.stringify({
                client: "connected",
                path: req.headers.host
            }, null, 2);

            res.end(responseData + "\n");
        })
        conn.on('error', (err) => {
            console.error(`Connection error: ${err}`);
            res.writeHead(500, { 'content-type': 'application/json' });
            res.end(JSON.stringify({
                client: "error",
                error: formatError(err),
                url: url
            }))

        })
    }
});

const PORT = 4848;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

process.on('exit', (code) => {
    console.log(`Process exited with code ${code} `);
})
// Catch Ctrl+C
process.on('SIGINT', () => {
    closeConnection();
    process.exit();
});

// Catch 'kill' commands
process.on('SIGTERM', () => {
    closeConnection();
    process.exit();
});
// console.log('Client :: ready');
// conn.sftp((err, sftp) => {
//     if (err) throw err;
//     sftp.readdir('Downloads', (err, list) => {
//         if (err) throw err;
//         console.dir(list);
//         conn.end();
//     });
// });
