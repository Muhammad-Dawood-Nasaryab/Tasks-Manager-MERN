import chalk from "chalk";

/**
 * Middleware to log details about incoming HTTP requests.
 * - Logs the HTTP method and full URL to the console in a color-coded format.
 * - Assigns colors to HTTP methods for better readability in logs.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 */
const logger = (req, res, next) => {
   const methodColors = {
      GET: chalk.green,
      POST: chalk.yellow,
      PUT: chalk.blue,
      PATCH: chalk.cyan,
      DELETE: chalk.red,
   }; 

   const color = methodColors[req.method] || rgb(255,20,147);

   console.log(
      `      ${color(req.method)}   ${chalk.gray(`${req.protocol}://${req.get("host")}${req.originalUrl}`)}`
   );
   next();
};

export default logger;