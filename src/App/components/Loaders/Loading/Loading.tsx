import React, { Fragment, FunctionComponent } from 'react';
import classnames from 'classnames';
import styles from './Loading.module.scss';

type LoadingProps = {
  /** determines whether it is default black or alt white */
  isDefaultLoader: boolean;
};

const Loading: FunctionComponent<LoadingProps> = ({ isDefaultLoader }) => {
  return (
    <Fragment>
      <div
        className={classnames(styles['loading'], {
          [styles['black']]: isDefaultLoader,
          [styles['white']]: !isDefaultLoader,
        })}
      ></div>
    </Fragment>
  );
};

export default Loading;
