const globalErrorHandler = (error, request, response, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    response.status(error.statusCode).json({
        status: error.status,
        error: error,
        message: error.message,
        stack: error.stack,
    });
};

module.exports = globalErrorHandler;