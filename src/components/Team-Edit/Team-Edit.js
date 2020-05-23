import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import showdownGenerate from '../../functions/generate';
import SetEdit from '../Set-Edit/Set-Edit';


export default class Team extends Component {

  static contextType = UserContext;
 

  // we have a bug.  we need to change the team_name and description based on the current team.  Will fix later.

  /* We actually do need to have State here, 
  because we are EDITING values from components 
  that there are more than ONE of. However, the
  function to update the form and delete are single
  functions handled in the App.js. */

  state = { 
    team_name: {value: this.props.team.team_name || '', touched: false},
    favorite_team: {value: false, touched: false},
    description: {value: this.props.team.team_description || '', touched: false},
    teamExpandToggle: true,
    deleteClicked: false,
  }

  // set state

  setTeamName = team_name => {
    this.setState({team_name: {value: team_name, touched: true}});
  };

  setFavTeam = favorite_team => {
    this.setState({favorite_team: {value: favorite_team, touched: true}});
  };

  setDesc = description => {
    this.setState({description: {value: description, touched: true}});
  };

  handleTeamToggle = () => {
    this.setState(
      {teamExpandToggle: !this.state.teamExpandToggle,
      team_name: {value: this.props.team.team_name || '', touched: false},
      description: {value: this.props.team.description || '', touched: false}})
  };

  handleDeleteExpand() {
    this.setState({deleteClicked: !this.state.deleteClicked});
  }


  // validate

  validateTeamName = () => {
    let team_name = this.state.team_name.value;
    if(!team_name){
      return `Team MUST have a name!`
    }
  };

  validateDesc = () => {
    let description = this.state.description.value;
    if (typeof(description) !== 'string') {
      return `This should never come up, it is superflous`
    }
  };

  // API calls are handled in App.js

  renderSetList(teamSets) {

    const {handlePostNewPokemon} = this.context;

    const SetList = teamSets.map((set, i) => {
      return <SetEdit key={i} set={set}/>
    });

    if(SetList.length < 6){
      SetList.push(<button key={SetList.length} onClick={(e) => {
        e.preventDefault();
        handlePostNewPokemon(this.props.team.id); // we just need the id of the team.  this func fills out default vals.
      }}>Add Pokemon! +</button>)
    }
    return SetList;
  }

  renderDeleteExpand() {
    const {
      handleDeleteTeam,
    } = this.context;

    return (
      <div>
        <p>Are You Sure You'd Like to Delete this Folder?</p> 
        <button onClick={() => {
          handleDeleteTeam(this.props.team.id);
          this.handleDeleteExpand();
        }}>Yes <i className="fas fa-thumbs-up"></i></button>
        <button onClick={() => this.handleDeleteExpand()}>No <i className="fas fa-thumbs-down"></i></button>
      </div> 
    )
  };

  renderExpandedTeam() {

    const {
      userSets,
      handleUpdateTeam,
    } = this.context;

    const {team} = this.props;

    const teamSets = userSets.filter(set => set.team_id === team.id)

    const SetList = this.renderSetList(teamSets)

    return (
      <section>
        <div className="team">
          <div className="team-header">
            <form className="team-form">
              <div className="team-title">
                <button onClick={() => this.handleTeamToggle()}>Compress Team <i className="fas fa-compress-arrows-alt"></i></button>
                <div className="title-name">
                  <label htmlFor="title-name">Team Name:</label>
                  {<p className="error">{this.validateTeamName()}</p>}
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
                {<p className="error">{this.validateDesc()}</p>}
                <textarea className="title-content desc" placeholder="e.g. description" type="text" name="title-content" id={`title-content-${team.id}`} value={this.state.description.value} onChange={e => this.setDesc(e.target.value)}/>
              </div>
              <button type="submit"
                disabled={
                  this.validateTeamName() ||
                  this.validateDesc()
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdateTeam(this.state.team_name.value, this.state.description.value, team.id);
                }}>Save Team Details <i className="fas fa-save"></i></button>
            </form>
          <div className="export-team">
            <div>
            <Link to={{
              pathname: `/share/${team.id}`,
              state: {singleteam: team, sets: teamSets}}} target="_blank" >Share This Team! <i className="fas fa-share-square"></i></Link>
              <input disabled type="text" readOnly value={`[hostname]/share/${team.id}`}/>
            </div>
              <label htmlFor="edit-team">Export Team: <i className="fas fa-download"></i></label>
              <textarea disabled readOnly type="text" name="export-team" id={`export-team-${team.id}`} value={showdownGenerate(teamSets)}/>
            </div>
          </div>
          <div>
            <button onClick={(e) => {
              e.preventDefault();
              this.handleDeleteExpand()
              }}><i className="fas fa-trash-alt"></i> Delete Team!</button>
              {this.state.deleteClicked ? this.renderDeleteExpand() : null}
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
          <div>
            <h4>{team.team_name}</h4>
          </div>
          <div>
            <p>Favorites: {team.likes}</p>
          </div>
        </div>
      </section>
    );
  };

  render() {

    const {team} = this.props;

    return (
      <div className={`${team.team_name}-${team.id}`}>
        {this.state.teamExpandToggle ? this.renderUnexpandedTeam() : this.renderExpandedTeam()}
      </div>
    );
  };
};
