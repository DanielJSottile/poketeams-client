import React, { Component , Fragment} from 'react';
import UserContext from '../../contexts/UserContext';
import Folder from '../Folder/Folder';

export default class FoldersList extends Component {

  static contextType = UserContext;

  state = {
    editClicked: false
  }

  handleEditExpand() {
    this.setState({editClicked: !this.state.editClicked})
  }

  renderExpanded() {

    const {
      newFolderName,
      setNewFolderName,
      handlePostNewFolder,
      validateNewFolderName
    } = this.context;

    return (
      <form>
        <div>
          <label htmlFor="foldername">Folder Name:</label>
          {<p className="error">{validateNewFolderName()}</p>}
          <input placeholder="e.g. Good Teams" type="text" name="foldername" id="foldername" value={newFolderName.value} onChange={e => setNewFolderName(e.target.value)}/>
        </div>
        <button type="submit"
        className="submit"
        disabled={
          validateNewFolderName()
        }
        onClick={(e) => {
          e.preventDefault();
          handlePostNewFolder();
        }}>Submit <i className="far fa-check-circle"></i></button>
      </form>
    )
  }

  renderEditExpand() {

    const {
      newFolderName,
      setNewFolderName,
      handleEditFolder,
      validateNewFolderName
    } = this.context;

    return (
      <form>
        <div>
          <label htmlFor="foldername">Edit Folder Name:</label>
          {<p className="error">{validateNewFolderName()}</p>}
          <input placeholder="e.g. Good Teams" type="text" name="foldername" id="foldername" value={newFolderName.value} onChange={e => setNewFolderName(e.target.value)}/>
        </div>
        <button type="submit"
        className="submit"
        disabled={
          validateNewFolderName()
        }
        onClick={(e) => {
          e.preventDefault();
          handleEditFolder();
        }}>Submit <i className="far fa-check-circle"></i></button>
      </form>
    )
  }

  render() {

    const {
      userFolders, 
      folderAddClicked, 
      currentClickedFolder,
      handleDeleteFolder,
      handleFolderAddClickExpand,
    } = this.context;

    const folderList = userFolders.map((folder, i) => {
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
            <button onClick={() => handleFolderAddClickExpand()}>New Folder <i className="fas fa-folder-plus"></i></button>
            {folderAddClicked ? this.renderExpanded() : null}
          </div>
        <div>
          <span>{`Current Folder: ${currentClickedFolder.value}`}</span>
          {currentClickedFolder.value ? 
            <div>
              <button onClick={() => this.handleEditExpand()}><i className="fas fa-edit"></i> Edit</button>
              <button onClick={() => handleDeleteFolder()}>Delete <i className="fas fa-trash-alt"></i></button>
            </div> : null}
        </div>
        <div>
            {this.state.editClicked ? this.renderEditExpand() : null}
        </div>
      </section>
    </Fragment>
    );
  };
};
