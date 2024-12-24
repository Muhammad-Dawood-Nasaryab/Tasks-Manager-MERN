import React from "react";

import { useState, useContext, createContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [modalContent, setModalContent] = useState(null)

   const openModal = (content) => {
      setIsModalVisible(true);
      setModalContent(content);
   };

   const closeModal = () => {
      setIsModalVisible(false);
      setModalContent(null);
   };

   return (
      <ModalContext.Provider value={{ isModalVisible, modalContent, openModal, closeModal }}>
         {children}
         {isModalVisible && (
            <div className="modal-overlay">
               <div className="modal">{modalContent}</div>
            </div>
         )}
      </ModalContext.Provider>
   );
};

export const useModal = () => useContext(ModalContext);
