import React, { Component , Fragment} from 'react';
import UserContext from '../../contexts/UserContext';
import TeamButton from '../TeamButton/TeamButton';
import apiService from '../../services/apiService';

export default class TeamsButtonList extends Component {

  static contextType = UserContext;

  state = {
    teams: [],
    sets: [],
    clicked: false,
    currentClickedTeam: '',
  };

  componentDidMount() {
    // apiService.getTenTeams()
    //   .then(teams => this.setState({teams: teams}))
    //   .catch((err) => {
    //     this.setState({error: err});
    //   });

    // apiService.getSetsforTenTeams()
    //   .then(sets => this.setState({sets: sets}))
    //   .catch((err) => {
    //     this.setState({error: err});
    //   });
  }

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

    const teams = this.state.teams;

    const TeamList = teams.map((team, i) => <TeamButton key={i} id={team.id} folder_name={team.team_name}/>);

    return (
      <Fragment>
        <section className="folders-list">
          <h3>Teams:</h3>
          <div>
            {(TeamList.length > 0) ? TeamList : <h3>None! Click the Button Below to Get Started!</h3>}
          </div>
          <div>
            <button 
              onClick={this.handleOnClickExpand}>
              New Team +
            </button>
            {this.state.clicked ? this.renderExpanded() : null}
          </div>
        <div>
          <span>Current Team: {this.state.currentClickedTeam}</span>
        </div>
      </section>
    </Fragment>
    );
  };
};
