import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import showdownGenerate from '../../functions/generate';
import SetPublic from '../Set-Public/Set-Public';


export default class Team extends Component {

  static contextType = UserContext;

  state = {
    teamExpandToggle: true,
  }

  handleTeamToggle = () => {
    this.setState({teamExpandToggle: !this.state.teamExpandToggle})
  };

  renderExpandedTeam(){

    const {
      publicSets,
    } = this.context;

    const {team} = this.props;

    const teamSets = publicSets.filter(set => set.team_id === team.id)

    const SetList = teamSets.map((set, i) => {
      return <SetPublic key={i} set={set}/>
    });

    return (
      <section>
        <div className="team">
          <div className="team-header">
            <form className="team-form">
              <div className="team-title">
                <button onClick={() => this.handleTeamToggle()}>Fold Down Team</button>
                <div className="title-name">
                  <label htmlFor="title-name">Team Name:</label>
                  <input disabled readOnly className="title" placeholder="e.g. Cool Team" value={team.team_name} type="text" name="team-name" id={`team-name-${team.id}`}/>
                </div>
                <p>By {team.user_name}</p> {/* right now this does not actually exist, so remember to add it for your API call*/}
                <p>Created on: {new Date(team.date_created).toLocaleString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <div className="title-form">
                  <label htmlFor={`favorite-id-${team.id}`}>Favorite</label>
                  <input type="checkbox" id={`favorite-id-${team.id}`} name={`favorite-id-${team.id}`}/> {/* not sure what to do with this right now...*/}
                  <p>Likes: {team.likes}</p> {/* right now this does not actually exist, so we have to add it*/}
                </div>
              </div>
              <div className="title-content">
                <label htmlFor="title-content">Description:</label>
                <textarea disabled readOnly className="title-content desc" placeholder="e.g. description" type="text" name="title-content" id={`title-content-${team.id}`} value={team.description}/>
              </div>
            </form>
          <div className="export-team">
            <div>
            <Link to={`/share/${team.id}`} target="_blank">Share This Team!</Link>
              <input disabled type="text" readOnly value={`[hostname]/share/${team.id}`}/>
            </div>
              <label htmlFor="edit-team">Export Team:</label>
              <textarea disabled readOnly type="text" name="export-team" id={`export-team-${team.id}`} value={showdownGenerate(teamSets)}/>
            </div>
          </div>
        </div>
        {SetList}
      </section>
    );
  };


  renderUnexpandedTeam() {

    const {team} = this.props;

    return (
      <section>
        <div className="team-closed" onClick={() => this.handleTeamToggle()}>
          <div>
            <p>By {team.user_name}</p>
            <p>Created on: {new Date(team.date_created).toLocaleString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <h4>{team.team_name}</h4>
          <p>Favorites: {team.likes}</p>
        </div>
      </section>
    );
  };

  render() {

    return (
      <Fragment>
        {this.state.teamExpandToggle ? this.renderUnexpandedTeam() : this.renderExpandedTeam()}
      </Fragment>
    );
  };
};
