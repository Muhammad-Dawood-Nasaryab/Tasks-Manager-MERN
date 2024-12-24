
/**
 * Middleware to handle errors and send structured responses to the client.
 * - Captures errors thrown in the application and formats them for the client.
 * - Defaults to a 500 status code if none is provided.
 * 
 * @param {Object} err - The error object thrown by the application.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
   const statusCode = err.status || 500;
   res.status(statusCode).json({
      error: err.message || "Internal Server Error",
   });
};

export default errorHandler;