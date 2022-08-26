import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

const Modal = ({ closeModal, largeImage }) => {
  const keyDownCallback = useCallback(
    e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', keyDownCallback);

    return () => {
      window.removeEventListener('keydown', keyDownCallback);
    };
  }, [keyDownCallback]);

  const handleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={style.Overlay} onClick={handleBackDropClick}>
      <div className={style.Modal}>
        <img
          className={style.Image}
          src={largeImage}
          alt="The pic that you just chose"
        />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};

export default Modal;
