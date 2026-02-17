import { errorHandler } from "../core/errorHandler.js";
import { connectionRoutes } from "./connectionRoutes.js";

export const router = async (req, res) => {
    const { method, url } = req;
    const parsedUrl = new URL(url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (pathname.startsWith('/connection')) {
        await connectionRoutes(req, res, pathname, method);
    } else {
        errorHandler({ code: 404, message: "Route not found" }, req, res)
    }
}
