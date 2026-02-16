import * as  http from 'http';
import * as client from './client.js'
import { router } from './routes/router.js';
import { errorHandler } from './core/errorHandler.js';






const server = http.createServer(async (req, res) => {
    try {
        await router(req, res);
    } catch (error) {
        errorHandler(error, req, res)
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
    client.closeConnection();
    process.exit();
});

// Catch 'kill' commands
process.on('SIGTERM', () => {
    client.closeConnection();
    process.exit();
});
