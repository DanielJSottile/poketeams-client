import React, { Component , Fragment} from 'react';
import UserContext from '../../contexts/UserContext';
import Folder from '../Folder/Folder';

export default class FoldersList extends Component {

  static contextType = UserContext;

  state = {
    editClicked: false,
    deleteClicked: false
  }

  handleEditExpand() {
    this.setState({editClicked: !this.state.editClicked})
  }

  handleDeleteExpand() {
    this.setState({deleteClicked: !this.state.deleteClicked})
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
      validateNewFolderName,
      handleCurrentFolderClicked,
      currentClickedFolder
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
          this.handleEditExpand();
          handleCurrentFolderClicked(newFolderName.value, currentClickedFolder.id)
        }}>Submit <i className="far fa-check-circle"></i></button>
      </form>
    )
  }

  renderDeleteExpand () {

    const {
      handleDeleteFolder,
    } = this.context;

    return (
      <div>
        <p>Are You Sure You'd Like to Delete this Folder?</p> 
        <button onClick={() => {
          handleDeleteFolder();
          this.handleDeleteExpand();
        }}>Yes <i className="fas fa-thumbs-up"></i></button>
        <button onClick={() => this.handleDeleteExpand()}>No <i className="fas fa-thumbs-down"></i></button>
      </div> 
    )

  }

  render() {

    const {
      userFolders, 
      folderAddClicked, 
      currentClickedFolder,
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
              <button onClick={() => this.handleDeleteExpand()}>Delete <i className="fas fa-trash-alt"></i></button>
            </div> : null}
        </div>
        <div>
            {this.state.editClicked ? this.renderEditExpand() : null}
            {this.state.deleteClicked ? this.renderDeleteExpand() : null}
        </div>
      </section>
    </Fragment>
    );
  };
};
