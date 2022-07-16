import React from 'react';
import {
  faXmark,
  faCircleExclamation,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-hot-toast';
import Button from '../../Button';
import styles from './customToasts.module.scss';

type Renderable = JSX.Element | string | null;

const customToast = (message: string, icon: Renderable, duration: number) => {
  return toast(
    (t) => (
      <div className={styles['toast']}>
        <span className={styles['text']}>{message}</span>
        <Button
          onClickCallback={() => toast.dismiss(t.id)}
          buttonClass={styles['close-button']}
        >
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </div>
    ),
    {
      icon,
      duration,
    }
  );
};

export const customSuccessToast = (message: string) =>
  customToast(
    message,
    <FontAwesomeIcon icon={faCircleCheck} className={styles['green']} />,
    3000
  );

export const customErrorToast = (message: string) =>
  customToast(
    message,
    <FontAwesomeIcon icon={faCircleExclamation} className={styles['red']} />,
    6000
  );
