import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import GeneralContext from '../../contexts/GeneralContext';
import showdownGenerate from '../../functions/generate';
import SetPublic from '../Set-Public/Set-Public';
import legality from '../../functions/legality';
import './Team-Public.scss';

// Interfaces

export interface PokemonSet {
  id: number;
  team_id: number;
}

// Component

const TeamPublic = (props: any) => {

  // Set Context

  const GenCon = useContext(GeneralContext);

  // Set State

  const [state, setState] = useState({
    teamExpandToggle: true,
    copySuccess: false,
  });

  // Set State Change Functions

  const handleTeamToggle = () => {
    setState((oldVals) => ({
      ...oldVals,
      teamExpandToggle: !state.teamExpandToggle,
    }));
  };

  const removeCopySuccess = (): any => {
    setState((oldVals) => ({ ...oldVals, copySuccess: false }));
  };

  // Copy to Clipboard Functionality

  const textArea: any = React.useRef(null);

  const copyCodeToClipboard = (): any => {
    textArea.current.select();
    document.execCommand('copy'); // this seems to not work
    const text = textArea.current.defaultValue;
    navigator.clipboard.writeText(text); // this seems to work!
    setState((oldVals) => ({ ...oldVals, copySuccess: true }));
  };

  /* --------------------- */

  /* Set Up Common Definitions to be 
  Used in Expanded/Unexpanded views */

  const { team, id } = props;

  const { publicSets } = GenCon;

  /* Because of a strange bug, I'm forced to make sure 
  teams have only unique ID'd Pokemon 'sets' in them. 
  This also happens in the other Team Components
  */
 
  const ps = [...new Set(publicSets.map((set: PokemonSet) => set.id))];

  const newPS = ps.map((id) =>
    publicSets.find((set: PokemonSet) => set.id === id)
  );

  const teamSets = newPS.filter((set: any) => set.team_id === team.id); // will need to find out how to fix this in the future.

  /* --------------------- */

  // Render Functions

  const renderExpandedTeam = () => {
    
    const SetList = teamSets.map((set, i) => {
      return <SetPublic key={i} set={set} />;
    });

    return (
      <section className="team-section" id={`${id}`}>
        <div className="team">
          <div className="team-header">
            <form className="team-form">
              <div className="team-title">
                <button onClick={() => handleTeamToggle()}>
                  Compress Team <i className="fas fa-compress-arrows-alt"></i>
                </button>
                <div className="title-name">
                  <label htmlFor="title-name">Team Name:</label>
                  <input
                    disabled
                    readOnly
                    className="title"
                    placeholder="e.g. Cool Team"
                    value={team.team_name}
                    type="text"
                    name="team-name"
                    id={`team-name-${team.id}`}
                  />
                </div>
                <p>By {team.user_name}</p>
                <p>
                  Created on:{' '}
                  {new Date(team.date_created).toLocaleString('en-GB', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                {/*<div className="title-form">
                  <label htmlFor={`favorite-id-${team.id}`}>Favorite</label>
                  <input type="checkbox" id={`favorite-id-${team.id}`} name={`favorite-id-${team.id}`}/> 
                  <p>Likes: {team.likes}</p> 
                </div>*/}{' '}
                {/* Part of a future feature */}
              </div>
              <div className="title-content">
                <label htmlFor="title-content">Description:</label>
                <textarea
                  disabled
                  readOnly
                  className="title-content desc"
                  placeholder="e.g. description"
                  name="title-content"
                  id={`title-content-${team.id}`}
                  value={team.description || ''}
                />
              </div>
            </form>
            <div className="export-team">
              {state.copySuccess ? (
                <div className="copied">Copied to Clipboard!!</div>
              ) : null}
              <div>
                <button
                  onClick={() => {
                    copyCodeToClipboard();
                    setTimeout(removeCopySuccess, 3000);
                  }}
                >
                  Copy Text
                </button>
                <Link
                  to={{
                    pathname: `/share/${team.id}`,
                    state: { singleteam: team, sets: teamSets },
                  }}
                  target="_blank"
                >
                  Share This Team! <i className="fas fa-share-square"></i>
                </Link>
                <input
                  disabled
                  type="text"
                  readOnly
                  value={`poketeams.now.sh/share/${team.id}`}
                />
              </div>
              <label htmlFor="edit-team">Export Team:</label>
              <textarea
                ref={textArea}
                disabled
                readOnly
                name="export-team"
                id={`export-team-${team.id}`}
                value={showdownGenerate(teamSets)}
              />
            </div>
          </div>
        </div>
        {SetList}
      </section>
    );
  };

  const renderUnexpandedTeam = () => {

    let spriteMap = teamSets.map((set, i) => {
      return (
        <img
          key={i}
          className="tiny-icon"
          src={legality.returnIconSprite(set.species, set.shiny)}
          alt={set.species}
        />
      )
    })

    return (
      <section className="team-section" id={`${id}`}>
        <div className="team-closed" onClick={() => handleTeamToggle()}>
          <div>
            <h3>{team.team_name}</h3>
          </div>
          <div>
            <p>By {team.user_name}</p>
            {spriteMap}
            <p>
              Created on:{' '}
              {new Date(team.date_created).toLocaleString('en-GB', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </section>
    );
  };

  // Final Render

  return (
    <Fragment>
      {state.teamExpandToggle ? renderUnexpandedTeam() : renderExpandedTeam()}
    </Fragment>
  );
};

export default TeamPublic;
