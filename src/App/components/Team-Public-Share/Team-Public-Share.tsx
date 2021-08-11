import React, { useState, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompressArrowsAlt,
  faShareSquare,
  faClipboard,
} from '@fortawesome/free-solid-svg-icons';
import Input from '../Input/Input';
import TextArea from '../TextArea';
import Image from '../Image';
import Button from '../Button';
import PokemonSetForm from '../PokemonSetForm';
import { showdownGenerate } from '../../utils/functions';
import legality from '../../utils/legality';
import { useClipboard } from '../../utils/customHooks';
import styles from './Team-Public-Share.module.scss';
import { PokemonTeam, PokemonSet } from '../../@types';

export type TeamPublicShareProps = {
  /** Pokemon team */
  team: PokemonTeam;
  /** Pokemon Sets */
  sets: PokemonSet[];
  /** id as a string */
  id: string;
};

const TeamPublicShare: FunctionComponent<TeamPublicShareProps> = ({
  team,
  id,
  sets,
}): JSX.Element => {
  const [teamExpandToggle, setTeamExpandToggle] = useState(true);
  const { copySuccess, textArea, copyCodeToClipboard } = useClipboard();

  const handleTeamToggle = () => {
    setTeamExpandToggle(!teamExpandToggle);
  };

  const renderExpandedTeam = () => {
    const SetList = sets?.map((set: PokemonSet, i: number) => {
      return <PokemonSetForm key={i} set={set} isPublic />;
    });

    return (
      <section className={styles['team-section']} id={`${team.id}`}>
        <div className={styles['team']}>
          <div className={styles['team-header']}>
            <form className={styles['team-form']}>
              <div className={styles['team-title']}>
                <Button onClickCallback={() => handleTeamToggle()}>
                  Compress Team <FontAwesomeIcon icon={faCompressArrowsAlt} />
                </Button>
                <div className={styles['title-name']}>
                  <Input
                    htmlFor={'title-name'}
                    label={'Team Name:'}
                    inputHasError={false}
                    disabled
                    readOnly
                    inputClass={styles['title']}
                    placeholder={'e.g. Cool team'}
                    value={team.team_name}
                    type={'text'}
                    name={'team-name'}
                    id={`team-name-${team.id}`}
                  />
                </div>
                <p>By {team.user_name}</p>
                <p>
                  Created on:{' '}
                  {new Date(team.date_created || '').toLocaleString('en-GB', {
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
                textAreaClass={`${styles['title-content']} ${styles['desc']}`}
                placeholder="e.g. description"
                name="title-content"
                id={`title-content-${team.id}`}
                value={team.description || ''}
              />
            </form>
            <div className={styles['export-team']}>
              <div>
                <Button
                  onClickCallback={() => {
                    copyCodeToClipboard();
                    copySuccess();
                  }}
                  buttonClass={styles['copy-text-button']}
                >
                  Copy Text <FontAwesomeIcon icon={faClipboard} />
                </Button>
                <Link
                  to={{
                    pathname: `/share/${team.id}`,
                    state: { singleteam: team, sets: sets },
                  }}
                  target="_blank"
                >
                  Share This Team! <FontAwesomeIcon icon={faShareSquare} />
                </Link>
                <Input
                  inputHasError={false}
                  disabled
                  readOnly
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
    let spriteMap;
    if (sets) {
      spriteMap = sets.map((set: PokemonSet, i: number) => {
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
          role="button"
          tabIndex={0}
          className={styles['team-closed']}
          onClick={() => handleTeamToggle()}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === 'Space') {
              handleTeamToggle();
            }
          }}
        >
          <div>
            <h3>{team.team_name}</h3>
          </div>
          <div>
            <p>By {team.user_name}</p>
            <div className={styles['sprites-row']}>{spriteMap}</div>
            <p>
              Created on:{' '}
              {new Date(team.date_created || '').toLocaleString('en-GB', {
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

  return (
    <>{teamExpandToggle ? renderUnexpandedTeam() : renderExpandedTeam()}</>
  );
};

export default TeamPublicShare;
