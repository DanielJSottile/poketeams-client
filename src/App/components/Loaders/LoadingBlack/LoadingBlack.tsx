import React, { Fragment } from 'react';
import styles from './LoadingBlack.module.scss';

const LoadingBlack: React.FC = () => {
  return (
    <Fragment>
      <div className={styles['loading-black']}></div>
    </Fragment>
  );
};

export default LoadingBlack;
