import React, { Fragment } from 'react';
import styles from './PokeballLoader.module.scss';

const PokeballLoader: React.FC = () => {
  return (
    <Fragment>
      <div className={styles['pokeball']}>
        <span></span>
      </div>
    </Fragment>
  );
};

export default PokeballLoader;
