import React, { Component, Fragment } from 'react';
import UserContext from '../../contexts/UserContext';
import TeamPublic from '../Team-Public/Team-Public';
import apiService from '../../services/apiService';

export default class TeamList extends Component {

  static contextType = UserContext;

  state = {
    error: null,
    teams: [],
    sets: []
  };

  componentDidMount() {
    
  }

  render() {

    const teams = this.state.teams;

    const TeamList = teams.map((team, i) => {
      return <TeamPublic key={i} id={team.id} name={team.team_name}/>
    });

    return (
      <Fragment>
        {TeamList.length > 0 ? TeamList : <h3>Cannot Find The Teams!  Things may be broken.</h3>}
      </Fragment>
    );
  };
};


