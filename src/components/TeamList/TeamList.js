import React, { Component, Fragment } from 'react';
import UserContext from '../../contexts/UserContext';
import Team from '../Team/Team';

export default class TeamList extends Component {

  static contextType = UserContext;

  render() {

    const {teams} = this.context;

    const TeamList = teams.map((team, i) => {
      return <Team key={i} id={team.id} name={team.team_name}/>
    });

    return (
      <Fragment>
        {TeamList.length > 0 ? TeamList : <h3>Cannot Find The Teams!  Things may be broken.</h3>}
      </Fragment>
    );
  };
};


