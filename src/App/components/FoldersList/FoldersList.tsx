import React, { useContext, useState, FunctionComponent } from 'react';
import {
  faCheckCircle,
  faFolderPlus,
  faEdit,
  faTrashAlt,
  faBan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PokemonFolder } from '../../@types';
import GeneralContext from '../../contexts/GeneralContext';
import { showdownFolderGenerate } from '../../utils/functions';
import {
  validateNewFolderImport,
  validateNewFolderName,
} from '../../utils/validations';
import Button from '../Button';
import DeleteExpand from '../DeleteExpand';
import ExportText from '../ExportText';
import Folder from '../Folder/Folder';
import Form from '../Form';
import Input from '../Input/Input';
import LazyLoader from '../Loaders/LazyLoader';
import TextArea from '../TextArea';
import { customSuccessToast } from '../Utils/CustomToasts';
import styles from './FoldersList.module.scss';

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

  const handleEditExpand = () => {
    setDeleteClicked(false);
    setEditClicked(!editClicked);
  };

  const handleDeleteExpand = () => {
    setEditClicked(false);
    setDeleteClicked(!deleteClicked);
  };

  const deleteSuccess = () => customSuccessToast('Folder Deleted!');

  /* --------------------- */

  /* Set Up Common Definitions to be 
  Used in Different views */

  const folderList = userFolders.map((folder: PokemonFolder) => {
    return (
      <Folder key={folder.id} id={folder.id} folder_name={folder.folder_name} />
    );
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
      <Form>
        <div>
          <Input
            inputHasError
            htmlFor='foldername'
            label='Folder Name:'
            validationCallback={() => validateNewFolderName(newFolderName)}
            placeholder='e.g. Good Teams'
            type='text'
            name='foldername'
            id='foldername'
            value={newFolderName.value}
            onChangeCallback={(e) =>
              setNewFolderName({ value: e.target.value, touched: true })
            }
          />
          <TextArea
            containerClass={styles['folder-import']}
            textAreaHasError
            isError={!!newFolderImport.value.length}
            validationCallback={() => validateNewFolderImport(newFolderImport)}
            htmlFor='folder-import'
            label='Import Showdown Folder:'
            placeholder='Optionally Import a proper Pokemon Showdown Folder Here And It Will Fill Out The Entire Folder!'
            name='folder-import'
            id='team-import-1'
            value={newFolderImport.value}
            onChangeCallback={(e) =>
              setNewFolderImport({ value: e.target.value, touched: true })
            }
          />
        </div>
        <Button
          type='submit'
          buttonClass={styles['submit']}
          disabled={
            !!validateNewFolderName(newFolderName) ||
            (!!validateNewFolderImport(newFolderImport) &&
              !!newFolderImport.value)
          }
          onClickCallback={(e) => {
            e.preventDefault();
            handlePostNewFolder();
          }}
        >
          Submit <FontAwesomeIcon icon={faCheckCircle} />
        </Button>
      </Form>
    );
  };

  const renderEditExpand = (): JSX.Element => {
    return (
      <Form>
        <Input
          inputHasError
          htmlFor='foldername'
          label='Edit Folder Name:'
          validationCallback={() => validateNewFolderName(newFolderName)}
          placeholder='e.g. Good Teams'
          type='text'
          name='foldername'
          id='foldername'
          value={newFolderName.value}
          onChangeCallback={(e) =>
            setNewFolderName({ value: e.target.value, touched: true })
          }
        />
        <Button
          type='submit'
          buttonClass={styles['submit']}
          disabled={!!validateNewFolderName(newFolderName)}
          onClickCallback={(e) => {
            e.preventDefault();
            handleEditFolder();
            handleEditExpand();
            setCurrentClickedFolder({
              value: newFolderName.value,
              id: currentClickedFolder.id,
              touched: true,
            });
            setNewFolderName({ value: '', touched: false });
          }}
        >
          Submit <FontAwesomeIcon icon={faCheckCircle} />
        </Button>
      </Form>
    );
  };

  return (
    <>
      <section className={styles['folders-list']}>
        <h3>Folders:</h3>
        <span>{`Current Folder: ${currentClickedFolder.value}`}</span>
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
            buttonClass={styles['add-folder-button']}
          >
            {folderAddClicked ? (
              <span>
                Cancel <FontAwesomeIcon icon={faBan} />
              </span>
            ) : (
              <span>
                New Folder <FontAwesomeIcon icon={faFolderPlus} />
              </span>
            )}
          </Button>
          {folderAddClicked && renderExpanded()}
        </div>
        <div>
          {currentClickedFolder.value && (
            <div>
              <ExportText
                exportText={'Export Folder:'}
                shareText={'Share This Folder!'}
                linkPathname={`/share/user/folder/${currentClickedFolder.id}`}
                linkState={{
                  folders: userFolders,
                  teams: userTeams,
                  sets: userSets,
                  input: input,
                }}
                inputValue={`poketeams.now.sh/share/user/folder/${currentClickedFolder.id}`}
                textAreaId={`export-folder-${currentClickedFolder.id}`}
                textAreaValue={showdownFolderGenerate(
                  currentClickedFolder.value,
                  input
                )}
              />
              <Button
                onClickCallback={() => handleEditExpand()}
                buttonClass={styles['edit']}
              >
                {editClicked ? (
                  <span>
                    Cancel <FontAwesomeIcon icon={faBan} />
                  </span>
                ) : (
                  <span>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </span>
                )}
              </Button>
              <Button
                onClickCallback={() => handleDeleteExpand()}
                buttonClass={styles['delete']}
              >
                {deleteClicked ? (
                  <span>
                    Cancel <FontAwesomeIcon icon={faBan} />
                  </span>
                ) : (
                  <span>
                    Delete Folder! <FontAwesomeIcon icon={faTrashAlt} />
                  </span>
                )}
              </Button>
            </div>
          )}
        </div>
        <div>
          {editClicked && renderEditExpand()}
          {deleteClicked && (
            <DeleteExpand
              message={"Are You Sure You'd Like to Delete this Folder?"}
              yesCallback={() => {
                handleDeleteFolder();
                handleDeleteExpand();
                deleteSuccess();
              }}
              noCallback={() => handleDeleteExpand()}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default FoldersList;
