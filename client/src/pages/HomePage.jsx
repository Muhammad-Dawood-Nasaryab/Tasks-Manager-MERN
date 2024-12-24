import "../styles/pages/HomePage.css";

import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";

import { useAuth } from "../context/AuthContext";
import { useTasksAPI } from "../hooks/useTasksAPI";
import { useLoading } from "../context/LoadingContext";

const HomePage = () => {
   const [tasks, setTasks] = useState([]);
   const [latestTasks, setLatestTasks] = useState([]);
   
   const { isAuthenticated } = useAuth();
   const { toggleLoading } = useLoading();
   const { getTasksAPI } = useTasksAPI();

   const fetchTasks = async () => {

      toggleLoading(true);
      try {
         const { data } = await getTasksAPI();

         const sortedTasks = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

         setTasks(sortedTasks);
         setLatestTasks(sortedTasks.slice(0, 3));

         console.log("Fetched tasks:", data);
      } catch (error) {
         console.error("Failed to fetch tasks", error);
      } finally {
         toggleLoading(false);
      };
   };

   useEffect(() => {
      fetchTasks();
   }, []);

   return (
      <div className="home-page-container">
         <p className="home-page-heading">Manage your Tasks with ease!</p>
         { isAuthenticated ? (
            tasks ? (
               <>
                  <p className="home-page-recent">Your Recent Tasks:</p>
                  <ul className="recent-tasks-list">
                     { latestTasks.map((task) => (
                        <div className="home-page-task-card">
                           <p className="home-page-task-card-title">{ task.title }:</p>
                           <p className="home-page-task-card-description">{ task.description }</p>
                        </div>
                     )) }
                  </ul>
                  <Link to={"/dashboard"} className="view-all-tasks">
                     Dashboard <FaArrowRight className="view-all-tasks-icon" />
                  </Link>
               </>
            ) : (
               <p>You have no tasks</p>
            )
         ) : (
            <>
               <p>Start managing your tasks now!</p>
               <div className="auth-buttons">
                  <Link to={"/login"} className="auth-button">
                     <div>
                        Login
                        <FaArrowRight className="auth-button-icon" />
                     </div>
                  </Link>
                  <Link to={"/register"} className="auth-button">
                     <div>
                        Register
                        <FaArrowRight className="auth-button-icon" />
                     </div>
                  </Link>
               </div>
            </>
         ) }
      </div>
   );
};

export default HomePage;
