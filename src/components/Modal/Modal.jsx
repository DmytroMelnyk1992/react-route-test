import { createPortal } from 'react-dom';
import { Component } from 'react';
import { PropTypes } from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  findImage = () => {
    const { images, id } = this.props;
    if (id) {
      return images.find(image => image.id === id);
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const foundImage = this.findImage();
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={foundImage.largeImageURL} alt={foundImage.tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  images: PropTypes.array,
  id: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
