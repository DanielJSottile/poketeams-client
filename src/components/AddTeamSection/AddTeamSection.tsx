import React, { Fragment, useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import styles from './AddTeamSection.module.scss';

// Interfaces

export interface PokemonTeam {
  team_name: string;
  team_description: string;
  description: string;
  id: number;
  user_name: string;
  date_created: string;
  folder_id: number;
}

// Component

const AddTeamSection = (props: any) => {
  // Set Context

  const GenCon = useContext(GeneralContext);

  // Render Functions

  const renderExpanded = () => {
    const {
      newTeamName,
      newTeamImport,
      setNewTeamName,
      setNewTeamContents,
      handlePostNewTeam,
      desc,
      validateDesc,
      setDesc,
      validateNewTeamName,
      validateNewTeamImport,
      validateCurrentFolderClicked,
    } = GenCon;

    return (
      <form>
        <Input
          inputHasError
          containerClass={styles['team-name']}
          htmlFor="foldername"
          label="Team Name:"
          validationCallback={validateNewTeamName()}
          placeholder="e.g. My Cool Team"
          type="text"
          name="teamname"
          id="teamname"
          value={newTeamName.value}
          onChangeCallback={(e) => setNewTeamName(e.target.value)}
        />
        <TextArea
          containerClass={styles['team-import']}
          textAreaHasError
          htmlFor="title-content"
          label={'Description:'}
          validationCallback={validateDesc()}
          placeholder="e.g. description"
          name="title-content"
          id="title-content"
          value={desc.value}
          onChangeCallback={(e) => setDesc(e.target.value)}
        />
        <TextArea
          containerClass={styles['team-import']}
          textAreaHasError
          isError={!!newTeamImport.value}
          htmlFor="team-import"
          label={'Description:'}
          validationCallback={validateNewTeamImport()}
          placeholder="Optionally Import a proper Pokemon Showdown Team Here And It Will Fill Out Your Whole Team!"
          name="team-import"
          id="team-import-1"
          value={newTeamImport.value}
          onChangeCallback={(e) => setNewTeamContents(e.target.value)}
        />
        <Button
          type="submit"
          buttonClass={styles['submit']}
          disabled={
            validateNewTeamName() ||
            validateNewTeamImport() ||
            validateDesc() ||
            validateCurrentFolderClicked()
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

  const { teamAddClicked, currentClickedFolder, handleTeamAddClickExpand } =
    GenCon;

  return (
    <Fragment>
      <section className={styles['folders-list']}>
        <div>
          {currentClickedFolder.value ? (
            <Button onClickCallback={() => handleTeamAddClickExpand()}>
              New Team <i className="far fa-plus-square"></i>
            </Button>
          ) : (
            <h4>Click a Folder to add Teams!</h4>
          )}
          {teamAddClicked ? renderExpanded() : null}
        </div>
        <h3>Teams:</h3>
      </section>
    </Fragment>
  );
};

export default AddTeamSection;
