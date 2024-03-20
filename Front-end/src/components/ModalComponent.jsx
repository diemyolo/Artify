import React, { useState } from "react";
import Modal from "flowbite-react"; 

const ModalComponent = ({ isOpen, onClose, children }) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      {children}
    </Modal>
  );
};

export default ModalComponent;
