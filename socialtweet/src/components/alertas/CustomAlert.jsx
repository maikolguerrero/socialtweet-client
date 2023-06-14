import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function CustomAlert({ message, show, duration, onDismiss }) {
  useEffect(() => {
    if (show && duration) {
      const timeoutId = setTimeout(() => {
        onDismiss();
      }, duration);

      return () => clearTimeout(timeoutId);
    }
  }, [show, duration, onDismiss]);

  const handleClose = () => {
    onDismiss();
  };

  return (
    <Modal show={show} onHide={handleClose} centered className='d-flex justify-content-center align-items-center m-0 p-0'>
      <Modal.Header className="bg-warning text-white">
        <Modal.Title>Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
    </Modal>
  );
}