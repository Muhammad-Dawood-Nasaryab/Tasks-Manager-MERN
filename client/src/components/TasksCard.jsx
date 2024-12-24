import "../styles/components/TasksCard.css";

import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { useModal } from "../context/ModalContext";

const TasksCard = ({ task, onDelete, onStatusChange, onEdit }) => {
   const [completed, setCompleted] = useState(task.completed);
   const [status, setStatus] = useState(() => (completed ? "Completed" : "Pending"));
   const formattedDate = new Date(task.createdAt).toLocaleString();

   const { openModal, closeModal } = useModal();

   const handleEdit = () => {
      onEdit(task);
   };

   const handleDelete = () => {

      const content = (
         <div className="modal-delete-content">
            <p>Are you sure you want to delete this task?</p>
            <div>
               <button className="modal-close-btn" onClick={closeModal}>No</button>
               <button 
                  onClick={() => {onDelete(); closeModal()}}
                  className="modal-yes-button"
               >
                  Yes</button>
            </div>
         </div>
      );

      openModal(content);
   };

   const handleStatusChange = async () => {
      try {
         const newStatus = !completed;
         // Update local state
         setCompleted(newStatus);
         setStatus(newStatus ? "Completed" : "Pending");

         // Notify parent component to update the global task list
         onStatusChange(task._id, newStatus);
      } catch (error) {
         console.log("Error", error);
      }
   };

   return (
      <div className={`task-card ${task.isDeleting ? "fade-out" : ""}`}>
         <div onClick={handleStatusChange}>
            <div className="task-card-title">{task.title}</div>
            <div className="task-card-description">{task.description}</div>
            <div className="task-card-status">
               Status:{" "}
               <span className={completed ? "status-true" : "status-false"}>
                  {status}
               </span>
            </div>
            <div className="task-card-created-at">
               Created at: <span className="date">{formattedDate}</span>
            </div>
         </div>
         <div className="task-card-buttons">
            <button className="edit-task-button" onClick={handleEdit}>
               <FaEdit style={{ fontSize: "20px" }} />
            </button>
            <button className="delete-task-button" onClick={handleDelete}>
               <MdDelete style={{ fontSize: "20px" }} />
            </button>
         </div>
      </div>
   );
};

export default TasksCard;
