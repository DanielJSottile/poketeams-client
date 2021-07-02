import React, { Fragment } from 'react';
import styles from './LoadingWhite.module.scss';

// Component

const LoadingWhite = (props: any) => {
  // Final Render

  return (
    <Fragment>
      <div className={styles['loading-white']}></div>
    </Fragment>
  );
};

export default LoadingWhite;
