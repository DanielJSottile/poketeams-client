import React, { Fragment } from 'react';
import styles from './LoadingSets.module.scss';

const LoadingSets: React.FC = () => {
  return (
    <Fragment>
      <div className={styles['loading-sets']}></div>
    </Fragment>
  );
};

export default LoadingSets;
