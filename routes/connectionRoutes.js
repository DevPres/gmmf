import * as connectionController from './controllers/connectionController.js'
import { errorHandler } from '../core/errorHandler.js';

export const connectionRoutes = async (req, res, endpoint, method) => {
    if (method === 'GET' && endpoint === 'connect') {
        connectionController.connect(req, res);
    } else if (method === 'GET' && endpoint === 'disconnect') {
        connectionController.disconnect(req, res);
    } else if (method === 'GET' && endpoint === 'readdir') {
        connectionController.readDir(req, res);
    }
    else {
        errorHandler({ code: 404, message: "Method not valid" }, req, res)
    }

}
