import React, { Component, Fragment } from 'react';
import UserContext from '../../contexts/UserContext';
import showdownGenerate from '../../functions/generate';
import Set from '../Set-Edit/Set-Edit';


export default class Team extends Component {

  static contextType = UserContext;

  state = {
    team: [],
    sets: [],
    clicked: false
  }

  handleOnClickExpand = () => {
    this.setState({clicked: !this.state.clicked})
  }

  renderExpandedTeam(){

    const sets = this.state.sets;
    const team = this.state.team;

    const SetList = sets.map((set, i) => {
      return <Set key={i} id={set.id}/>
    });

    return (
      <section>
        <div className="team">
          <div className="team-header">
              <div className="team-title">
                <div className="title-name">
                  <label htmlFor="title-name">Team Name:</label>
                  <input disabled className="title" value={team.name} type="text" name="team-name" id={`team-name-${team.id}`}/>
                </div>
                <p>By {team.user_id}</p>
                <p>Created on: {team.date_created}</p>
                <div className="title-form">
                  <label htmlFor={`favorite-id-${team.id}`}>Favorite</label>
                  <input type="checkbox" id={`favorite-id-${team.id}`} name={`favorite-id-${team.id}`} value="true"/>
                  <p>Favorites: {team.favorites}</p>
                </div>
              </div>
              <div className="title-content">
                <label htmlFor="title-content">Description:</label>
                <textarea className="title-content desc" type="text" name="title-content" id={`title-content-${team.id}`} disabled value={team.desc}/>
              </div>
          <div className="export-team">
          <button onClick={this.handleOnClickExpand}>Fold Down</button> {/* onClick*/}
            <div>
              <a href="team.html" target="_blank">Share This Team!</a>
              <input type="text" disabled value={`[hostname]/share/${team.id}`}/>
            </div>
              <label htmlFor="edit-team">Export Team:</label>
              <textarea type="text" name="export-team" id={`export-team-${team.id}`} disabled value={showdownGenerate(team)}/>
            </div>
          </div>
        </div>
        {SetList}
      </section>
    );
  };

  renderUnexpandedTeam() {

    const team = this.state.team;

    return (
      <section>
        <div className="team-closed">
          <div>
            <p>By {team.user_id}</p>
            <p>Created on: {team.date_created}</p>
          </div>
          <button onClick={this.handleOnClickExpand}><h4>{team.name}</h4></button>
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
    return (
      <Fragment>
        {this.state.clicked ? this.renderUnexpandedTeam() : this.renderExpandedTeam()} {/* or some value in state */ }
      </Fragment>
    );
  };
};
