import React, { Component, Fragment } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import TeamEdit from '../Team-Edit/Team-Edit';

export default class TeamList extends Component {

  static contextType = GeneralContext;


  render() {

    const {userTeams, currentClickedFolder,} = this.context;

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
};


