import React, { Fragment, FunctionComponent } from 'react';
import styles from './LoadingWhite.module.scss';

const LoadingWhite: FunctionComponent = () => {
  return (
    <Fragment>
      <div className={styles['loading-white']}></div>
    </Fragment>
  );
};

export default LoadingWhite;
