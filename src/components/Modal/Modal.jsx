import ReactModal from 'react-modal';
import s from './Modal.module.css';
import { svg } from '../../constants/index.js';

export default function Modal({ onClose, children }) {

  return (
    <ReactModal
      overlayClassName={s.backdrop}
      isOpen={true}
      className={s.modal}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      onRequestClose={onClose}
      onAfterOpen={() => (document.body.style.overflow = 'hidden')}
      onAfterClose={() => (document.body.style.overflow = 'unset')}
    >
      <button className={s.closeBtn} onClick={onClose}>
        <svg className={s.iconX}>
          <use href={`${svg}#icon-x`}></use>
        </svg>
      </button>
      {children}
    </ReactModal>
  );
}