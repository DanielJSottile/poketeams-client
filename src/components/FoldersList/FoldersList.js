import React, { Fragment, useContext, useState } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import Folder from '../Folder/Folder';
import PokeballLoader from '../Loaders/PokeballLoader/PokeballLoader';
import LoadingBlack from '../Loaders/LoadingBlack/LoadingBlack';

const FoldersList = (props) => {

  const GenCon = useContext(GeneralContext);

  const [state, setState] = useState(
    {
    editClicked: false,
    deleteClicked: false
  }
  );

  const handleEditExpand = () => {
    setState(oldVals => ({...oldVals, editClicked: !state.editClicked}));
  }

  const handleDeleteExpand = () => {
    setState(oldVals => ({...oldVals, deleteClicked: !state.deleteClicked}));
  }

  const renderExpanded = () => {

    const {
      newFolderName,
      setNewFolderName,
      handlePostNewFolder,
      validateNewFolderName
    } = GenCon;

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

  const renderEditExpand = () => {

    const {
      newFolderName,
      setNewFolderName,
      handleEditFolder,
      validateNewFolderName,
      handleCurrentFolderClicked,
      currentClickedFolder
    } = GenCon;

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
          handleEditExpand();
          handleCurrentFolderClicked(newFolderName.value, currentClickedFolder.id)
        }}>Submit <i className="far fa-check-circle"></i></button>
      </form>
    )
  }

  const renderDeleteExpand = () => {

    const {
      handleDeleteFolder,
    } = GenCon;

    return (
      <div>
        <p>Are You Sure You'd Like to Delete this Folder?</p> 
        <button onClick={() => {
          handleDeleteFolder();
          handleDeleteExpand();
        }}>Yes <i className="fas fa-thumbs-up"></i></button>
        <button onClick={() => handleDeleteExpand()}>No <i className="fas fa-thumbs-down"></i></button>
      </div> 
    )
  }

  const {
    userFolders, 
    folderAddClicked, 
    currentClickedFolder,
    handleFolderAddClickExpand,
  } = GenCon;

  const folderList = userFolders.map((folder, i) => {
    return <Folder key={i} id={folder.id} folder_name={folder.folder_name}/>
  });

  return (
    <Fragment>
      <section className="folders-list">
        <h3>Folders:</h3>
        <div>
          {folderList.length > 0 ? folderList : 
          <div className="pokeball-div">
          <PokeballLoader/>
          <LoadingBlack/>
          <h3 className="hint">(Hint: There May Be No Folders! Click Below to Start!)</h3>
        </div>}
        </div>
        <div>
          <button onClick={() => handleFolderAddClickExpand()}>New Folder <i className="fas fa-folder-plus"></i></button>
          {folderAddClicked ? renderExpanded() : null}
        </div>
      <div>
        <span>{`Current Folder: ${currentClickedFolder.value}`}</span>
        {currentClickedFolder.value ? 
          <div>
            <button onClick={() => handleEditExpand()}><i className="fas fa-edit"></i> Edit</button>
            <button onClick={() => handleDeleteExpand()}>Delete <i className="fas fa-trash-alt"></i></button>
          </div> : null}
      </div>
      <div>
          {state.editClicked ? renderEditExpand() : null}
          {state.deleteClicked ? renderDeleteExpand() : null}
      </div>
    </section>
  </Fragment>
  );
}

export default FoldersList;