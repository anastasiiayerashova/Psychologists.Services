import ReactModal from 'react-modal';
import s from './Modal.module.css';
import { ModalProps } from '../../../types/PropsTypes.ts';


export default function Modal({ onClose, children }: ModalProps) {

  return (
    <ReactModal
      overlayClassName={s.backdrop}
      isOpen={true}
      className={s.modal}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      onRequestClose={onClose}
      closeTimeoutMS={1000}
      onAfterOpen={() => (document.body.style.overflow = 'hidden')}
      onAfterClose={() => (document.body.style.overflow = 'unset')}
    >
      {children}
    </ReactModal>
  );
}