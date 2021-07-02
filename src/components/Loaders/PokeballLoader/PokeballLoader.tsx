import React, { Fragment } from 'react';
import styles from './PokeballLoader.module.scss';

// Componenet

const PokeballLoader = (props: any) => {
  // Final Render

  return (
    <Fragment>
      <div className={styles['pokeball']}>
        <span></span>
      </div>
    </Fragment>
  );
};

export default PokeballLoader;
