import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

export default class TeamButton extends Component {

  static contextType = UserContext;

  render() {

    const {handleCurrentTeamClicked} = this.context;
    
    // For now, the Link doesnt go to the anchor because the hash looks disgusting.
    return ( 
      <a 
        href={`#${this.props.team_name}`}
        className="btn"
        id={this.props.id} 
        onClick={(e) => {
          e.preventDefault() 
          handleCurrentTeamClicked(this.props.team_name, this.props.id);
        }}>
        <i className="fas fa-layer-group"></i> {this.props.team_name}
      </a>
    );
  };
};
