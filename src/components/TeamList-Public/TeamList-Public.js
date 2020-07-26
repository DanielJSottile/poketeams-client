import React, { Fragment, useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import TeamPublic from '../Team-Public/Team-Public';
import PokeballLoader from '../Loaders/PokeballLoader/PokeballLoader';
import LoadingBlack from '../Loaders/LoadingBlack/LoadingBlack';


const TeamListPublic = (props) => {

  const GenCon = useContext(GeneralContext);

  const {publicTeams} = GenCon;

  const TeamList = publicTeams.map((team, i) => {
      return <TeamPublic key={i} id={`${team.team_name}`} team={team}/>
  });

  return (
    <Fragment>
      {TeamList.length > 0 ? TeamList : 
      <div className="pokeball-div">
        <PokeballLoader/>
        <LoadingBlack/>
      <h3 className="hint">(Hint: There May Be No Teams)</h3>
    </div>}
    </Fragment>
  );
};

export default TeamListPublic;


