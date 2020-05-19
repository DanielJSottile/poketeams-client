import React, { Component, Fragment } from 'react';
import UserContext from '../../contexts/UserContext';
import TeamEdit from '../Team-Edit/Team-Edit';
import apiService from '../../services/apiService';

export default class TeamList extends Component {

  static contextType = UserContext;


  render() {

    const {userTeams} = this.context;

    const TeamList = userTeams.map((team, i) => {
      return <TeamEdit key={i} team={team}/>
    });

    return (
      <Fragment>
        {TeamList.length > 0 ? TeamList : <h3>Cannot Find The Teams!  Things may be broken.</h3>}
      </Fragment>
    );
  };
};


