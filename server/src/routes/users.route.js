import express from "express";

import authenticated from "../middlewares/auth.middleware.js";

import { registerUser, loginUser, logoutUser } from "../controllers/users.controller.js";

// Initializing router
const router = express.Router();

// Routes
router.post("/register", registerUser);                  // To add user to database
router.post("/login", loginUser);                        // To give user a token and authorize
router.post("/logout", authenticated, logoutUser);       // To add user token to blacklist

export default router;
