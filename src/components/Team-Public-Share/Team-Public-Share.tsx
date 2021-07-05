import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import Image from '../Image/Image';
import Button from '../Button/Button';
import SetPublic from '../Set-Public/Set-Public';
import showdownGenerate from '../../functions/generate';
import legality from '../../functions/legality';
import styles from './Team-Public-Share.module.scss';

// Component

const TeamPublicShare = (props: any) => {
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

  // Render Functions

  const renderExpandedTeam = () => {
    const { team, sets } = props;

    const SetList = sets.map((set: any, i: number) => {
      return <SetPublic key={i} set={set} />;
    });

    return (
      <section className={styles['team-section']} id={`${team.id}`}>
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
              <div className={styles['title-content']}>
                <label htmlFor="title-content">Description:</label>
                <textarea
                  disabled
                  readOnly
                  className={`${styles['title-content']} ${styles['desc']}`}
                  placeholder="e.g. description"
                  name="title-content"
                  id={`title-content-${team.id}`}
                  value={team.description || ''}
                />
              </div>
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
                    state: { singleteam: team, sets: sets },
                  }}
                  target="_blank"
                >
                  Share This Team! <i className="fas fa-share-square"></i>
                </Link>
                <Input
                  inputHasError={false}
                  disabled
                  readOnly
                  value={team.team_name}
                />
              </div>
              <label htmlFor="edit-team">Export Team:</label>
              <textarea
                ref={textArea}
                disabled
                readOnly
                name="export-team"
                id={`export-team-${team.id}`}
                value={showdownGenerate(sets)}
              />
            </div>
          </div>
        </div>
        {SetList}
      </section>
    );
  };

  const renderUnexpandedTeam = () => {
    const { team, id, sets } = props;

    let spriteMap;
    if (sets) {
      spriteMap = sets.map((set: any, i: number) => {
        return (
          <Image
            key={i}
            imageClass={styles['tiny-icon']}
            src={legality.returnIconSprite(set.species, set.shiny)}
            alt={set.species}
          />
        );
      });
    }

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

export default TeamPublicShare;
