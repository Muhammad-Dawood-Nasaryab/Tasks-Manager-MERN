import chalk from "chalk";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectUsersDB = async () => {
   try {
      // Select database URI based on environment (test or production)
      const db = process.env.NODE_ENV === "test" ? process.env.TEST_DB_URI : process.env.USERS_URI;
      const conn = await mongoose.createConnection(db, {
         serverSelectionTimeoutMS: 50000, // Increased timeout for server selection
      }).asPromise();

      console.log(
         `\n${chalk.bgGreen(chalk.white(" Success "))} Connected to ${
            process.env.NODE_ENV === "test" ? "Test" : "Users"
         } database`
      );

      return conn;
   } catch (error) {
      console.error(
         `\n${chalk.bgRed(chalk.white(" Fail "))} Error connecting to ${
            process.env.NODE_ENV === "test" ? "Test" : "Users"
         } database: ${error}`
      );
      process.exit(1); // Exit the process if connection fails
   };
};

export default connectUsersDB;
