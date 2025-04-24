// // Custom Error Class
// class ApiError extends Error {
//   constructor(statusCode, message, isOperational = true) {
//     super(message);
//     this.statusCode = statusCode;
//     this.isOperational = isOperational;
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// // Error Handling Middleware
// const errorHandler = (err, req, res, next) => {
//   let { statusCode, message } = err;

//   // Set default values for unexpected errors
//   if (!statusCode) statusCode = 500;
//   if (!message) message = "An unexpected error occurred.";

//   // Log the error (only operational errors in production)
//   if (process.env.NODE_ENV !== "production" || !err.isOperational) {
//     logger.error({
//       message: err.message,
//       stack: err.stack,
//       statusCode,
//       route: req.originalUrl,
//       method: req.method
//     });
//   }

//   // Send response to client (hide details in production)
//   res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message: process.env.NODE_ENV === "production" && !err.isOperational
//       ? "Internal Server Error"
//       : message
//   });
// };

// // Fallback for unhandled routes
// const notFoundHandler = (req, res, next) => {
//   next(new ApiError(404, `Route ${req.originalUrl} not found.`));
// };

// // Centralized error handler export
// module.exports = {
//   ApiError,
//   errorHandler,
//   notFoundHandler,
//   logger
// };

const logger = require("../util/logger");

const errorHandler = (err, req, res, next) => {
  const errorStack = err?.stack || "No stack trace available";
  const errorMessage = err?.message || "Internal Server Error";

  logger.error(errorStack);
  // logger.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || "internal  Server Error ",
  });
  
};

module.exports = errorHandler;
