import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import GeneralContext from '../../contexts/GeneralContext';
import showdownGenerate from '../../functions/generate';
import SetEdit from '../Set-Edit/Set-Edit';
import './Team-Edit.css';

export interface StringInput {
  value: string;
  touched: boolean;
}

export interface BoolInput {
  value: boolean;
  touched: boolean;
}

export interface Provider {
  team_name: StringInput;
  favorite_team: BoolInput;
  description: StringInput;
  teamExpandToggle: boolean;
  deleteClicked: boolean;
}

export interface PokemonSet {
  id: number;
  team_id: number;
}


const TeamEdit = (props: any) => {

  const GenCon = useContext(GeneralContext);
 
  // wait I do? where?
  // ??? we have a bug.  we need to change the team_name and description based on the current team.  Will fix later.

  /* We actually do need to have State here, 
  because we are EDITING values from components 
  that there are more than ONE of. However, the
  function to update the form and delete are single
  functions handled in the General Context. */

  const [state, setState] = useState(
    { 
      team_name: {value: props.team.team_name || '', touched: false},
      favorite_team: {value: false, touched: false},
      description: {value: props.team.team_description || '', touched: false},
      teamExpandToggle: true,
      deleteClicked: false,
    }
  );

  // set state

  const setTeamName = (team_name: string) => {
    setState(oldVals => ({...oldVals, team_name: {value: team_name, touched: true}}))
  };

  // const setFavTeam = favorite_team => {
  //   setState(oldVals => ({...oldVals, favorite_team: {value: favorite_team, touched: true}}))
  // };

  const setDesc = (description: string) => {
    setState(oldVals => ({...oldVals, description: {value: description, touched: true}}))
  };

  const handleTeamToggle = () => {
    setState(oldVals => ({...oldVals, teamExpandToggle: !state.teamExpandToggle,
      team_name: {value: props.team.team_name || '', touched: false},
      description: {value: props.team.description || '', touched: false}}))
  };

  const handleDeleteExpand = () => {
    setState(oldVals => ({...oldVals, deleteClicked: !state.deleteClicked}))
  }


  // validate

  const validateTeamName = (): any => {
    let team_name = state.team_name.value;
    if(!team_name){
      return `Team MUST have a name!`
    }
  };

  const validateDesc = (): any => {
    let description = state.description.value;
    if (typeof(description) !== 'string') {
      return `This should never come up, it is superflous`
    }
  };

  // API calls are handled in App.js

  const renderSetList = (teamSets: any) => {

    const {handlePostNewPokemon} = GenCon;

    const SetList = teamSets.map((set: any, i: number) => {
      return <SetEdit key={i} set={set}/>
    });

    if(SetList.length < 6){
      SetList.push(<button key={SetList.length} onClick={(e) => {
        e.preventDefault();
        handlePostNewPokemon(props.team.id); // we just need the id of the team.  this func fills out default vals.
      }}>Add Pokemon! +</button>)
    }
    return SetList;
  }

  const renderDeleteExpand = () => {
    const {
      handleDeleteTeam,
    } = GenCon;

    return (
      <div>
        <p>Are You Sure You'd Like to Delete this Team?</p> 
        <button onClick={() => {
          handleDeleteTeam(props.team.id);
          handleDeleteExpand();
        }}>Yes <i className="fas fa-thumbs-up"></i></button>
        <button onClick={() => handleDeleteExpand()}>No <i className="fas fa-thumbs-down"></i></button>
      </div> 
    )
  };

  const renderExpandedTeam = () => {

    const {
      userSets,
      handleUpdateTeam,
    } = GenCon;

    const us = [...new Set(userSets.map((set: PokemonSet) => set.id))];
    
    const newUS = us.map(id => userSets.find((set: PokemonSet) => set.id === id));

    const {team, id} = props;

    const teamSets = newUS.filter((set: any) => set.team_id === team.id) // will need to find out how to fix this in the future.

    const SetList = renderSetList(teamSets)

    return (
      <section id={`${id}`}>
        <div className="team">
          <div className="team-header">
            <form className="team-form">
              <div className="team-title">
                <button onClick={() => handleTeamToggle()}>Compress Team <i className="fas fa-compress-arrows-alt"></i></button>
                <div className="title-name">
                  <label htmlFor="title-name">Team Name:</label>
                  {<p className="error-validate shake-horizontal">{validateTeamName()}</p>}
                  <input className="title" placeholder="e.g. Cool Team" value={state.team_name.value} onChange={e => setTeamName(e.target.value)} type="text" name="team-name" id={`team-name-${team.id}`}/>
                </div>
                <p>By {team.user_name}</p>
                <p>Created on: {new Date(team.date_created).toLocaleString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                {/*<div className="title-form">
                  <label htmlFor={`favorite-id-${team.id}`}>Favorite</label>
                  <input type="checkbox" id={`favorite-id-${team.id}`} name={`favorite-id-${team.id}`}/> 
                  <p>Likes: {team.likes}</p> 
                </div>*/} {/* Part of a future feature */}
              </div>
              <div className="title-content">
                <label htmlFor="title-content">Description:</label>
                {<p className="error-validate shake-horizontal">{validateDesc()}</p>}
                <textarea className="title-content desc" placeholder="e.g. description" name="title-content" id={`title-content-${team.id}`} value={state.description.value} onChange={e => setDesc(e.target.value)}/>
              </div>
              <button type="submit"
                disabled={
                  validateTeamName() ||
                  validateDesc()
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdateTeam(state.team_name.value, state.description.value, team.id);
                }}>Save Team Details <i className="fas fa-save"></i></button>
            </form>
          <div className="export-team">
            <div>
            <Link to={{
              pathname: `/share/${team.id}`,
              state: {singleteam: team, sets: teamSets}}} target="_blank" >Share This Team! <i className="fas fa-share-square"></i></Link>
              <input disabled type="text" readOnly value={`poketeams.now.sh/share/${team.id}`}/>
            </div>
              <label htmlFor="edit-team">Export Team: <i className="fas fa-download"></i></label>
              <textarea disabled readOnly name="export-team" id={`export-team-${team.id}`} value={showdownGenerate(teamSets)}/>
            </div>
          </div>
          <div>
            <button onClick={(e) => {
              e.preventDefault();
              handleDeleteExpand()
              }}><i className="fas fa-trash-alt"></i> Delete Team!</button>
              {state.deleteClicked ? renderDeleteExpand() : null}
          </div>
        </div>
        {SetList}
      </section>
    );
  };

  const renderUnexpandedTeam = () => {

    const {team, id} = props;

    return (
      <section id={`${id}`}>
        <div className="team-closed" onClick={() => handleTeamToggle()}>
          <div>
            <h3>{team.team_name}</h3>
          </div>
          <div>
            <p>By {team.user_name}</p>
            <p>Created on: {new Date(team.date_created).toLocaleString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      </section>
    );
  };

  

    return (
      <Fragment>
        {state.teamExpandToggle ? renderUnexpandedTeam() : renderExpandedTeam()}
      </Fragment>
    );
};

export default TeamEdit;
