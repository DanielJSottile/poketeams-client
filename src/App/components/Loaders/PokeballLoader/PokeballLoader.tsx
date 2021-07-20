import React, { FunctionComponent } from 'react';
import styles from './PokeballLoader.module.scss';

const PokeballLoader: FunctionComponent = () => {
  return (
    <div className={styles['pokeball']}>
      <span></span>
    </div>
  );
};

export default PokeballLoader;
