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
      <div className={styles['flex-container']}>
        <header role="banner">
          <h2 className={styles['no-margin']}>Results:</h2>
        </header>
        <div className={styles['pagebutton']}>
          <Button
            buttonClass={styles['button-class']}
            onClickCallback={() => {
              handlePage('up');
            }}
          >
            <FontAwesomeIcon icon={faArrowCircleRight} />{' '}
            {`Go to Next 10 Teams`}
          </Button>
          {page > 1 && (
            <Button
              buttonClass={styles['button-class']}
              onClickCallback={() => {
                handlePage('down');
              }}
            >
              {`Go to Previous 10 Teams`}{' '}
              <FontAwesomeIcon icon={faArrowCircleLeft} />
            </Button>
          )}
        </div>
        <span>{`Current Teams: ${page * 10 - 9} - ${page * 10}`}</span>
      </div>

      <h3 className={styles['no-margin']}>Teams:</h3>
    </div>
  );
};
export default TeamListPagination;
