import React, { useContext, FunctionComponent } from 'react';
import {
  faUpload,
  faCheckCircle,
  faPlusSquare,
  faBan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GeneralContext from '../../contexts/GeneralContext';
import {
  validateDesc,
  validateNewTeamName,
  validateNewTeamImport,
  validateCurrentFolderClicked,
} from '../../utils/validations';
import Button from '../Button';
import Input from '../Input';
import TextArea from '../TextArea';
import styles from './AddTeamSection.module.scss';

const AddTeamSection: FunctionComponent = () => {
  const {
    newTeamName,
    newTeamImport,
    setNewTeamName,
    setNewTeamImport,
    handlePostNewTeam,
    desc,
    setDesc,
    teamAddClicked,
    currentClickedFolder,
    setTeamAddClicked,
  } = useContext(GeneralContext);

  const renderExpanded = () => {
    return (
      <form>
        <Input
          inputHasError
          containerClass={styles['team-name']}
          htmlFor="foldername"
          label="Team Name:"
          validationCallback={() => validateNewTeamName(newTeamName)}
          placeholder="e.g. My Cool Team"
          type="text"
          name="teamname"
          id="teamname"
          value={newTeamName.value}
          onChangeCallback={(e) =>
            setNewTeamName({ value: e.target.value, touched: true })
          }
        />
        <TextArea
          containerClass={styles['team-import']}
          textAreaHasError
          htmlFor="title-content"
          label={'Description:'}
          validationCallback={() => validateDesc(desc)}
          placeholder="e.g. description"
          name="title-content"
          id="title-content"
          value={desc.value}
          onChangeCallback={(e) =>
            setDesc({ value: e.target.value, touched: true })
          }
        />
        <TextArea
          containerClass={styles['team-import']}
          textAreaHasError
          isError={!!newTeamImport.value}
          htmlFor="team-import"
          label={'Import Showdown Team: '}
          labelIcon={<FontAwesomeIcon icon={faUpload} />}
          validationCallback={() => validateNewTeamImport(newTeamImport)}
          placeholder="Optionally Import a proper Pokemon Showdown Team Here And It Will Fill Out Your Whole Team!"
          name="team-import"
          id="team-import-1"
          value={newTeamImport.value}
          onChangeCallback={(e) =>
            setNewTeamImport({ value: e.target.value, touched: true })
          }
        />
        <Button
          type="submit"
          buttonClass={styles['submit']}
          disabled={
            !!validateNewTeamName(newTeamName) ||
            !!validateNewTeamImport(newTeamImport) ||
            !!validateDesc(desc) ||
            !!validateCurrentFolderClicked(currentClickedFolder)
          }
          onClickCallback={(e) => {
            e.preventDefault();
            handlePostNewTeam();
          }}
        >
          Submit <FontAwesomeIcon icon={faCheckCircle} />
        </Button>
      </form>
    );
  };

  return (
    <>
      <section className={styles['folders-list']}>
        <div>
          {currentClickedFolder.value ? (
            <Button
              onClickCallback={() => setTeamAddClicked(!teamAddClicked)}
              buttonClass={styles['add-team-button']}
            >
              {teamAddClicked ? (
                <span>
                  Cancel <FontAwesomeIcon icon={faBan} />
                </span>
              ) : (
                <span>
                  New Team <FontAwesomeIcon icon={faPlusSquare} />
                </span>
              )}
            </Button>
          ) : (
            <h4>Click a Folder to add Teams!</h4>
          )}
          {teamAddClicked && renderExpanded()}
        </div>
        <h3>Teams:</h3>
      </section>
    </>
  );
};

export default AddTeamSection;
