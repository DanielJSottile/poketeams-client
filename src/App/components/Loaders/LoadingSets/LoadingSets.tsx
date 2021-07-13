import React, { Fragment, FunctionComponent } from 'react';
import styles from './LoadingSets.module.scss';

const LoadingSets: FunctionComponent = () => {
  return (
    <Fragment>
      <div className={styles['loading-sets']}></div>
    </Fragment>
  );
};

export default LoadingSets;
