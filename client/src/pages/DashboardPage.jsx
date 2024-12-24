import "../styles/pages/DashboardPage.css";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import EditTask from "../components/EditTask";
import TasksCard from "../components/TasksCard";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import { useTasksAPI } from "../hooks/useTasksAPI";
import { useLoading } from "../context/LoadingContext";

const DashboardPage = () => {
   const [allTasks, setAllTasks] = useState([]);
   const [tasks, setTasks] = useState([]);
   const [filterOption, setFilterOption] = useState("");
   const [error, setError] = useState(null);
   const [newTask, setNewTask] = useState({
      title: "",
      description: "",
   });
   const [editTask, setEditTask] = useState({
      _id: "",
      title: "",
      description: "",
   });

   const { toggleLoading } = useLoading();
   const { openModal, closeModal } = useModal();
   const { isAuthenticated } = useAuth();
   const {
      getTasksAPI,
      deleteTaskAPI,
      completeTaskAPI,
      createTaskAPI,
      updateTaskAPI
   } = useTasksAPI();

   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated) {
         navigate("/");
      }
      fetchTasks();
   }, []);

   useEffect(() => {
      applyFilter(filterOption, allTasks);
   }, [filterOption, allTasks]);

   const handleDelete = async (task) => {
      toggleLoading(true);
      try {
         task.isDeleting = true;

         await new Promise((resolve) => setTimeout(resolve, 900));
         await deleteTaskAPI(task._id);

         const updatedTasks = allTasks.filter((t) => t._id !== task._id);

         setAllTasks(updatedTasks);
         applyFilter(filterOption, updatedTasks);
      } catch (error) {
         console.error("Failed to delete task", error);
      } finally {
         toggleLoading(false);
      };
   };

   const handleEdit = (task) => {
      setEditTask(task);

      const content = (
         <div>
            <EditTask task={task} onSubmit={handleTaskEdit} />
         </div>
      );

      openModal(content);
   };

   const handleTaskEdit = async (updatedTask) => {
      toggleLoading(true);
      try {
         const { data } = await updateTaskAPI(updatedTask._id, updatedTask.title, updatedTask.description);
         console.log("updated Task: ", data);

         if (data.error) {
            console.error("Failed to update task", data.error);
            return;
         };

         if (data.message === "Token not provided") {
            localStorage.removeItem("accessToken");
            navigate("/");
            return;
         };

         const updatedTasks = allTasks.map((task) =>
            task._id === updatedTask._id? updatedTask : task
         );
         setAllTasks(updatedTasks);
         applyFilter(filterOption, updatedTasks);
      } catch (error) {
         console.error("Failed to update task", error);
      } finally {
         toggleLoading(false);
      };
   };

   const handleTaskStatusChange = async (taskId, newStatus) => {
      toggleLoading(true);
      try {
         const { data } = await completeTaskAPI(taskId, newStatus);

         if (data.error) {
            console.error("Failed to update task status", data.error);
            return;
         };

         if (data.message === "Token not provided") {
            localStorage.removeItem("accessToken");
            navigate("/");
            return;
         };

         const updatedTasks = allTasks.map((task) =>
            task._id === taskId ? { ...task, completed: newStatus } : task
         );
         setAllTasks(updatedTasks);
         applyFilter(filterOption, updatedTasks);
      } catch (error) {
         console.error("Failed to update task status", error);
      } finally {
         toggleLoading(false);
      };
   };

   const fetchTasks = async () => {
      toggleLoading(true);
      try {
         const { data } = await getTasksAPI();
         const sortedTasks = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

         if (data.message === "Token not provided") {
            localStorage.removeItem("accessToken");
            navigate("/");
            return;
         };

         sortedTasks.map((task) => task.isDeleting = false);

         setAllTasks(sortedTasks);
         setTasks(sortedTasks);
      } catch (error) {
         console.error("Failed to fetch tasks", error);
      } finally {
         toggleLoading(false);
      };
   };

   const applyFilter = (filterOption, tasksList) => {
      if (filterOption === "") {
         setTasks(tasksList);
      } else if (filterOption === "pending") {
         setTasks(tasksList.filter((task) => !task.completed));
      } else if (filterOption === "completed") {
         setTasks(tasksList.filter((task) => task.completed));
      };
   };

   const handleNewTask = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (newTask.title.trim() === "" || newTask.description.trim() === "") {
         setError("Please fill in all fields");
         return;
      };

      toggleLoading(true);

      try {
         const { data } = await createTaskAPI(newTask.title, newTask.description);
         if (data.error) {
            console.log(data.error);
            setError(data.error);
            return;
         };

         if (data.message === "Token not provided") {
            localStorage.removeItem("accessToken");
            navigate("/");
            return;
         };

         setAllTasks([data, ...allTasks]);
         applyFilter(filterOption, [...allTasks, data]);
         setNewTask({ title: "", description: "" });
      } catch (error) {
         setError(error.error);
         console.log("Error creating task", error.error);
      } finally {
         toggleLoading(false);
      };
   };

   return (
      <>
         <h2 className="dashboard-page-heading">Dashboard</h2>
         {error && <p className="error">{error}</p>}
         <div className="dashboard-page-container">
            <div className="dashboard-page-all-tasks">
               <div className="dashboard-page-portion-title">Your Tasks</div>
               <div className="dashboard-controller">
                  <select
                     className="dashboard-page-filter-select"
                     value={filterOption}
                     onChange={(e) => setFilterOption(e.target.value)}
                  >
                     <option value="">All Tasks</option>
                     <option value="completed">Completed Tasks</option>
                     <option value="pending">Pending Tasks</option>
                  </select>
               </div>
               {tasks.map((task) => (
                  <TasksCard
                     key={task._id}
                     task={task}
                     onDelete={() => handleDelete(task)}
                     onEdit={() => handleEdit(task)}
                     onStatusChange={(task, newStatus) => handleTaskStatusChange(task, newStatus)}
                  />
               ))}
            </div>
            <div className="dashboard-page-new-task">
               <div className="new-task-form-container">
                  <div className="dashboard-page-portion-title">Create Task</div>
                  <form onSubmit={(e) => handleNewTask(e)} className="new-task-form">
                     <label htmlFor="new-task-title-field">Title:</label>
                     <input
                        className="new-task-title-field"
                        id="new-task-title-field"
                        type="text"
                        placeholder="Enter task title..."
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        autoComplete="off"
                        required={true}
                     />
                     <label htmlFor="new-task-description-field">Description:</label>
                     <textarea
                        className="new-task-description-field"
                        rows="9"
                        cols="50"
                        placeholder="Enter task description..."
                        required={true}
                        id="new-task-description-field"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                     />
                     <button type="submit" className="new-task-submit-btn">Create</button>
                  </form>
               </div>
            </div>
         </div>
      </>
   );
};

export default DashboardPage;
