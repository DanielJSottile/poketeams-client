import React, { Component, Fragment } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import TeamPublic from '../Team-Public/Team-Public';


export default class TeamList extends Component {

  static contextType = GeneralContext;

  render() {

    const {publicTeams} = this.context;

    const TeamList = publicTeams.map((team, i) => {
      return <TeamPublic key={i} id={`${team.team_name}`} team={team}/>
    });

    return (
      <Fragment>
        {TeamList.length > 0 ? TeamList : <h3>There Are No Teams!  Make Teams with Pokemon!</h3>}
      </Fragment>
    );
  };
};


