import React, { Component , Fragment} from 'react';
import UserContext from '../../contexts/UserContext';
import Folder from '../Folder/Folder';

export default class FoldersList extends Component {

  static contextType = UserContext;

  handleOnClick = (e) => {

  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("hey you clicked me");
    const {folder_name} = e.target;

    // some kind of APIservice.PostFolder(folder_name.value)

  }

  renderExpanded() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div>
          <label htmlFor="foldername">Folder Name:</label>
          <input placeholder="e.g. Good Teams" type="text" name="foldername" id="foldername" />
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }

  render() {

    const {folders} = this.context;

    const folderList = folders.map((folder, i) => {
      return <Folder key={i} id={folder.id} folder_name={folder.folder_name}/>
    });

    return (
      <Fragment>
        <section className="folders-list">
          <h3>Folders:</h3>
          <div>
            {folderList.length > 0 ? folderList : <h3>None! Click Below to Make a New Folder!</h3>}
          </div>
          <div>
            <button onClick={this.handleOnClick}>New Folder +</button>
            {clicked ? this.renderExpanded() : null}
          </div>
        <div>
          <span>Current Folder: {currentClickedFolder}</span>
        </div>
      </section>
    </Fragment>
    );
  };
};
