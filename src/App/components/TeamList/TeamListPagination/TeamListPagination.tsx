import React, { useContext, FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../Button';
import GeneralContext from '../../../contexts/GeneralContext';
import styles from './TeamListPagination.module.scss';

const TeamListPagination: FunctionComponent = () => {
  const { page, handlePage } = useContext(GeneralContext);
  return (
    <div className={styles['team-pagination']}>
      {page > 1 ? (
        <div className={styles['pagebutton']}>
          <Button
            onClickCallback={() => {
              handlePage('down');
            }}
          >
            {`Go to Previous 10 Teams`}{' '}
            <FontAwesomeIcon icon={faArrowCircleLeft} />
          </Button>
          <Button
            onClickCallback={() => {
              handlePage('up');
            }}
          >
            <FontAwesomeIcon icon={faArrowCircleRight} />{' '}
            {`Go to Next 10 Teams`}
          </Button>
        </div>
      ) : (
        <div className={styles['pagebutton']}>
          <Button
            onClickCallback={() => {
              handlePage('up');
            }}
          >
            <FontAwesomeIcon icon={faArrowCircleRight} />{' '}
            {`Go to Next 10 Teams`}
          </Button>
        </div>
      )}
      <span>{`Current Teams: ${page * 10 - 9} - ${page * 10}`}</span>
      <h3>Teams:</h3>
    </div>
  );
};
export default TeamListPagination;
