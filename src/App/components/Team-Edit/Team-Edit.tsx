import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import Image from '../Image/Image';
import Button from '../Button/Button';
import SetEdit from '../Set-Edit/Set-Edit';
import GeneralContext from '../../contexts/GeneralContext';
import showdownGenerate from '../../functions/generate';
import legality from '../../functions/legality';
import styles from './Team-Edit.module.scss';
import { PokemonTeam, PokemonSet } from '../../@types';

export type Props = {
  /** pokemon team */
  team: PokemonTeam;
  /** id as a team name */
  id: string;
};

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

const TeamEdit: React.FC<Props> = ({ team, id }): JSX.Element => {
  const GenCon = useContext(GeneralContext);

  const [state, setState] = useState({
    team_name: { value: team.team_name || '', touched: false },
    favorite_team: { value: false, touched: false },
    description: { value: team.team_description || '', touched: false },
    teamExpandToggle: true,
    deleteClicked: false,
    copySuccess: false,
  });

  const removeCopySuccess = (): any => {
    setState((oldVals) => ({ ...oldVals, copySuccess: false }));
  };

  const setTeamName = (team_name: string) => {
    setState((oldVals) => ({
      ...oldVals,
      team_name: { value: team_name, touched: true },
    }));
  };

  // const setFavTeam = favorite_team => {
  //   setState(oldVals => ({...oldVals, favorite_team: {value: favorite_team, touched: true}}))
  // };

  const setDesc = (description: string) => {
    setState((oldVals) => ({
      ...oldVals,
      description: { value: description, touched: true },
    }));
  };

  const handleTeamToggle = () => {
    setState((oldVals) => ({
      ...oldVals,
      teamExpandToggle: !state.teamExpandToggle,
      team_name: { value: team.team_name || '', touched: false },
      description: { value: team.description || '', touched: false },
    }));
  };

  const handleDeleteExpand = () => {
    setState((oldVals) => ({
      ...oldVals,
      deleteClicked: !state.deleteClicked,
    }));
  };

  const textArea: any = React.useRef(null);

  const copyCodeToClipboard = (): any => {
    textArea.current.select();
    document.execCommand('copy'); // this seems to not work
    const text = textArea.current.defaultValue;
    navigator.clipboard.writeText(text); // this seems to work!
    setState((oldVals) => ({ ...oldVals, copySuccess: true }));
  };

  const validateTeamName = (): any => {
    let team_name = state.team_name.value;
    if (!team_name) {
      return `Team MUST have a name!`;
    }
  };

  const validateDesc = (): any => {
    let description = state.description.value;
    if (typeof description !== 'string') {
      return `This should never come up, it is superflous`;
    }
  };

  /* ---------------- */

  /* Set Up Common Definitions to be 
  Used in Expanded/Unexpanded views */

  const { userSets, handleUpdateTeam } = GenCon;

  const ps = [...new Set(userSets.map((set: PokemonSet) => set.id))];

  const newPS = ps.map((id) =>
    userSets.find((set: PokemonSet) => set.id === id)
  );

  const teamSets = newPS.filter((set: any) => set.team_id === team.id);

  const renderSetList = (teamSets: any) => {
    const { handlePostNewPokemon } = GenCon;

    const SetList = teamSets.map((set: any, i: number) => {
      return <SetEdit key={i} set={set} />;
    });

    if (SetList.length < 6) {
      SetList.push(
        <Button
          key={SetList.length}
          onClickCallback={(e) => {
            e.preventDefault();
            handlePostNewPokemon(team.id); // we just need the id of the team.  this func fills out default vals.
          }}
        >
          Add Pokemon! +
        </Button>
      );
    }
    return SetList;
  };

  const renderDeleteExpand = () => {
    const { handleDeleteTeam } = GenCon;

    return (
      <div>
        <p>Are You Sure You'd Like to Delete this Team?</p>
        <Button
          onClickCallback={() => {
            handleDeleteExpand();
            handleTeamToggle();
            handleDeleteTeam(team.id);
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
                      {validateTeamName()}
                    </p>
                  }
                  <Input
                    inputHasError={false}
                    inputClass={styles['title']}
                    placeholder="e.g. Cool Team"
                    value={state.team_name.value}
                    onChangeCallback={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => setTeamName(e.target.value)}
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
              <TextArea
                textAreaHasError
                containerClass={styles['title-content']}
                htmlFor="title-content"
                label="Description:"
                validationCallback={validateDesc()}
                textAreaClass={styles['title-content desc']}
                placeholder="e.g. description"
                name="title-content"
                id={`title-content-${team.id}`}
                value={state.description.value}
                onChangeCallback={(e) => setDesc(e.target.value)}
              />
              <Button
                type="submit"
                disabled={validateTeamName() || validateDesc()}
                onClickCallback={(e) => {
                  e.preventDefault();
                  handleUpdateTeam(
                    state.team_name.value,
                    state.description.value,
                    team.id
                  );
                }}
              >
                Save Team Details <i className="fas fa-save"></i>
              </Button>
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
            {state.deleteClicked ? renderDeleteExpand() : null}
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

  return (
    <Fragment>
      {state.teamExpandToggle ? renderUnexpandedTeam() : renderExpandedTeam()}
    </Fragment>
  );
};

export default TeamEdit;
