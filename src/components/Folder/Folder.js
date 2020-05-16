import React, { Component } from 'react'

export default class Folder extends Component {

  handleOnClick = (e) => {
    e.preventDefault();
    console.log("hey you clicked me");
    const {folder} = e.target;

    // some kind of APIservice.GetTeams(folder.id)
  };

  render() {
    return (
      <button 
      id={this.props.id} 
      onClick={this.handleOnClick}>
        {this.props.folder_name}
      </button>
    );
  };
};
