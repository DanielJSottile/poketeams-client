import React, { Component } from 'react';
import TeamPublic from '../../components/Team-Public/Team-Public';

export default class ShareTeamPage extends Component {
  render() {
    return (
      <div>
       {<TeamPublic/> || <p>It seems this team no longer exists.</p>}
      </div>
    );
  };
};
