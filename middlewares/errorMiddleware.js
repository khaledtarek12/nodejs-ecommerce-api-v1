const errorHanderlerDev = (error, response) => {
  response.status(error.statusCode).json({
    status: error.status,
    error: error,
    message: error.message,
    stack: error.stack,
  });
};
const errorHanderlerProd = (error, response) => {
  response.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

const globalErrorHandler = (error, request, response, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    errorHanderlerDev(error, response);
  } else {
    errorHanderlerProd(error, response);
  }
};

module.exports = globalErrorHandler;
