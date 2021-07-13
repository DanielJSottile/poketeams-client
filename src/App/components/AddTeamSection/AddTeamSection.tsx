import React, { Fragment, useContext, FunctionComponent } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import {
  validateDesc,
  validateNewTeamName,
  validateNewTeamImport,
  validateCurrentFolderClicked,
} from '../../utils/validations';
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
          labelIcon={<i className="fas fa-upload"></i>}
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
          Submit <i className="far fa-check-circle"></i>
        </Button>
      </form>
    );
  };

  return (
    <Fragment>
      <section className={styles['folders-list']}>
        <div>
          {currentClickedFolder.value ? (
            <Button onClickCallback={() => setTeamAddClicked(!teamAddClicked)}>
              New Team <i className="far fa-plus-square"></i>
            </Button>
          ) : (
            <h4>Click a Folder to add Teams!</h4>
          )}
          {teamAddClicked && renderExpanded()}
        </div>
        <h3>Teams:</h3>
      </section>
    </Fragment>
  );
};

export default AddTeamSection;
