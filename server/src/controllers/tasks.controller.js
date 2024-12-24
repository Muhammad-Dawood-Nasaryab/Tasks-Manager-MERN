import Tasks from "../models/tasks.model.js";
import User from "../models/users.model.js";

/**
 * @desc - Create a new task
 * @route - POST /api/tasks
 * @auth - Required
 */
export const createTask = async (req, res, next) => {
   const newTask = req.body;

   try {
      const user = User.findById(newTask.user);
      if (!user) {
         const error = new Error("User not found");
         error.status = 404;
         throw error;
      };

      if (!newTask.user) {
         newTask.user = req.userId;
      };

      const task = new Tasks(newTask)
      await task.save();

      res.status(201)
         .json({ 
            message: "Task created successfully", 
            data: task,
         });
   } catch (error) {
      console.error("Error creating task:", error);
      next(error);
   };
};

/**
 * @desc - Retrive all tasks
 * @route - GET /api/tasks
 * @auth - Required
 */
export const getTasks = async (req, res, next) => {
   const userId = req.userId;
   
   try {
      const tasks = await Tasks.find({ user: userId }); 
      res.status(200)
         .json({ 
            message: "Successfull",
            data: tasks,
         });
   } catch (error) {
      console.error("Error retrieving tasks:", error);
      next(error);
   };
};

/**
 * @desc - Editing an existing task
 * @route - PUT /api/tasks/<id>
 * @auth - Required
 */
export const editTask = async (req, res, next) => {
   const taskId = req.params.id;
   const updatedTask = req.body;

   try {
      const task = await Tasks.findByIdAndUpdate(taskId, updatedTask, { new: true });
      if (!task) {
         const error = new Error("Task not found");
         error.status = 404;
         throw error;
      };

      res.status(200)
         .json({ 
            message: "Task updated successfully", 
            data: task,
         });
   } catch (error) {
      console.error("Error editing task:", error);
      next(error);
   };
};

/**
 * @desc - Deleting a task
 * @route - DELETE /api/tasks/<id>
 * @auth - Required
 */
export const deleteTask = async (req, res, next) => {
   const taskId = req.params.id;

   try {
      const task = await Tasks.findByIdAndDelete(taskId);
      if (!task) {
         const error = new Error("Task not found");
         error.status = 404;
         throw error;
      };

      res.status(200)
         .json({ message: "Task deleted successfully" });
   } catch (error) {
      console.error("Error deleting task:", error);
      next(error);
   };
};
