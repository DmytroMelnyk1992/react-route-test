import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, images, id }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const findImage = () => {
    if (id) {
      return images.find(image => image.id === id);
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const foundImage = findImage();
  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={foundImage.largeImageURL} alt={foundImage.tags} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  images: PropTypes.array,
  id: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};
