import React from "react";
import { useNavigate } from "react-router-dom";

import { useModal } from "../context/ModalContext";

const SessionExpiredModal = () => {
   const { closeModal } = useModal();
   const navigate = useNavigate();

   const handleLogin = () => {
      closeModal();
      navigate("/login");
   };

   return (
      <div className="session-expired-modal">
         <h2>Session Expired</h2>
         <p>Your session has expired. Please log in to continue.</p>
         <button className="modal-login-btn" onClick={handleLogin}>
            Login
         </button>
      </div>
   );
};

export default SessionExpiredModal;
