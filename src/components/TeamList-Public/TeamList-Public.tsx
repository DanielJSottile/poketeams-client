import React, { Fragment, useContext } from 'react';
import Button from '../Button/Button';
import TeamPublic from '../Team-Public/Team-Public';
import PokeballLoader from '../Loaders/PokeballLoader/PokeballLoader';
import LoadingBlack from '../Loaders/LoadingBlack/LoadingBlack';
import GeneralContext from '../../contexts/GeneralContext';
import styles from './TeamList-Public.module.scss';

// Interfaces

export interface PokemonTeam {
  team_name: string;
  id: number;
  folder_id: number;
}

// Component

const TeamListPublic = (props: any) => {
  // Set Context

  const GenCon = useContext(GeneralContext);

  const { publicTeams, page, handlePageDown, handlePageUp } = GenCon;

  const TeamList = publicTeams.map((team: PokemonTeam, i) => {
    return <TeamPublic key={i} id={`${team.team_name}`} team={team} />;
  });

  // Final Render

  return (
    <Fragment>
      <div className={styles['team-pagination']}>
        {page.value > 1 ? (
          <div className={styles['pagebutton']}>
            <Button
              onClickCallback={() => {
                handlePageDown();
              }}
            >
              {`Go to Previous 10 Teams`}{' '}
              <i className="fas fa-arrow-circle-left"></i>
            </Button>
            <Button
              onClickCallback={() => {
                handlePageUp();
              }}
            >
              <i className="fas fa-arrow-circle-right"></i>{' '}
              {`Go to Next 10 Teams`}
            </Button>
          </div>
        ) : (
          <div className={styles['pagebutton']}>
            <Button
              onClickCallback={() => {
                handlePageUp();
              }}
            >
              <i className="fas fa-arrow-circle-right"></i>{' '}
              {`Go to Next 10 Teams`}
            </Button>
          </div>
        )}
        <span>{`Current Teams: ${page.value * 10 - 9} - ${
          page.value * 10
        }`}</span>
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
