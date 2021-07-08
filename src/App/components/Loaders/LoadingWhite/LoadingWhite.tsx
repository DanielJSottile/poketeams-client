import React, { Fragment } from 'react';
import styles from './LoadingWhite.module.scss';

const LoadingWhite: React.FC = () => {
  return (
    <Fragment>
      <div className={styles['loading-white']}></div>
    </Fragment>
  );
};

export default LoadingWhite;
