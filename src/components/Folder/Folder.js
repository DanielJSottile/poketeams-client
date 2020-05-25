import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';

export default class Folder extends Component {

  static contextType = UserContext;

  render() { 

    const {handleCurrentFolderClicked} = this.context;

    return (
      <button
        className="btn"
        id={this.props.id} 
        onClick={() => handleCurrentFolderClicked(this.props.folder_name, this.props.id)}>
        <i className="fas fa-folder"></i> {this.props.folder_name}
      </button>
    );
  };
};
