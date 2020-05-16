import React, { Component , Fragment} from 'react';
import UserContext from '../../contexts/UserContext';
import TeamButton from '../TeamButton/TeamButton';

export default class TeamsButtonList extends Component {

  static contextType = UserContext;

  handleOnClick = (e) => {

  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("hey you clicked me");
    const {team_name} = e.target;

    // some kind of APIservice.PostTeam(team_name.value)

  }

  renderExpanded() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div class="team-name">
          <label for="foldername">Team Name:</label>
          <input placeholder="e.g. My Cool Team" type="text" name="teamname" id="teamname" />
        </div>
        <div class="team-import">
          <label for="team-import">Import Team Set:</label>
          <textarea type="text" placeholder="Optionally Import a proper Pokemon Showdown Team Here And It Will Fill Out Your Whole Team!" name="team-import" id="team-import-1"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }

  render() {

    const {teams} = this.context;

    const TeamList = teams.map((team, i) => {
      return <TeamButton key={i} id={team.id} folder_name={team.team_name}/>
    });

    return (
      <Fragment>
        <section className="folders-list">
          <h3>Teams:</h3>
          <div>
            {TeamList.length > 0 ? TeamList : <h3>None! Click Below to Make a New Team!</h3>}
          </div>
          <div>
            <button onClick={this.handleOnClick}>New Team +</button>
            {clicked ? this.renderExpanded() : null}
          </div>
        <div>
          <span>Current Folder: {currentClickedTeam}</span>
        </div>
      </section>
    </Fragment>
    );
  };
};
