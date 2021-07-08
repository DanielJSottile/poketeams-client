import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Folder from '../Folder/Folder';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import PokeballLoader from '../Loaders/PokeballLoader/PokeballLoader';
import LoadingBlack from '../Loaders/LoadingBlack/LoadingBlack';
import GeneralContext from '../../contexts/GeneralContext';
import showdownFolderGenerate from '../../functions/generateFolder';
import styles from './FoldersList.module.scss';

const FoldersList: React.FC = () => {
  const GenCon = useContext(GeneralContext);

  const [state, setState] = useState({
    editClicked: false,
    deleteClicked: false,
    copySuccess: false,
  });

  const handleEditExpand = () => {
    setState((oldVals) => ({ ...oldVals, editClicked: !state.editClicked }));
  };

  const handleDeleteExpand = () => {
    setState((oldVals) => ({
      ...oldVals,
      deleteClicked: !state.deleteClicked,
    }));
  };

  const removeCopySuccess = (): any => {
    setState((oldVals) => ({ ...oldVals, copySuccess: false }));
  };

  const textArea: any = React.useRef(null);

  const copyCodeToClipboard = (): any => {
    textArea.current.select();
    document.execCommand('copy'); // this seems to not work
    const text = textArea.current.defaultValue;
    navigator.clipboard.writeText(text); // this seems to work!
    setState((oldVals) => ({ ...oldVals, copySuccess: true }));
  };

  /* --------------------- */

  /* Set Up Common Definitions to be 
  Used in Different views */

  const {
    userFolders,
    userTeams,
    userSets,
    folderAddClicked,
    currentClickedFolder,
    handleFolderAddClickExpand,
  } = GenCon;

  const folderList = userFolders.map((folder: any, i) => {
    return <Folder key={i} id={folder.id} folder_name={folder.folder_name} />;
  });

  const folderTeams = userTeams.filter(
    (team) => team.folder_id === currentClickedFolder.id
  );

  const input = folderTeams.map((team) => {
    const teamSets = userSets.filter((set) => set.team_id === team.id);
    const teamName: any = team.team_name;
    return { [teamName]: teamSets };
  });

  const renderExpanded = (): JSX.Element => {
    const {
      newFolderName,
      newFolderImport,
      validateNewFolderImport,
      setNewFolderContents,
      setNewFolderName,
      handlePostNewFolder,
      validateNewFolderName,
    } = GenCon;

    return (
      <form>
        <div>
          <Input
            inputHasError
            htmlFor="foldername"
            label="Folder Name:"
            validationCallback={validateNewFolderName()}
            placeholder="e.g. Good Teams"
            type="text"
            name="foldername"
            id="foldername"
            value={newFolderName.value}
            onChangeCallback={(e) => setNewFolderName(e.target.value)}
          />
          <TextArea
            containerClass={styles['folder-import']}
            textAreaHasError
            isError={!!newFolderImport.value}
            validationCallback={validateNewFolderImport()}
            htmlFor="folder-import"
            label="Import Showdown Folder:"
            placeholder="Optionally Import a proper Pokemon Showdown Folder Here And It Will Fill Out The Entire Folder!"
            name="folder-import"
            id="team-import-1"
            value={newFolderImport.value}
            onChangeCallback={(e) => setNewFolderContents(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          buttonClass={styles['submit']}
          disabled={validateNewFolderName() || validateNewFolderImport()}
          onClickCallback={(e) => {
            e.preventDefault();
            handlePostNewFolder();
          }}
        >
          Submit <i className="far fa-check-circle"></i>
        </Button>
      </form>
    );
  };

  const renderEditExpand = (): JSX.Element => {
    const {
      newFolderName,
      setNewFolderName,
      handleEditFolder,
      validateNewFolderName,
      handleCurrentFolderClicked,
      currentClickedFolder,
    } = GenCon;

    return (
      <form>
        <Input
          inputHasError
          htmlFor="foldername"
          label="Edit Folder Name:"
          validationCallback={validateNewFolderName()}
          placeholder="e.g. Good Teams"
          type="text"
          name="foldername"
          id="foldername"
          value={newFolderName.value}
          onChangeCallback={(e) => setNewFolderName(e.target.value)}
        />
        <Button
          type="submit"
          buttonClass={styles['submit']}
          disabled={validateNewFolderName()}
          onClickCallback={(e) => {
            e.preventDefault();
            handleEditFolder();
            handleEditExpand();
            handleCurrentFolderClicked(
              newFolderName.value,
              currentClickedFolder.id
            );
          }}
        >
          Submit <i className="far fa-check-circle"></i>
        </Button>
      </form>
    );
  };

  const renderDeleteExpand = (): JSX.Element => {
    const { handleDeleteFolder } = GenCon;

    return (
      <div>
        <p>Are You Sure You'd Like to Delete this Folder?</p>
        <Button
          onClickCallback={() => {
            handleDeleteFolder();
            handleDeleteExpand();
          }}
        >
          Yes <i className="fas fa-thumbs-up"></i>
        </Button>
        <Button onClickCallback={() => handleDeleteExpand()}>
          No <i className="fas fa-thumbs-down"></i>
        </Button>
      </div>
    );
  };

  return (
    <Fragment>
      <section className={styles['folders-list']}>
        <h3>Folders:</h3>
        <div className={styles['folders']}>
          {folderList.length > 0 ? (
            folderList
          ) : (
            <div className={styles['pokeball-div']}>
              <PokeballLoader />
              <LoadingBlack />
              <h3 className={styles['hint']}>
                (Hint: There May Be No Folders! Click Below to Start!)
              </h3>
            </div>
          )}
        </div>
        <div>
          <Button onClickCallback={() => handleFolderAddClickExpand()}>
            New Folder <i className="fas fa-folder-plus"></i>
          </Button>
          {folderAddClicked ? renderExpanded() : null}
        </div>
        <div>
          <span>{`Current Folder: ${currentClickedFolder.value}`}</span>
          {currentClickedFolder.value ? (
            <div>
              <div className={styles['export-team']}>
                {state.copySuccess ? (
                  <div className={styles['copied']}>Copied to Clipboard!!</div>
                ) : null}
                <div>
                  <Button
                    onClickCallback={() => {
                      copyCodeToClipboard();
                      setTimeout(removeCopySuccess, 3000);
                    }}
                  >
                    Copy Text
                  </Button>
                  <Link
                    to={{
                      pathname: `/share/user/folder/${currentClickedFolder.id}`,
                      state: {
                        folders: userFolders,
                        teams: userTeams,
                        sets: userSets,
                        input: input,
                      },
                    }}
                    target="_blank"
                  >
                    Share This Folder! <i className="fas fa-share-square"></i>
                  </Link>
                  <Input
                    inputHasError={false}
                    disabled
                    type="text"
                    readOnly
                    value={`poketeams.now.sh/share/user/folder/${currentClickedFolder.id}`}
                  />
                </div>
                <label htmlFor="edit-team">
                  Export Folder: <i className="fas fa-download"></i>
                </label>
                <TextArea
                  textAreaHasError={false}
                  ref={textArea}
                  disabled
                  readOnly
                  name="export-folder"
                  id={`export-folder-${currentClickedFolder.id}`}
                  value={showdownFolderGenerate(
                    currentClickedFolder.value,
                    input
                  )}
                />
              </div>
              <Button onClickCallback={() => handleEditExpand()}>
                <i className="fas fa-edit"></i> Edit
              </Button>
              <Button onClickCallback={() => handleDeleteExpand()}>
                Delete <i className="fas fa-trash-alt"></i>
              </Button>
            </div>
          ) : null}
        </div>
        <div>
          {state.editClicked ? renderEditExpand() : null}
          {state.deleteClicked ? renderDeleteExpand() : null}
        </div>
      </section>
    </Fragment>
  );
};

export default FoldersList;
