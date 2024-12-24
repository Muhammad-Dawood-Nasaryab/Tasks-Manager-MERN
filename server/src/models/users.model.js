import bcrypt from "bcrypt";
import mongoose from "mongoose";

import connectUsersDB from "../connections/users.connection.js";

// User Schema definition
/**
 * Schema for users collection in the database.
 * - `username`: Unique username of the user (required).
 * - `email`: Email address of the user (required, unique).
 * - `password`: Encrypted password of the user (required).
 * - `admin`: Boolean indicating if the user has admin privileges, defaults to false.
 */
export const UserSchema = new mongoose.Schema({
   username: { 
      type: String, 
      required: true 
   },
   email: { 
      type: String, 
      required: true, 
      unique: true 
   },
   password: { 
      type: String, 
      required: true 
   },
   admin: {
      type: Boolean,
      default: false,  // Default is false for regular users
   },
});

// Hashing password before saving
UserSchema.pre("save", async function (next) {
   if (!this.isModified()) return next();

   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

// Connect to Users database
const connection = await connectUsersDB();
const User = connection.model("User", UserSchema);

export default User;
