import React, { Fragment } from 'react';
import styles from './LoadingBlack.module.scss';

// Component

const LoadingBlack = (props: any) => {
  // Final Render

  return (
    <Fragment>
      <div className={styles['loading-black']}></div>
    </Fragment>
  );
};

export default LoadingBlack;
