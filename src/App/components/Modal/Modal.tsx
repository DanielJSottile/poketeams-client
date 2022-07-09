import React, {
  FunctionComponent,
  ReactNode /** @todo: ReactPortal **/,
} from 'react';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createPortal } from 'react-dom';
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
  /** @todo: The types of ReactPortal and the types in react-dom are mismatched */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): any => {
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
              <FontAwesomeIcon icon={faWindowClose} size={'3x'} />
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
