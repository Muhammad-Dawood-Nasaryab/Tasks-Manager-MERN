import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import User from "../modules/users/users.model.js";

dotenv.config();

const adminAccess = async (req, res, next) => {
   const authHeader = req.headers.authorization;

   if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token not provided" });
   };

   const token = authHeader.split(" ")[1];

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);

      if (!user) {
         return res.status(404).json({ message: "User not found" });
      };

      if (!user.admin) {
         return res.status(403).json({ message: "Forbidden: Admin access required" });
      };

      req.user = user;
      next();
   } catch (error) {
      console.error("Error in adminAccess middleware:", error);
      return res.status(500).json({ message: "Internal Server Error" });
   };
};

export default adminAccess;
