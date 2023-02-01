import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, picture: { largeImageURL, tags } }) => {
  const handleEscButton = e => {
    if (e.code === 'Escape') {
      onClose();
    }
    window.removeEventListener('keydown', handleEscButton);
  };

  window.addEventListener('keydown', handleEscButton);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.Modal}>
        <img className={css.ModalImage} src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  picture: PropTypes.objectOf(PropTypes.string).isRequired,
};
