import server from "../api/server";

export const useTasksAPI = () => {
   /**
    * Fetches all the tasks of user from server
    * @route - GET /api/tasks
    */
   const getTasksAPI = async () => {
      try {
         const { data } = await server.get("/tasks");
         return data;
      } catch (error) {
         const { response } = error;
         return response;
      };
   };
   
   /**
    * Sends data to the server to create a new task
    * @route - POST /api/tasks
    * @param {String} title - Title of the task
    * @param {String} description - Description of the task
    */
   const createTaskAPI = async (title, description) => {
      try {
         const body = {
            title: title,
            description: description,
         };
         const { data } = await server.post("/tasks", body);
         return data;
      } catch (error) {
         const { response } = error;
         return response;
      };
   };
   
   /**
    * Sends data to the server to update an existing task
    * @route - PUT /api/tasks/<id>
    * @param {String} taskId - ID of the task to be updated
    * @param {String} title - New title of the task
    */
   const updateTaskAPI = async (taskId, title, description) => {
      try {
         const body = {
            title: title,
            description: description,
         };
         const { data } = await server.put(`/tasks/${taskId}`, body);
         return data;
      } catch (error) {
         const { response } = error;
         return response;
      };
   };

   /**
    * Sends data to the server to complete an existing task
    * @route - PUT /api/tasks/<id>
    * @param {String} taskId - ID of the task to be completed
    */
   const completeTaskAPI = async (taskId, status) => {
      try {
         const body = {
            completed: status,
         }
         const { data } = await server.put(`/tasks/${taskId}`, body);
         return data;
      } catch (error) {
         const { response } = error;
         return response;
      };
   };
   
   /**
    * Sends data to the server to delete an existing task
    * @route - DELETE /api/tasks/<id>
    * @param {String} taskId - ID of the task to be deleted
    */
   const deleteTaskAPI = async (taskId) => {
      try {
         const { data } = await server.delete(`/tasks/${taskId}`);
         return data;
      } catch (error) {
         const { response } = error;
         return response;
      };
   };
   
   return { getTasksAPI, createTaskAPI, updateTaskAPI, deleteTaskAPI, completeTaskAPI };
};
