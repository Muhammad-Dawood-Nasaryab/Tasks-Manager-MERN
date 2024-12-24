import "../styles/components/Modal.css";

import React from "react";

import { useModal } from "../context/ModalContext";

const Modal = () => {
   const { isModalVisible, hideModal, modalContent } = useModal();

   if (!isModalVisible) {
      return null;
   };

   return (
      <div className="modal-overlay" onClick={hideModal}>
         <div className="modal">
            <div className="modal-content">
               {modalContent}
            </div>
         </div>
      </div>
   );
};

export default Modal;
