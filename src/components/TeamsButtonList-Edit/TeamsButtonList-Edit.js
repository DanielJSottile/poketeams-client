import React, { Component , Fragment} from 'react';
import UserContext from '../../contexts/UserContext';
import TeamButton from '../TeamButton/TeamButton';
import apiService from '../../services/apiService';

export default class TeamsButtonList extends Component {

  static contextType = UserContext;

  renderExpanded() {

    const {
      newTeamName,
      newTeamImport,
      setNewTeamName,
      setNewTeamContents,
      handlePostNewTeam,
      validateNewTeamName,
      validateNewTeamImport,
      validateCurrentFolderClicked
    } = this.context;

    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className="team-name">
          <label htmlFor="foldername">Team Name:</label>
          {<p className="error">{validateNewTeamName()}</p>}
          <input placeholder="e.g. My Cool Team" type="text" name="teamname" id="teamname" value={newTeamName.value} onChange={e => setNewTeamName(e.target.value)}/>
        </div>
        <div className="team-import">
          <label htmlFor="team-import">Import Team Set:</label>
          {newTeamImport.value !== "" && <p className="error">{validateNewTeamImport()}</p>}
          <textarea type="text" placeholder="Optionally Import a proper Pokemon Showdown Team Here And It Will Fill Out Your Whole Team!" name="team-import" id="team-import-1" value={newTeamImport.value} onChange={e => setNewTeamContents(e.target.value)}></textarea>
        </div>
        <button type="submit"
        disabled={
          validateNewTeamName() ||
          validateNewTeamImport() ||
          validateCurrentFolderClicked()
        }
        onClick={(e) => {
          e.preventDefault();
          handlePostNewTeam();
        }}>Submit</button>
      </form>
    )
  }

  render() {

    const {
      userTeams,
      teamAddClicked,
      currentClickedTeam,
      currentClickedFolder,
      handleTeamAddClickExpand,
    } = this.context;

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
              New Team +
            </button>
            {teamAddClicked ? this.renderExpanded() : null}
          </div>
        <div>
          <span>{`Current Team: ${currentClickedTeam.value}`}</span>
        </div>
      </section>
    </Fragment>
    );
  };
};
