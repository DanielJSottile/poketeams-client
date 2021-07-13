import React, { Fragment, FunctionComponent } from 'react';
import styles from './PokeballLoader.module.scss';

const PokeballLoader: FunctionComponent = () => {
  return (
    <Fragment>
      <div className={styles['pokeball']}>
        <span></span>
      </div>
    </Fragment>
  );
};

export default PokeballLoader;
