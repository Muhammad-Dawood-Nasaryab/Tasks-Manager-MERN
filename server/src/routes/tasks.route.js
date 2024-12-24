import express from "express";

import { getTasks, createTask, editTask, deleteTask } from "../controllers/tasks.controller.js";

// Initializing router
const router = express.Router();

// Tasks routes
router.get("/", getTasks);             // For getting all the tasks
router.post("/", createTask);          // For creating a new task
router.put("/:id", editTask);          // For editing an eexisting task
router.delete("/:id", deleteTask);     // For deleting a task

export default router;
