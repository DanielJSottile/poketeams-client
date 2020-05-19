import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import TeamPublic from '../../components/Team-Public/Team-Public';

export default class ShareTeamPage extends Component {

  static contextType = UserContext;

  render() {

    const {publicTeams} = this.context;
    console.log(publicTeams);
    const team = publicTeams.filter(team => Number(team.id) === Number(this.props.match.params.team_id))

    return (
      <div>
       {<TeamPublic team={team[0]} teamExpandToggle={false}/> || <p>It seems this team no longer exists.</p>}
      </div>
    );
  };
};
