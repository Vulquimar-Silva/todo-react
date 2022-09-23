import Modal from 'react-modal';

import closeImg from '../assets/img/svg/close.svg';
import { emojis } from '../utils/emojis';

interface ActionsModals {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function Modals({ isOpen, onRequestClose }: ActionsModals) {

  const sortEmojis = emojis[Math.floor(Math.random() * emojis.length)]

  return (
    <section>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <span className='textModal'>
          {sortEmojis}
        </span>
        <button
          type="button"
          onClick={onRequestClose}
          className='react-modal-close'
        >
          <img src={closeImg} alt="Fechar Modal" />
        </button>
      </Modal>
    </section>
  )
}
