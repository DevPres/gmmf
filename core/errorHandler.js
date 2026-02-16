const formatError = (err) => {
    return {
        message: err.message || 'Errore sconosciuto',
        stack: err.stack, // Opzionale: utile per il debug
        code: err.code
    };
};

export const errorHandler = (err, req, res) => {
    console.log(err)
    console.dir(err)
    res.writeHead(err.code || 500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        error: err.message,
        code: err.code
    }))
}
