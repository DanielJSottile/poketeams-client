import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';

export default class TeamButton extends Component {

  static contextType = UserContext;

  render() {

    const {handleCurrentTeamClicked} = this.context;
    return (
      <button 
      id={this.props.id} 
      onClick={() => {
        handleCurrentTeamClicked(this.props.team_name, this.props.id);
      }}>
        {this.props.team_name}
      </button>
    );
  };
};
