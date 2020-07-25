import React, { Fragment, useContext} from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import TeamButton from '../TeamButton/TeamButton';

const TeamsButtonListEdit = (props) => {

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
      validateCurrentFolderClicked
    } = GenCon;

    return (
      <form>
        <div className="team-name">
          <label htmlFor="foldername">Team Name:</label>
          {<p className="error">{validateNewTeamName()}</p>}
          <input placeholder="e.g. My Cool Team" type="text" name="teamname" id="teamname" value={newTeamName.value} onChange={e => setNewTeamName(e.target.value)}/>
        </div>
        <div className="team-import">
          <label htmlFor="title-content">Description:</label>
          {<p className="error">{validateDesc()}</p>}
          <textarea placeholder="e.g. description" type="text" name="title-content" id="title-content" value={desc.value} onChange={e => setDesc(e.target.value)}/>
        </div>
        <div className="team-import">
          <label htmlFor="team-import">Import Team Set:</label>
          {newTeamImport.value !== "" && <p className="error">{validateNewTeamImport()}</p>}
          <textarea type="text" placeholder="Optionally Import a proper Pokemon Showdown Team Here And It Will Fill Out Your Whole Team!" name="team-import" id="team-import-1" value={newTeamImport.value} onChange={e => setNewTeamContents(e.target.value)}></textarea>
        </div>
        <button type="submit"
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
        }}>Submit <i className="far fa-check-circle"></i></button>
      </form>
    )
  }

    const {
      userTeams,
      teamAddClicked,
      currentClickedTeam,
      currentClickedFolder,
      handleTeamAddClickExpand,
    } = GenCon;

    const TeamList = userTeams
    .filter(team => team.folder_id === currentClickedFolder.id)
    .map((team, i) => <TeamButton key={i} id={team.id} team_name={team.team_name}/>);

    return (
      <Fragment>
        <section className="folders-list">
          <h3>Teams:</h3>
          <div>
            {(TeamList.length > 0) ? TeamList : <h3>None! Click the Button Below to Get Started!</h3>}
          </div>
          <div>
            <button 
              onClick={() => handleTeamAddClickExpand()}>
              New Team <i className="far fa-plus-square"></i>
            </button>
            {teamAddClicked ? renderExpanded() : null}
          </div>
        <div>
          <span>{`Current Team: ${currentClickedTeam.value}`}</span>
        </div>
      </section>
    </Fragment>
    );
};

export default TeamsButtonListEdit;
