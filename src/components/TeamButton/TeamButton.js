import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';

export default class TeamButton extends Component {

  static contextType = UserContext;

  render() {

    const {handleCurrentTeamClicked} = this.context;
    return (
      <button
        className="btn"
        id={this.props.id} 
        onClick={() => {
          handleCurrentTeamClicked(this.props.team_name, this.props.id);
        }}>
        <i className="fas fa-layer-group"></i> {this.props.team_name}
      </button>
    );
  };
};
