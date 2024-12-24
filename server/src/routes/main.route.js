import express from "express";

import authRoutes from "../modules/users/users.route.js";
import tasksRoutes from "../modules/tasks/tasks.route.js";

import authenticated from "../middlewares/auth.middleware.js";

// Making Router
const router = express.Router();

// Routes
router.use("/auth", authRoutes);                         // For authentication related routes
router.use("/tasks", authenticated, tasksRoutes);        // For tasks

export default router;
