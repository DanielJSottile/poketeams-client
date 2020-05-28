import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import apiService from '../../services/apiService';
import TeamPublic from '../../components/Team-Public/Team-Public';

export default class ShareTeamPage extends Component {

  static contextType = UserContext;

  state = {
    team: []
  }

  componentDidMount() {

    const {addPublicSets} = this.context;


    apiService.getSingleTeam(this.props.match.params.team_id) // Get the single public team!
      .then(data => {
        this.setState({team: [...this.state.team, data]})
        apiService.getSetsForOneTeam(this.props.match.params.team_id)
          .then(data => {
            addPublicSets(data)
          })
    })
  }


  render() {

    

    return (
      
      <div>
       { this.state.team[0] ? <TeamPublic team={this.state.team[0]}/> : <h3>This team seems to not exist anymore</h3>}
      </div>
    );
  };
};
