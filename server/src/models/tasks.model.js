import mongoose from "mongoose";

import connectTasksDB from "../connections/tasks.connection.js";

// Task Schema definition
/**
 * Schema for tasks collection in the database.
 * - `title`: Title of the task (required).
 * - `description`: Detailed description of the task (required).
 * - `completed`: Status of the task, defaults to false.
 * - `user`: Reference to the user who owns the task (required).
 * - `createdAt`: Timestamp when the task was created, defaults to current date.
 */
export const TasksSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   completed: {
      type: Boolean,
      default: false,
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   }
});

// Connect to Tasks database
const connection = await connectTasksDB();
const Tasks = connection.model("Task", TasksSchema);

export default Tasks;
