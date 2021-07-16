import React, {
  Fragment,
  useContext,
  useState,
  FunctionComponent,
} from 'react';
import { Link } from 'react-router-dom';
import Input from '../Input';
import TextArea from '../TextArea';
import Image from '../Image';
import Button from '../Button';
import SetEdit from '../Set-Edit';
import GeneralContext from '../../contexts/GeneralContext';
import showdownGenerate from '../../utils/generate';
import legality from '../../utils/legality';
import { validateTeamName, validateDesc } from '../../utils/validations';
import { useClipboard } from '../../utils/customHooks';
import styles from './Team-Edit.module.scss';
import { PokemonTeam, PokemonSet } from '../../@types';

export type TeamEditProps = {
  /** pokemon team */
  team: PokemonTeam;
  /** id as a team name */
  id: string;
};

const TeamEdit: FunctionComponent<TeamEditProps> = ({
  team,
  id,
}): JSX.Element => {
  const {
    userSets,
    handleUpdateTeam,
    handleCreateDefaultPokemon,
    handleDeleteTeam,
  } = useContext(GeneralContext);

  const [teamName, setTeamName] = useState({
    value: team.team_name || '',
    touched: false,
  });
  // const [favoriteTeam, setFavoriteTeam] = useState({ value: false, touched: false });
  // TOOD: add this as a real feature
  const [description, setDescription] = useState({
    value: team.description || '',
    touched: false,
  });
  const [teamExpandToggle, setTeamExpandToggle] = useState(true);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const { copySuccess, textArea, setCopySuccess, copyCodeToClipboard } =
    useClipboard();

  const inputTeamName = (teamName: string) => {
    setTeamName({ value: teamName, touched: true });
  };

  // const setFavTeam = favoriteTeam => {
  //   setFavoriteTeam({value: favoriteTeam, touched: true});
  // };

  const setDesc = (description: string) => {
    setDescription({ value: description, touched: true });
  };

  const handleTeamToggle = () => {
    setTeamExpandToggle(!teamExpandToggle);
    setTeamName({ value: team.team_name || '', touched: false });
    setDescription({ value: team.description || '', touched: false });
  };

  const handleDeleteExpand = () => {
    setDeleteClicked(!deleteClicked);
  };

  /* ---------------- */

  /* Set Up Common Definitions to be 
  Used in Expanded/Unexpanded views */

  const ps = [...new Set(userSets.map((set: PokemonSet) => set.id))];

  const newPS = ps.map(
    (id) =>
      userSets.find((set: PokemonSet) => set.id === id) || ({} as PokemonSet)
  );

  const teamSets = newPS.filter((set: PokemonSet) => set.team_id === team.id);

  const renderSetList = (teamSets: PokemonSet[]) => {
    const SetList = teamSets.map((set: PokemonSet, i: number) => {
      return <SetEdit key={i} set={set} />;
    });

    if (SetList.length < 6) {
      SetList.push(
        <Button
          key={SetList.length}
          onClickCallback={(e) => {
            e.preventDefault();
            !!team.id && handleCreateDefaultPokemon(team.id);
            // we just need the id of the team.  this func fills out default vals.
          }}
        >
          Add Pokemon! +
        </Button>
      );
    }
    return SetList;
  };

  const renderDeleteExpand = () => {
    return (
      <div>
        <p>Are You Sure You'd Like to Delete this Team?</p>
        <Button
          onClickCallback={() => {
            handleDeleteExpand();
            handleTeamToggle();
            team.id && handleDeleteTeam(team.id);
          }}
        >
          Yes <i className="fas fa-thumbs-up"></i>
        </Button>
        <Button onClickCallback={() => handleDeleteExpand()}>
          No <i className="fas fa-thumbs-down"></i>
        </Button>
      </div>
    );
  };

  const renderExpandedTeam = () => {
    const SetList = renderSetList(teamSets);

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
                  <label htmlFor="title-name">Team Name:</label>
                  {
                    <p className="error-validate shake-horizontal">
                      {validateTeamName(teamName)}
                    </p>
                  }
                  <Input
                    inputHasError={false}
                    inputClass={styles['title']}
                    placeholder="e.g. Cool Team"
                    value={teamName.value}
                    onChangeCallback={(e) => inputTeamName(e.target.value)}
                    type="text"
                    name="team-name"
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
                textAreaHasError
                containerClass={styles['title-content']}
                htmlFor="title-content"
                label="Description:"
                validationCallback={() => validateDesc(description)}
                textAreaClass={styles['title-content desc']}
                placeholder="e.g. description"
                name="title-content"
                id={`title-content-${team.id}`}
                value={description.value}
                onChangeCallback={(e) => setDesc(e.target.value)}
              />
              <Button
                type="submit"
                disabled={
                  !!validateTeamName(teamName) || !!validateDesc(description)
                }
                onClickCallback={(e) => {
                  e.preventDefault();
                  !!team.id &&
                    handleUpdateTeam(
                      teamName.value,
                      description.value,
                      team.id
                    );
                }}
              >
                Save Team Details <i className="fas fa-save"></i>
              </Button>
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
                  Share This Team! <i className="fas fa-share-square"></i>
                </Link>
                <Input
                  inputHasError={false}
                  disabled
                  type="text"
                  readOnly
                  value={`poketeams.now.sh/share/${team.id}`}
                />
              </div>
              <label htmlFor="edit-team">
                Export Team: <i className="fas fa-download"></i>
              </label>
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
          <div>
            <Button
              onClickCallback={(e) => {
                e.preventDefault();
                handleDeleteExpand();
              }}
            >
              <i className="fas fa-trash-alt"></i> Delete Team!
            </Button>
            {deleteClicked && renderDeleteExpand()}
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
          src={legality.returnIconSprite(
            set?.species || '',
            set?.shiny || false
          )}
          alt={set?.species || ''}
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

export default TeamEdit;
