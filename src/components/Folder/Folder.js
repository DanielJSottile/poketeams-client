import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';

export default class Folder extends Component {

  static contextType = UserContext;

  render() {

    const {handleCurrentFolderClicked} = this.context;

    return (
      <button 
      id={this.props.id} 
      onClick={() => handleCurrentFolderClicked(this.props.folder_name)}>
        {this.props.folder_name}
      </button>
    );
  };
};
