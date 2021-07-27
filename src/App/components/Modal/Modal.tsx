import React, { FunctionComponent, ReactNode, ReactPortal } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';
import styles from './Modal.module.scss';

type ModalProps = {
  children: ReactNode;
  isModalOpen: boolean;
  handleSetModal: () => void;
};

const portalDiv = document.getElementById('portal');

const Modal: FunctionComponent<ModalProps> = ({
  children,
  isModalOpen,
  handleSetModal,
}): ReactPortal | null => {
  if (!isModalOpen) {
    return null;
  }
  return (
    portalDiv &&
    createPortal(
      <>
        <div className={styles['overlay']}>
          <div className={styles['modal']}>
            <Button
              onClickCallback={() => handleSetModal()}
              buttonClass={styles['close-button']}
            >
              <FontAwesomeIcon
                icon={faWindowClose}
                size={'3x'}
                className={styles['icon']}
              />
            </Button>
            {children}
          </div>
        </div>
      </>,
      portalDiv
    )
  );
};

export default Modal;
