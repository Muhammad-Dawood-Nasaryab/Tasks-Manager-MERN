
/**
 * Middleware to handle requests to undefined routes.
 * - Creates an error object with a 404 status code.
 * - Passes the error to the error-handling middleware for further processing.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 */
const notFound = (req, res, next) => {
   const error = new Error(`Not Found - ${req.originalURL}`);
   error.status = 404;
   next(error);
};

export default notFound;

