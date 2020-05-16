import React, { Component , Fragment} from 'react';
import UserContext from '../../contexts/UserContext';
import TeamButton from '../TeamButton/TeamButton';

export default class TeamsButtonList extends Component {

  static contextType = UserContext;

  state = {
    clicked: false,
    currentClickedTeam: '',
    canEdit: false
  };

  handleOnClickExpand = () => {
    this.setState({clicked: !this.state.clicked})
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
        <div className="team-name">
          <label htmlFor="foldername">Team Name:</label>
          <input placeholder="e.g. My Cool Team" type="text" name="teamname" id="teamname" />
        </div>
        <div className="team-import">
          <label htmlFor="team-import">Import Team Set:</label>
          <textarea type="text" placeholder="Optionally Import a proper Pokemon Showdown Team Here And It Will Fill Out Your Whole Team!" name="team-import" id="team-import-1"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }

  render() {

    const {teams} = this.context;
    console.log(teams);

    const TeamList = teams.map((team, i) => <TeamButton key={i} id={team.id} folder_name={team.team_name}/>);

    return (
      <Fragment>
        <section className="folders-list">
          <h3>Teams:</h3>
          <div>
            {(TeamList.length > 0) ? TeamList : (this.state.canEdit) ? <h3>None! Click the Button Below to Get Started!</h3> : <h3>None! Um...This Is Strange...Can You Please Login And Add A Team For Me?</h3>}
          </div>
          {
            (this.state.canEdit) ? <div>
            <button 
            onClick={this.handleOnClickExpand}>
            New Team +
            </button>
            {this.state.clicked ? this.renderExpanded() : null}
            </div> : null
          }
        <div>
          <span>Current Team: {this.state.currentClickedTeam}</span>
        </div>
      </section>
    </Fragment>
    );
  };
};
