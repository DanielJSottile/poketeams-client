import React, { Fragment, useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import TeamPublic from '../Team-Public/Team-Public';


const TeamListPublic = (props) => {

  const GenCon = useContext(GeneralContext);

  const {publicTeams} = GenCon;

  const TeamList = publicTeams.map((team, i) => {
      return <TeamPublic key={i} id={`${team.team_name}`} team={team}/>
  });

  return (
    <Fragment>
      {TeamList.length > 0 ? TeamList : <h3>There Are No Teams!  Make Teams with Pokemon!</h3>}
    </Fragment>
  );
};

export default TeamListPublic;


