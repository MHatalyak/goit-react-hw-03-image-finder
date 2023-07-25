import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ largeImage, onClose }) => {
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={largeImage} width="600" height="500" alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
