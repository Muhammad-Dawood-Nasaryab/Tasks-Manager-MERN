import express from "express";

import authRoutes from "./users.route.js";
import tasksRoutes from "./tasks.route.js";

import authenticated from "../middlewares/auth.middleware.js";

// Main router initialization
const router = express.Router();

// Routes
/**
 * Routes for user authentication (register, login, logout).
 * Prefix: /api/auth
 */
router.use("/auth", authRoutes);

/**
 * Routes for task management (requires authentication).
 * Prefix: /api/tasks
 */
router.use("/tasks", authenticated, tasksRoutes);

export default router;
