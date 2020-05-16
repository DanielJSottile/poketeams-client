import React, { Component, Fragment } from 'react';
import UserContext from '../../contexts/UserContext';
import showdownGenerate from '../../functions/generate';
import Set from '../Set/Set';


export default class Team extends Component {

  static contextType = UserContext;

  handleOnClick = () => {

  }

  renderExpandedTeam(){

    const {sets} = this.context;
    const {team} = this.context;

    const SetList = sets.map((set, i) => {
      return <Set key={i} id={set.id}/>
    });

    return (
      <section>
        <div className="team">
          <div className="team-header">
            <form className="team-form"> {/* on submit*/}
              <div className="team-title">
                <div>
                  <button>Delete Team X</button> {/* on delete*/}
                </div>
                <div className="title-name">
                  <label htmlFor="title-name">Team Name:</label>
                  <input className="title" placeholder="e.g. Cool Team" value={team.name} type="text" name="team-name" id={`team-name-${team.id}`}/>
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
                <textarea className="title-content desc" placeholder="e.g. description" type="text" name="title-content" id={`title-content-${team.id}`}>{team.desc}</textarea>
              </div>
              <button type="submit">Save Team Details</button>
            </form>
          <div className="export-team">
          <button>Fold Down</button> {/* onClick*/}
            <div>
              <a href="team.html" target="_blank">Share This Team!</a>
              <input type="text" readonly value={`[hostname]/share/${team.id}`}/>
            </div>
              <label htmlFor="edit-team">Export Team:</label>
              <textarea readonly type="text" name="export-team" id={`export-team-${team.id}`}>{showdownGenerate(team)}</textarea>
            </div>
          </div>
        </div>
        {SetList}
      </section>
    );
  };

  renderUnexpandedTeam() {

    const {team} = this.context;

    return (
      <section>
        <div className="team-closed">
          <div>
            <p>By {team.user_id}</p>
            <p>Created on: {team.date_created}</p>
          </div>
          <button><h4>{team.name}</h4></button> {/* onClick*/}
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
        {this.handleOnClick() ? this.renderUnexpandedTeam() : this.renderExpandedTeam()} {/* or some value in state */ }
      </Fragment>
    );
  };
};
