import React, { FunctionComponent } from 'react';
import PokeballLoader from '../PokeballLoader/PokeballLoader';
import LoadingBlack from '../LoadingBlack/LoadingBlack';
import styles from './LazyLoader.module.scss';

const LazyLoader: FunctionComponent = () => {
  return (
    <div className={styles['lazy-loader']}>
      <PokeballLoader />
      <LoadingBlack />
    </div>
  );
};

export default LazyLoader;
