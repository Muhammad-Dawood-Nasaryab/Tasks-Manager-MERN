import chalk from "chalk";
import dotenv from "dotenv";

import app from "./src/app.js";

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
   console.log(`\nServer listening at ${chalk.bgBlack(` http://localhost:${PORT}: `)}`);
});
