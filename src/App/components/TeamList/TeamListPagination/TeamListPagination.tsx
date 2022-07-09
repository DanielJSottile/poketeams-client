import React, { useContext, FunctionComponent } from 'react';
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GeneralContext from '../../../contexts/GeneralContext';
import Button from '../../Button';
import styles from './TeamListPagination.module.scss';

const TeamListPagination: FunctionComponent = () => {
  const { page, handlePage, publicTeams } = useContext(GeneralContext);
  const searchCheck = publicTeams.length === 10;
  return (
    <div className={styles['team-pagination']}>
      <div className={styles['flex-container']}>
        <header role='banner'>
          <h2 className={styles['no-margin']}>Results:</h2>
        </header>
        <div className={styles['pagebutton']}>
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
          {searchCheck && (
            <Button
              buttonClass={styles['button-class']}
              onClickCallback={() => {
                if (searchCheck) {
                  handlePage('up');
                }
              }}
            >
              <FontAwesomeIcon icon={faArrowCircleRight} />{' '}
              {`Go to Next 10 Teams`}
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
