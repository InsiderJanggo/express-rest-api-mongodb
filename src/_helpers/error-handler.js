module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.sendStatus(400).json({ message: err });
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.sendStatus(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.sendStatus(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.sendStatus(500).json({ message: err.message });
}