exports.errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else {
        if (err.name === 'CastError') {
            err.message = 'Invalid ID format';
            err.statusCode = 400;
        }
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            err.message = `${field} already exists`;
            err.statusCode = 400;
        }
        if (err.name === 'ValidationError') {
            err.message = Object.values(err.errors).map(e => e.message).join(', ');
            err.statusCode = 400;
        }

        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
};

exports.notFound = (req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: `Route ${req.originalUrl} not found`
    });
};
