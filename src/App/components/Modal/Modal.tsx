import React, {
  FunctionComponent,
  ReactNode,
  Dispatch,
  SetStateAction,
  ReactPortal,
} from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button';
import styles from './Modal.module.scss';

type ModalProps = {
  children: ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const portalDiv = document.getElementById('portal');

const Modal: FunctionComponent<ModalProps> = ({
  children,
  isModalOpen,
  setIsModalOpen,
}): ReactPortal | null => {
  return (
    portalDiv &&
    createPortal(
      <>
        <div className={styles['overlay']}>
          <div className={styles['modal']}>
            <Button onClickCallback={() => setIsModalOpen(!isModalOpen)}>
              X
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
