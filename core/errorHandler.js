export const errorHandler = (err, req, res) => {
    console.error(err)
    res.writeHead(err.code || 500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        error: err.message,
        code: err.code
    }))
}
