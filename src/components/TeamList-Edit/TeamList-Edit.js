import React, { Fragment, useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import TeamEdit from '../Team-Edit/Team-Edit';

const TeamListEdit = (props) => {

  const GenCon = useContext(GeneralContext);

  const {userTeams, currentClickedFolder} = GenCon;

  const TeamList = userTeams
    .filter(team => team.folder_id === currentClickedFolder.id)
    .map((team, i) => {
      return <TeamEdit className="btn" id={`${team.team_name}`} key={i} team={team}/>
    });

  return (
    <Fragment>
      {TeamList.length > 0 ? TeamList : <h3>There Are No Teams!  Make Teams with Pokemon!</h3>}
    </Fragment>
  );
};

export default TeamListEdit;


