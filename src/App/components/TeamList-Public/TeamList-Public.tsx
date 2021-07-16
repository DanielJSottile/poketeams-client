import React, { Fragment, useContext, FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';
import TeamPublic from '../Team-Public';
import PokeballLoader from '../Loaders/PokeballLoader';
import LoadingBlack from '../Loaders/LoadingBlack';
import GeneralContext from '../../contexts/GeneralContext';
import styles from './TeamList-Public.module.scss';
import { PokemonTeam } from '../../@types';

const TeamListPublic: FunctionComponent = (): JSX.Element => {
  const { publicTeams, page, handlePage } = useContext(GeneralContext);

  const TeamList = publicTeams.map((team: PokemonTeam, i) => {
    return <TeamPublic key={i} id={`${team.team_name}`} team={team} />;
  });

  return (
    <Fragment>
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
      {TeamList.length > 0 ? (
        TeamList
      ) : (
        <div className={styles['pokeball-div']}>
          <PokeballLoader />
          <LoadingBlack />
          <h3 className={styles['hint']}>(Hint: There May Be No Teams)</h3>
        </div>
      )}
    </Fragment>
  );
};

export default TeamListPublic;
