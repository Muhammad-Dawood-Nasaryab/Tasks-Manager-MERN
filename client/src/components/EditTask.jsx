import "../styles/components/EditTask.css";

import React from "react";

import { useState } from "react";

import { useModal } from "../context/ModalContext";

const EditTask = ({ task, onSubmit }) => {
   const [editTask, setEditTask] = useState(task);
   const [error, setError] = useState(null);

   const { closeModal } = useModal();

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!editTask.title ||!editTask.description) {
         setError("Title and description are required");
         return;
      };
      onSubmit(editTask);
      closeModal();
   };

   return (
      <div className="modal-edit-content">
         <h2>Edit Task</h2>
         <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
               type="text"
               id="title"
               value={editTask.title}
               onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
            />
            <label htmlFor="description">Description:</label>
            <textarea
               id="description"
               value={editTask.description}
               rows="4"
               cols="50"
               onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
            />
            {error && <p className="error">{error}</p>}
            <div>
               <button className="modal-close-btn" onClick={closeModal}>Cancel</button>
               <button className="modal-yes-button" type="submit">Save Changes</button>
            </div>
         </form>
      </div>
   );
};

export default EditTask;
