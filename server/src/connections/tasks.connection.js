import chalk from "chalk";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

let tasksDBConnection = null;

// Creating connection
const connectTasksDB = async () => {
   // Reuse existing connection if it exists
   if (tasksDBConnection) {
      console.log(chalk.blue("Reusing existing Tasks database connection"));
      return tasksDBConnection;
   }

   try {
      // Select database URI based on environment (test or production)
      const db = process.env.NODE_ENV === "test" ? process.env.TEST_DB_URI : process.env.TASKS_URI;
      tasksDBConnection = await mongoose.createConnection(db, {
         serverSelectionTimeoutMS: 5000, // Timeout for server selection
      }).asPromise();

      console.log(
         `\n${chalk.bgGreen(chalk.white(" Success "))} Tasks database connection established successfully`
      );

      return tasksDBConnection;
   } catch (error) {
      console.error(`\n${chalk.bgRed(chalk.white(" Fail "))} Error connecting to Tasks database: ${error}`);
      process.exit(1); // Exit the process if connection fails
   }
};

// Function to close the database connection (useful for tests)
export const closeTasksDBConnection = async () => {
   if (tasksDBConnection) {
      await tasksDBConnection.close();
      tasksDBConnection = null;
      console.log(chalk.yellow("Tasks database connection closed"));
   }
};

export default connectTasksDB;
