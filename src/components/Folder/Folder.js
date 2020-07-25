import React, { Component } from 'react';
import GeneralContext from '../../contexts/GeneralContext';

export default class Folder extends Component {

  static contextType = GeneralContext;

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
