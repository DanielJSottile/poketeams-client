import React, { FunctionComponent, ReactNode } from 'react';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ValidationError.module.scss';

type ValidationErrorProps = {
  /** position from top in pixels */
  errorPosition?: string;
  errorBoolean: boolean;
  validationCallback: () => ReactNode;
};

const ValidationError: FunctionComponent<ValidationErrorProps> = ({
  errorPosition = '',
  errorBoolean,
  validationCallback,
}) => {
  if (errorBoolean && !!validationCallback()) {
    return (
      <p
        className={styles['error-validate']}
        style={{ top: `${errorPosition}` || 'unset' }}
      >
        <FontAwesomeIcon icon={faExclamationTriangle} /> {validationCallback()}
      </p>
    );
  }
  return null;
};

export default ValidationError;
