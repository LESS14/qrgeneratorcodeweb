import React, { useState } from "react";
import Modal from "react-modal";

let isOpen = false;

export const openLimitExceededModal = () => {
  isOpen = true;
};

export const closeLimitExceededModal = () => {
  isOpen = false;
};

const LimitExceededModal: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleRequestClose = () => {
    closeLimitExceededModal();
    setModalIsOpen(false);
  };

  if (isOpen) {
    setModalIsOpen(true);
    isOpen = false;
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleRequestClose}
      contentLabel="Limit Exceeded Modal"
    >
      <div className="error-modal">
        <p>O texto excede o limite máximo de caracteres (2953).</p>
        <button onClick={handleRequestClose}>Fechar</button>
      </div>
    </Modal>
  );
};

export default LimitExceededModal;
