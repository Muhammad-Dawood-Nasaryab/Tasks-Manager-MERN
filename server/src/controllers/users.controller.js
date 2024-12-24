import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "./users.model.js";

import tokenBlacklist from "../../utils/tokenBlacklist.util.js";

dotenv.config();

/**
 * @desc - Add user to database
 * @route - POST /api/auth/register
 * @auth - Not Required
 */
export const registerUser = async (req, res, next) => {
   const user = req.body;
   const newUser = new User(user);

   try {
      const userExists = await User.findOne({ email: user.email });
      if (userExists) {
         const error = new Error("Email already registered");
         error.status = 400;
         throw error;
      };

      await newUser.save();

      res.status(201)
         .json({ 
            message: "Successfull", 
            data: newUser 
         });
   } catch (error) {
      next(error);  
   };
};

/**
 * @desc - Authenticate user & get token
 * @route - POST /api/auth/login
 * @auth - Not Required
 */
export const loginUser = async (req, res, next) => {
   const userCredentials = req.body;

   try {
      const user = await User.findOne({ email: userCredentials.email });
      if (!user) {
         const error = new Error("User not found");
         error.status = 404;
         throw error;
      };

      const isMatch = await bcrypt.compare(
         userCredentials.password,
         user.password,
      );

      if (!isMatch) {
         const error = new Error("Invalid password");
         error.status = 400;
         throw error;
      };

      const token = jwt.sign(
         { id: user._id, email: user.email },
         process.env.JWT_SECRET,
         { expiresIn: "1h" }
      );

      res.status(200)
         .json({ 
            message: "Successfull", 
            data: { token, user },
         });
   } catch (error) {
      next(error);
   };
};

/**
 * @desc - Add token to the blacklist and logout
 * @route - POST /api/auth/logout
 * @auth - Required
 */
export const logoutUser = async (req, res, next) => {
   try {
      // Verify the Authorization header exists and is formatted properly
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
         console.error("Invalid or missing Authorization header:", authHeader);
         return res.status(401).json({ error: "Token not provided" });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
         console.error("Token is missing after splitting Authorization header.");
         return res.status(401).json({ error: "Token not provided" });
      }

      // Add the token to the blacklist (dummy implementation for debugging)
      const result = tokenBlacklist.add(token);
      console.log("Token added to blacklist:", result);

      res.status(200).json({ message: "Logged out successfully" });
   } catch (error) {
      console.error("An unexpected error occurred during logout:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
   }
};
