import React, { Fragment, useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import './AddTeamSection.css';

export interface PokemonTeam {
  team_name: string;
  id: number;
  folder_id: number;
}

const AddTeamSection = (props: any) => {
  const GenCon = useContext(GeneralContext);

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
        <div className="team-name">
          <label htmlFor="foldername">Team Name:</label>
          {
            <p className="error-validate shake-horizontal">
              {validateNewTeamName()}
            </p>
          }
          <input
            placeholder="e.g. My Cool Team"
            type="text"
            name="teamname"
            id="teamname"
            value={newTeamName.value}
            onChange={(e) => setNewTeamName(e.target.value)}
          />
        </div>
        <div className="team-import">
          <label htmlFor="title-content">Description:</label>
          {<p className="error-validate shake-horizontal">{validateDesc()}</p>}
          <textarea
            placeholder="e.g. description"
            name="title-content"
            id="title-content"
            value={desc.value}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="team-import">
          <label htmlFor="team-import">Import Team Set:</label>
          {newTeamImport.value !== '' && (
            <p className="error-validate shake-horizontal">
              {validateNewTeamImport()}
            </p>
          )}
          <textarea
            placeholder="Optionally Import a proper Pokemon Showdown Team Here And It Will Fill Out Your Whole Team!"
            name="team-import"
            id="team-import-1"
            value={newTeamImport.value}
            onChange={(e) => setNewTeamContents(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="submit"
          disabled={
            validateNewTeamName() ||
            validateNewTeamImport() ||
            validateDesc() ||
            validateCurrentFolderClicked()
          }
          onClick={(e) => {
            e.preventDefault();
            handlePostNewTeam();
          }}
        >
          Submit <i className="far fa-check-circle"></i>
        </button>
      </form>
    );
  };

  const {
    teamAddClicked,
    currentClickedFolder,
    handleTeamAddClickExpand,
  } = GenCon;

  
  return (
    <Fragment>
      <section className="folders-list">
        <div>
          {currentClickedFolder.value ? (
            <button onClick={() => handleTeamAddClickExpand()}>
              New Team <i className="far fa-plus-square"></i>
            </button>
          ) : <h4>Click a Folder to add Teams!</h4>}
          {teamAddClicked ? renderExpanded() : null}
        </div>
        <h3>Teams:</h3>
      </section>
    </Fragment>
  );
};

export default AddTeamSection;
