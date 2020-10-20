import React from 'react';
import PokeballLoader from '../PokeballLoader/PokeballLoader';
import LoadingBlack from '../LoadingBlack/LoadingBlack';
import './LazyLoader.scss';

// Componenet

const LazyLoader = (props: any) => {
  // Final Render

  return (
    <div className="lazy-loader">
      <PokeballLoader />
      <LoadingBlack />
    </div>
  );
};

export default LazyLoader;
