import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import tokenBlacklist from "../utils/tokenBlacklist.util.js";

dotenv.config();

const authenticated = (req, res, next) => {
   const token = req.headers.authorization.split(" ")[1];
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
