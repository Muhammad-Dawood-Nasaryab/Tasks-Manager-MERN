import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import tokenBlacklist from "../utils/tokenBlacklist.util.js";

dotenv.config();

/**
 * Middleware to authenticate the user by verifying the provided JWT.
 * - Checks if the token exists and is not blacklisted.
 * - Decodes the token to extract user information and attaches it to the request object.
 * - If the token is invalid or expired, sends a 401 Unauthorized response.
 */
const authenticated = (req, res, next) => {
   const token = req.headers.authorization.replace("Bearer ", "");
   if (!token || tokenBlacklist.has(token)) {
      return res.status(401).json({ message: "Token not provided" });
   };
   
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();  
   } catch (error) {
      res.status(401)
         .json({ message: "Invalid or expired token" });
   };
};

export default authenticated;
