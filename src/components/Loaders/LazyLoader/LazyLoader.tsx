import React from 'react';
import PokeballLoader from '../PokeballLoader/PokeballLoader';
import LoadingBlack from '../LoadingBlack/LoadingBlack';
import styles from './LazyLoader.module.scss';

// Componenet

const LazyLoader = (props: any) => {
  // Final Render

  return (
    <div className={styles['lazy-loader']}>
      <PokeballLoader />
      <LoadingBlack />
    </div>
  );
};

export default LazyLoader;
