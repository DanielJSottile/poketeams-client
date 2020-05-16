import React, { Component } from 'react'

export default class TeamButton extends Component {

  handleOnClick = (e) => {
    e.preventDefault();
    console.log("hey you clicked me");
    const {team} = e.target;

    // some kind of APIservice.GetSingleTeam(team.id)
  };

  render() {
    return (
      <button 
      id={this.props.id} 
      onClick={this.handleOnClick}>
        {this.props.team_name}
      </button>
    );
  };
};
