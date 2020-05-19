import React, { Component, Fragment } from 'react';
import UserContext from '../../contexts/UserContext';
import TeamPublic from '../Team-Public/Team-Public';
import apiService from '../../services/apiService';

export default class TeamList extends Component {

  static contextType = UserContext;

  render() {

    const {publicTeams} = this.context;

    const TeamList = publicTeams.map((team, i) => {
      return <TeamPublic key={i} team={team}/>
    });

    return (
      <Fragment>
        {TeamList.length > 0 ? TeamList : <h3>Cannot Find The Teams!  Things may be broken.</h3>}
      </Fragment>
    );
  };
};


