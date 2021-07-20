import React, { FunctionComponent } from 'react';
import classnames from 'classnames';
import PokeballLoader from '../PokeballLoader';
import Loading from '../Loading';
import styles from './LazyLoader.module.scss';

type LazyLoaderProps = {
  /** class for the entire container, is appended to the existing class */
  containerClass?: string;
  /** an alternate message to be appended to the bottom */
  message?: string;
  /** an alternate class for the message */
  messageClass?: string;
};

const LazyLoader: FunctionComponent<LazyLoaderProps> = ({
  containerClass = '',
  message = '',
  messageClass = '',
}) => {
  return (
    <div className={classnames(styles['lazy-loader'], containerClass)}>
      <PokeballLoader />
      <Loading isDefaultLoader />
      {!!message && <h3 className={messageClass}>{message}</h3>}
    </div>
  );
};

export default LazyLoader;
