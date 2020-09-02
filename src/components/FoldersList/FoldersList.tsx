import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import GeneralContext from '../../contexts/GeneralContext';
import Folder from '../Folder/Folder';
import PokeballLoader from '../Loaders/PokeballLoader/PokeballLoader';
import LoadingBlack from '../Loaders/LoadingBlack/LoadingBlack';
import showdownFolderGenerate from '../../functions/generateFolder';
import './FoldersList.css';

const FoldersList = (props: any) => {

  const GenCon = useContext(GeneralContext);

  const [state, setState] = useState(
    {
    editClicked: false,
    deleteClicked: false,
    copySuccess: false,
  }
  );

  const handleEditExpand = () => {
    setState(oldVals => ({...oldVals, editClicked: !state.editClicked}));
  }

  const handleDeleteExpand = () => {
    setState(oldVals => ({...oldVals, deleteClicked: !state.deleteClicked}));
  }

  const removeCopySuccess = (): any => {
    setState(oldVals => ({...oldVals, copySuccess: false}))
  }

  // copy to clipboard

  const textArea: any = React.useRef(null);

  const copyCodeToClipboard = (): any => {
    textArea.current.select()
    document.execCommand('copy') // this seems to not work
    const text = textArea.current.defaultValue
    navigator.clipboard.writeText(text) // this seems to work!
    setState(oldVals => ({...oldVals, copySuccess: true}))
  }

  const renderExpanded = (): JSX.Element => {

    const {
      newFolderName,
      newFolderImport,
      validateNewFolderImport,
      setNewFolderContents,
      setNewFolderName,
      handlePostNewFolder,
      validateNewFolderName
    } = GenCon;

    return (
      <form>
        <div>
          <label htmlFor="foldername">Folder Name:</label>
          {<p className="error-validate shake-horizontal">{validateNewFolderName()}</p>}
          <input placeholder="e.g. Good Teams" type="text" name="foldername" id="foldername" value={newFolderName.value} onChange={e => setNewFolderName(e.target.value)}/>
          <div className="folder-import">
          <label htmlFor="folder-import">Import Showdown Folder:</label>
          {newFolderImport.value !== "" && <p className="error-validate shake-horizontal">{validateNewFolderImport()}</p>}
          <textarea placeholder="Optionally Import a proper Pokemon Showdown Folder Here And It Will Fill Out The Entire Folder!" name="folder-import" id="team-import-1" value={newFolderImport.value} onChange={e => setNewFolderContents(e.target.value)}></textarea>
          </div>
        </div>
        <button type="submit"
        className="submit"
        disabled={
          validateNewFolderName() || validateNewFolderImport()
        }
        onClick={(e) => {
          e.preventDefault();
          handlePostNewFolder();
        }}>Submit <i className="far fa-check-circle"></i></button>
      </form>
    )
  }

  const renderEditExpand = (): JSX.Element => {

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
          {<p className="error-validate shake-horizontal">{validateNewFolderName}</p>}
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

  const renderDeleteExpand = (): JSX.Element => {

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
    userTeams,
    userSets,
    folderAddClicked, 
    currentClickedFolder,
    handleFolderAddClickExpand,
  } = GenCon;

  const folderList = userFolders.map((folder: any, i) => {
    return <Folder key={i} id={folder.id} folder_name={folder.folder_name}/>
  });

  const folderTeams = userTeams.filter((team) => team.folder_id === currentClickedFolder.id)
  
  const input = folderTeams.map((team) => {
    const teamSets = userSets.filter((set) => set.team_id === team.id)
    const teamName: any = team.team_name;
    return {[teamName] : teamSets}
  })

  // here we make the input for the generator function...

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
            <div className="export-team">
              {
                state.copySuccess ?
                <div className='copied'>
                  Copied to Clipboard!!
                </div> : null
              }
              <div>
                <button onClick={() => {
                  copyCodeToClipboard()
                  setTimeout(removeCopySuccess, 3000)
                }}>Copy Text</button>
                <Link to={{
                  pathname: `/share/folder/${currentClickedFolder.id}`,
                  state: {folders: userFolders}}} target="_blank" >Share This Folder! <i className="fas fa-share-square"></i></Link>
                <input disabled type="text" readOnly value={`poketeams.now.sh/share/folder/${currentClickedFolder.id}`}/>
              </div>
                <label htmlFor="edit-team">Export Folder: <i className="fas fa-download"></i></label>
                <textarea ref={textArea} disabled readOnly name="export-folder" id={`export-folder-${currentClickedFolder.id}`} value={showdownFolderGenerate(currentClickedFolder.value, input)}/>
              </div>
        
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
