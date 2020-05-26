import React, { Component, Fragment } from 'react';
import UserContext from '../../contexts/UserContext';
import TeamPublic from '../Team-Public/Team-Public';


export default class TeamList extends Component {

  static contextType = UserContext;

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


