import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import Image from '../Image/Image';
import Button from '../Button/Button';
import SetPublic from '../Set-Public/Set-Public';
import GeneralContext from '../../contexts/GeneralContext';
import showdownGenerate from '../../functions/generate';
import legality from '../../functions/legality';
import styles from './Team-Public.module.scss';

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

  // This code is also seen in Team-Edit and Team-Public-Share

  const { team, id } = props;

  const { publicSets } = GenCon;

  /* Because of a strange bug, I'm forced to make sure 
  teams have only unique ID'd Pokemon 'sets' in them. 
  This also happens in the other Team Components
  */

  // We map out the ID's of each Pokemon, and then put them into a Set, and then back into an Array.
  // Have to go through this craziness because there is no 'object equivalence' in JavaScript!

  const ps = [...new Set(publicSets.map((set: PokemonSet) => set.id))];

  // Then we map through the new array we have created.  For each ID, we find the Pokemon in the old Array and replace it.

  const newPS = ps.map((id) =>
    publicSets.find((set: PokemonSet) => set.id === id)
  );

  // Then we find the sets for a particular team in our new list of Pokemon.  No more duplicates!

  // There may be a way to fix this in the future with Lodash.

  const teamSets = newPS.filter((set: any) => set.team_id === team.id);

  /* --------------------- */

  // Render Functions

  const renderExpandedTeam = () => {
    const SetList = teamSets.map((set, i) => {
      return <SetPublic key={i} set={set} />;
    });

    return (
      <section className={styles['team-section']} id={`${id}`}>
        <div className={styles['team']}>
          <div className={styles['team-header']}>
            <form className={styles['team-form']}>
              <div className={styles['team-title']}>
                <Button onClickCallback={() => handleTeamToggle()}>
                  Compress Team <i className="fas fa-compress-arrows-alt"></i>
                </Button>
                <div className={styles['title-name']}>
                  <Input
                    htmlFor={'title-name'}
                    label={'Team Name:'}
                    inputHasError={false}
                    disabled
                    readOnly
                    inputClass={styles['title']}
                    placeholder={'e.e. Cool team'}
                    value={team.team_name}
                    type={'text'}
                    name={'team-name'}
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
              <TextArea
                textAreaHasError={false}
                containerClass={styles['title-content']}
                htmlFor="title-content"
                label={'Description:'}
                disabled
                readOnly
                textAreaClass={styles['title-content desc']}
                placeholder="e.g. description"
                name="title-content"
                id={`title-content-${team.id}`}
                value={team.description || ''}
              />
            </form>
            <div className={styles['export-team']}>
              {state.copySuccess ? (
                <div className={styles['copied']}>Copied to Clipboard!!</div>
              ) : null}
              <div>
                <Button
                  onClickCallback={() => {
                    copyCodeToClipboard();
                    setTimeout(removeCopySuccess, 3000);
                  }}
                >
                  Copy Text
                </Button>
                <Link
                  to={{
                    pathname: `/share/${team.id}`,
                    state: { singleteam: team, sets: teamSets },
                  }}
                  target="_blank"
                >
                  Share This Team! <i className="fas fa-share-square"></i>
                </Link>
                <Input
                  inputHasError={false}
                  disabled
                  readOnly
                  type="text"
                  value={`poketeams.now.sh/share/${team.id}`}
                />
              </div>
              <label htmlFor="edit-team">Export Team:</label>
              <TextArea
                textAreaHasError={false}
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
        <Image
          key={i}
          imageClass={styles['tiny-icon']}
          src={legality.returnIconSprite(set.species, set.shiny)}
          alt={set.species}
        />
      );
    });

    return (
      <section className={styles['team-section']} id={`${id}`}>
        <div
          className={styles['team-closed']}
          onClick={() => handleTeamToggle()}
        >
          <div>
            <h3>{team.team_name}</h3>
          </div>
          <div>
            <p>By {team.user_name}</p>
            <div className={styles['sprites-row']}>{spriteMap}</div>
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
