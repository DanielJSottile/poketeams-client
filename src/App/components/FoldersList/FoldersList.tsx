import React, { useContext, useState, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faThumbsDown,
  faThumbsUp,
  faFolderPlus,
  faShareSquare,
  faDownload,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import Folder from '../Folder/Folder';
import Input from '../Input/Input';
import TextArea from '../TextArea';
import Button from '../Button';
import LazyLoader from '../Loaders/LazyLoader';
import GeneralContext from '../../contexts/GeneralContext';
import showdownFolderGenerate from '../../utils/generateFolder';
import {
  validateNewFolderImport,
  validateNewFolderName,
} from '../../utils/validations';
import { useClipboard } from '../../utils/customHooks';
import styles from './FoldersList.module.scss';
import { PokemonFolder } from '../../@types';

const FoldersList: FunctionComponent = () => {
  const {
    userFolders,
    userTeams,
    userSets,
    folderAddClicked,
    currentClickedFolder,
    setFolderAddClicked,
    newFolderName,
    newFolderImport,
    setNewFolderImport,
    handlePostNewFolder,
    setNewFolderName,
    handleEditFolder,
    setCurrentClickedFolder,
    handleDeleteFolder,
  } = useContext(GeneralContext);

  const [editClicked, setEditClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const { copySuccess, textArea, setCopySuccess, copyCodeToClipboard } =
    useClipboard();

  const handleEditExpand = () => {
    setEditClicked(!editClicked);
  };

  const handleDeleteExpand = () => {
    setDeleteClicked(!deleteClicked);
  };

  /* --------------------- */

  /* Set Up Common Definitions to be 
  Used in Different views */

  const folderList = userFolders.map((folder: PokemonFolder, i) => {
    return <Folder key={i} id={folder.id} folder_name={folder.folder_name} />;
  });

  const folderTeams = userTeams.filter(
    (team) => team.folder_id === Number(currentClickedFolder.id)
  );

  const input = folderTeams.map((team) => {
    const teamSets = userSets.filter((set) => set.team_id === team.id);
    const teamName: string = team.team_name;
    return { [teamName]: teamSets };
  });

  const renderExpanded = (): JSX.Element => {
    return (
      <form>
        <div>
          <Input
            inputHasError
            htmlFor="foldername"
            label="Folder Name:"
            validationCallback={() => validateNewFolderName(newFolderName)}
            placeholder="e.g. Good Teams"
            type="text"
            name="foldername"
            id="foldername"
            value={newFolderName.value}
            onChangeCallback={(e) =>
              setNewFolderName({ value: e.target.value, touched: true })
            }
          />
          <TextArea
            containerClass={styles['folder-import']}
            textAreaHasError
            isError={!!newFolderImport.value}
            validationCallback={() => validateNewFolderImport(newFolderImport)}
            htmlFor="folder-import"
            label="Import Showdown Folder:"
            placeholder="Optionally Import a proper Pokemon Showdown Folder Here And It Will Fill Out The Entire Folder!"
            name="folder-import"
            id="team-import-1"
            value={newFolderImport.value}
            onChangeCallback={(e) =>
              setNewFolderImport({ value: e.target.value, touched: true })
            }
          />
        </div>
        <Button
          type="submit"
          buttonClass={styles['submit']}
          disabled={
            !!validateNewFolderName(newFolderName) ||
            !!validateNewFolderImport(newFolderImport)
          }
          onClickCallback={(e) => {
            e.preventDefault();
            handlePostNewFolder();
          }}
        >
          Submit <FontAwesomeIcon icon={faCheckCircle} />
        </Button>
      </form>
    );
  };

  const renderEditExpand = (): JSX.Element => {
    return (
      <form>
        <Input
          inputHasError
          htmlFor="foldername"
          label="Edit Folder Name:"
          validationCallback={() => validateNewFolderName(newFolderName)}
          placeholder="e.g. Good Teams"
          type="text"
          name="foldername"
          id="foldername"
          value={newFolderName.value}
          onChangeCallback={(e) =>
            setNewFolderName({ value: e.target.value, touched: true })
          }
        />
        <Button
          type="submit"
          buttonClass={styles['submit']}
          disabled={!!validateNewFolderName(newFolderImport)}
          onClickCallback={(e) => {
            e.preventDefault();
            handleEditFolder();
            handleEditExpand();
            setCurrentClickedFolder({
              value: newFolderName.value,
              id: currentClickedFolder.id,
              touched: true,
            });
          }}
        >
          Submit <FontAwesomeIcon icon={faCheckCircle} />
        </Button>
      </form>
    );
  };

  const renderDeleteExpand = (): JSX.Element => {
    return (
      <div>
        <p>Are You Sure You'd Like to Delete this Folder?</p>
        <Button
          onClickCallback={() => {
            handleDeleteFolder();
            handleDeleteExpand();
          }}
        >
          Yes <FontAwesomeIcon icon={faThumbsUp} />
        </Button>
        <Button onClickCallback={() => handleDeleteExpand()}>
          No <FontAwesomeIcon icon={faThumbsDown} />
        </Button>
      </div>
    );
  };

  return (
    <>
      <section className={styles['folders-list']}>
        <h3>Folders:</h3>
        <div className={styles['folders']}>
          {folderList.length > 0 ? (
            folderList
          ) : (
            <LazyLoader
              containerClass={styles['pokeball-div']}
              messageClass={styles['hint']}
              message={'(Hint: There May Be No Folders! Click Below to Start!)'}
            />
          )}
        </div>
        <div>
          <Button
            onClickCallback={() => setFolderAddClicked(!folderAddClicked)}
          >
            New Folder <FontAwesomeIcon icon={faFolderPlus} />
          </Button>
          {folderAddClicked && renderExpanded()}
        </div>
        <div>
          <span>{`Current Folder: ${currentClickedFolder.value}`}</span>
          {currentClickedFolder.value && (
            <div>
              <div className={styles['export-team']}>
                {copySuccess && (
                  <div className={styles['copied']}>Copied to Clipboard!!</div>
                )}
                <div>
                  <Button
                    onClickCallback={() => {
                      copyCodeToClipboard();
                      setTimeout(() => setCopySuccess(false), 3000);
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
                    Share This Folder! <FontAwesomeIcon icon={faShareSquare} />
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
                  Export Folder: <FontAwesomeIcon icon={faDownload} />
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
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Button>
              <Button onClickCallback={() => handleDeleteExpand()}>
                Delete <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </div>
          )}
        </div>
        <div>
          {editClicked && renderEditExpand()}
          {deleteClicked && renderDeleteExpand()}
        </div>
      </section>
    </>
  );
};

export default FoldersList;
