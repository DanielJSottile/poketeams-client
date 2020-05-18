import React, { Component, Fragment } from 'react';
import UserContext from '../../contexts/UserContext';
import TeamEdit from '../Team-Edit/Team-Edit';
import apiService from '../../services/apiService';

export default class TeamList extends Component {

  static contextType = UserContext;

  state = {
    error: null,
    teams: [],
    sets: []
  };

  componentDidMount() {
    // apiService.getTenTeams()
    //   .then(teams => this.setState({teams: teams}))
    //   .catch((err) => {
    //     this.setState({error: err});
    //   });

    // apiService.getSetsforTenTeams()
    //   .then(sets => this.setState({sets: sets}))
    //   .catch((err) => {
    //     this.setState({error: err});
    //   });
  }

  render() {

    const teams = this.state.teams;

    const TeamList = teams.map((team, i) => {
      return <TeamEdit key={i} id={team.id} name={team.team_name}/>
    });

    return (
      <Fragment>
        {TeamList.length > 0 ? TeamList : <h3>Cannot Find The Teams!  Things may be broken.</h3>}
      </Fragment>
    );
  };
};


