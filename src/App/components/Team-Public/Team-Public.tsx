import React, {
  Fragment,
  useContext,
  useState,
  FunctionComponent,
} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompressArrowsAlt,
  faShareSquare,
} from '@fortawesome/free-solid-svg-icons';
import Input from '../Input';
import TextArea from '../TextArea';
import Image from '../Image';
import Button from '../Button';
import SetPublic from '../Set-Public';
import GeneralContext from '../../contexts/GeneralContext';
import showdownGenerate from '../../utils/generate';
import legality from '../../utils/legality';
import { useClipboard } from '../../utils/customHooks';
import styles from './Team-Public.module.scss';
import { PokemonTeam, PokemonSet } from '../../@types';

export type TeamPublicProps = {
  /** pokemon team */
  team: PokemonTeam;
  /** id */
  id: string;
};

const TeamPublic: FunctionComponent<TeamPublicProps> = ({
  team,
  id,
}): JSX.Element => {
  const { publicSets } = useContext(GeneralContext);

  const [teamExpandToggle, setTeamExpandToggle] = useState(true);
  const { copySuccess, textArea, setCopySuccess, copyCodeToClipboard } =
    useClipboard();

  const handleTeamToggle = () => {
    setTeamExpandToggle(!teamExpandToggle);
  };

  const ps = [...new Set(publicSets.map((set: PokemonSet) => set.id))];

  const newPS = ps.map(
    (id) =>
      publicSets.find((set: PokemonSet) => set.id === id) || ({} as PokemonSet)
  );

  const teamSets = newPS.filter((set: PokemonSet) => set.team_id === team.id);

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
                textAreaClass={styles['title-content desc']}
                placeholder="e.g. description"
                name="title-content"
                id={`title-content-${team.id}`}
                value={team.description || ''}
              />
            </form>
            <div className={styles['export-team']}>
              {copySuccess && (
                <div className={styles['copied']}>Copied to Clipboard!!</div>
              )}
              <div>
                <Button
                  onClickCallback={() => {
                    copyCodeToClipboard();
                    setTimeout(() => setCopySuccess(false), 3000);
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
                  Share This Team! <FontAwesomeIcon icon={faShareSquare} />
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
    const spriteMap = teamSets.map((set, i) => {
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
    <Fragment>
      {teamExpandToggle ? renderUnexpandedTeam() : renderExpandedTeam()}
    </Fragment>
  );
};

export default TeamPublic;
