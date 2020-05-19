import React, { Component, Fragment } from 'react';
import UserContext from '../../contexts/UserContext';
import showdownGenerate from '../../functions/generate';
import Set from '../Set-Edit/Set-Edit';


export default class Team extends Component {

  static contextType = UserContext;

  /* We actually do need to have State here, 
  because we are EDITING values from components 
  that there are more than ONE of. However, the
  function to update the form and delete are single
  functions handled in the App.js. */

  state = { 
    team_name: {value: `${this.props.team.team_name}`, touched: false},
    favorite_team: {value: false, touched: false},
    description: {value: `${this.props.team.description}`, touched: false},
  }

  // set state

  setTeamName = team_name => {
    this.setState({species: {value: team_name, touched: true}});
  };

  setFavTeam = favorite_team => {
    this.setState({nickname: {value: favorite_team, touched: true}});
  };

  setDesc = description => {
    this.setState({gender: {value: description, touched: true}});
  };

  // validate

  validateTeamName = () => {
    let team_name = this.state.team_name.value;
  };

  validateDesc = () => {
    let description = this.state.description.value;
  };

  // API calls are handled in App.js

  renderExpandedTeam() {

    const {
      userSets,
      handleTeamToggle,
      handleDeleteTeam,
      handleUpdateTeam,
    } = this.context;

    const {team} = this.props;

    const teamSets = userSets.filter(set => set.team_id === team.id)

    const SetList = userSets.map((set, i) => {
      return <Set key={i} set={set}/>
    });

    return (
      <section>
        <div className="team">
          <div className="team-header">
            <form className="team-form">
              <div className="team-title">
                <button onClick={() => handleTeamToggle()}>Fold Down Team</button>
                <div className="title-name">
                  <label htmlFor="title-name">Team Name:</label>
                  <input className="title" placeholder="e.g. Cool Team" value={this.state.team_name.value} onChange={e => this.setTeamName(e.target.value)} type="text" name="team-name" id={`team-name-${team.id}`}/>
                </div>
                <p>By {team.user_name}</p> {/* right now this does not actually exist, so remember to add it for your API call*/}
                <p>Created on: {new Date(team.date_created).toLocaleString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <div className="title-form">
                  <label htmlFor={`favorite-id-${team.id}`}>Favorite</label>
                  <input type="checkbox" id={`favorite-id-${team.id}`} name={`favorite-id-${team.id}`} value={this.state.favorite_team.value} onChange={e => this.setFavTeam(e.target.value)}/>
                  <p>Likes: {team.likes}</p> {/* right now this does not actually exist, so we have to add it*/}
                </div>
              </div>
              <div className="title-content">
                <label htmlFor="title-content">Description:</label>
                <textarea className="title-content desc" placeholder="e.g. description" type="text" name="title-content" id={`title-content-${team.id}`} value={this.state.description.value} onChange={e => this.setDesc(e.target.value)}/>
              </div>
              <button type="submit"
                disabled={
                  this.validateTeamName() ||
                  this.validateDesc()
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdateTeam(this.state.team_name, this.state.description);
                }}>Save Team Details</button>
            </form>
          <div className="export-team">
            <div>
              <a href="team.html" target="_blank">Share This Team!</a>
              <input disabled type="text" readOnly value={`[hostname]/share/${team.id}`}/>
            </div>
              <label htmlFor="edit-team">Export Team:</label>
              <textarea disabled readOnly type="text" name="export-team" id={`export-team-${team.id}`} value={showdownGenerate(teamSets)}/>
            </div>
          </div>
          <div>
            <button onClick={(e) => {
              e.preventDefault();
              handleDeleteTeam(this.props.team.id);
              }}>Delete Team!</button>
          </div>
        </div>
        {SetList}
      </section>
    );
  };

  renderUnexpandedTeam() {

    const {handleTeamToggle} = this.context;
    const {team} = this.props;

    return (
      <section>
        <div className="team-closed" onClick={() => handleTeamToggle()}>
          <div>
            <p>By {team.user_name}</p>
            <p>Created on: {new Date(team.date_created).toLocaleString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <h4>{team.team_name}</h4>
          <div className="title-form">
            
            <label htmlFor={`favorite-id-${team.id}`}>Favorite</label>
            <input type="checkbox" id={`favorite-id-${team.id}`} name={`favorite-id-${team.id}`} value="true"/>

            <p>Favorites: {team.favorites}</p>
        </div>
        </div>
      </section>
    );
  };

  render() {
    const {teamExpandToggle} = this.context;

    return (
      <Fragment>
        {teamExpandToggle ? this.renderUnexpandedTeam() : this.renderExpandedTeam()}
      </Fragment>
    );
  };
};
