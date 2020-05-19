import React, { Component , Fragment} from 'react';
import UserContext from '../../contexts/UserContext';
import Folder from '../Folder/Folder';

export default class FoldersList extends Component {

  static contextType = UserContext;

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
        disabled={
          validateNewFolderName()
        }
        onClick={(e) => {
          e.preventDefault();
          handlePostNewFolder();
        }}>Submit</button>
      </form>
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
            <button onClick={() => handleFolderAddClickExpand()}>New Folder +</button>
            {folderAddClicked ? this.renderExpanded() : null}
          </div>
        <div>
          <span>{`Current Folder: ${currentClickedFolder.value}`}</span>
        </div>
      </section>
    </Fragment>
    );
  };
};
