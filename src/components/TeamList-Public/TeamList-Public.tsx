import React, { Fragment, useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import TeamPublic from '../Team-Public/Team-Public';
import PokeballLoader from '../Loaders/PokeballLoader/PokeballLoader';
import LoadingBlack from '../Loaders/LoadingBlack/LoadingBlack';
import './TeamList-Public.css';

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
    <div className="team-pagination">
    {page.value > 1 ? (
      <div className="pagebutton">
        <button
          onClick={() => {
            handlePageDown();
          }}
        >
          {`Go to Previous 10 Teams`}{' '}
          <i className="fas fa-arrow-circle-left"></i>
        </button>
        <button
          onClick={() => {
            handlePageUp();
          }}
        >
          <i className="fas fa-arrow-circle-right"></i>{' '}
          {`Go to Next 10 Teams`}
        </button>
      </div>
    ) : (
      <div className="pagebutton">
        <button
          onClick={() => {
            handlePageUp();
          }}
        >
          <i className="fas fa-arrow-circle-right"></i>{' '}
          {`Go to Next 10 Teams`}
        </button>
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
        <div className="pokeball-div">
          <PokeballLoader />
          <LoadingBlack />
          <h3 className="hint">(Hint: There May Be No Teams)</h3>
        </div>
      )}
    </Fragment>
  );
};

export default TeamListPublic;
