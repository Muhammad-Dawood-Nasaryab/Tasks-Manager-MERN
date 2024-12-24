import mongoose from "mongoose";

import connectTasksDB from "./tasks.connection.js";

// Task Schema
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
