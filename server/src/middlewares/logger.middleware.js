import chalk from "chalk";

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