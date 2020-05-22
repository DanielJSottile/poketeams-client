import React, { Component , Fragment} from 'react';
import UserContext from '../../contexts/UserContext';
import TeamButton from '../TeamButton/TeamButton';

export default class TeamsButtonList extends Component {

  static contextType = UserContext;

  render() { // ** WILL NEED TO GO BACK AND ADD THE PAGINATION FEATURE **

    const {
      publicTeams,
      currentClickedTeam,
    } = this.context;

    const TeamList = publicTeams.map((team, i) => <TeamButton key={i} id={team.id} team_name={team.team_name}/>);

    return (
      <Fragment>
        <section className="folders-list">
          <h3>Teams:</h3>
          <div>
            {(TeamList.length > 0) ? TeamList : <h3>None! Please Login and Be the First to Add a Team!</h3>}
          </div>
        <div>
          <span>{`Current Team: ${currentClickedTeam.value}`}</span>
        </div>
      </section>
    </Fragment>
    );
  };
};
