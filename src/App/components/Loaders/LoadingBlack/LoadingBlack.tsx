import React, { Fragment, FunctionComponent } from 'react';
import styles from './LoadingBlack.module.scss';

const LoadingBlack: FunctionComponent = () => {
  return (
    <Fragment>
      <div className={styles['loading-black']}></div>
    </Fragment>
  );
};

export default LoadingBlack;
