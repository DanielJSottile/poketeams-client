import React, { useContext, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompressArrowsAlt,
  faSave,
  faShareSquare,
  faDownload,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import Button from '../../Button';
import Input from '../../Input';
import TextArea from '../../TextArea';
import GeneralContext from '../../../contexts/GeneralContext';
import showdownGenerate from '../../../utils/generate';
import { useClipboard } from '../../../utils/customHooks';
import { validateTeamName, validateDesc } from '../../../utils/validations';
import { PokemonTeam, PokemonSet, TextInput } from '../../../@types';
import styles from './ExpandedTeam.module.scss';
import DeleteExpand from '../../DeleteExpand';

type ExpandedTeamProps = {
  isPublic: boolean;
  setList: JSX.Element[];
  id: string;
  team: PokemonTeam;
  teamName: TextInput;
  teamSets: PokemonSet[];
  description: TextInput;
  deleteClicked: boolean;
  handleTeamToggle: () => void;
  handleDeleteExpand: () => void;
  handleDeleteTeam: (id: number) => void;
  inputTeamName: (teamName: string) => void;
  setDesc: (description: string) => void;
};

const ExpandedTeam: FunctionComponent<ExpandedTeamProps> = ({
  isPublic,
  setList,
  team,
  teamName,
  teamSets,
  id,
  description,
  deleteClicked,
  handleTeamToggle,
  handleDeleteExpand,
  handleDeleteTeam,
  inputTeamName,
  setDesc,
}) => {
  const { copySuccess, textArea, setCopySuccess, copyCodeToClipboard } =
    useClipboard();

  const { handleUpdateTeam } = useContext(GeneralContext);

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
                <label htmlFor="title-name">Team Name:</label>
                {
                  <p className="error-validate shake-horizontal">
                    {validateTeamName(teamName)}
                  </p>
                }
                <Input
                  inputHasError={false}
                  disabled={isPublic}
                  readOnly={isPublic}
                  inputClass={styles['title']}
                  placeholder="e.g. Cool Team"
                  value={isPublic ? team.team_name : teamName.value}
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
              textAreaHasError={!isPublic}
              disabled={isPublic}
              readOnly={isPublic}
              containerClass={styles['desc-container']}
              htmlFor="title-content"
              label="Description:"
              validationCallback={() => validateDesc(description)}
              textAreaClass={classnames(
                styles['title-content'],
                styles['desc']
              )}
              placeholder="e.g. description"
              name="title-content"
              id={`title-content-${team.id}`}
              value={isPublic ? team.description || '' : description.value}
              onChangeCallback={(e) => setDesc(e.target.value)}
            />
            {!isPublic && (
              <Button
                type="submit"
                disabled={
                  !!validateTeamName(teamName) ||
                  !!validateDesc(description) ||
                  isPublic
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
                Save Team Details <FontAwesomeIcon icon={faSave} />
              </Button>
            )}
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
                type="text"
                readOnly
                value={`poketeams.now.sh/share/${team.id}`}
              />
            </div>
            {/* <label htmlFor="edit-team">
              Export Team: <FontAwesomeIcon icon={faDownload} />
            </label> */}
            <TextArea
              textAreaHasError={false}
              containerClass={styles['export-container']}
              htmlFor={'edit-team'}
              label={'Export Team: '}
              labelIcon={<FontAwesomeIcon icon={faDownload} />}
              labelClass={styles['override-label']}
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
          {!isPublic && (
            <Button
              onClickCallback={(e) => {
                e.preventDefault();
                handleDeleteExpand();
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} /> Delete Team!
            </Button>
          )}
          {deleteClicked && !isPublic && (
            <DeleteExpand
              message={"Are You Sure You'd Like to Delete this Team?"}
              yesCallback={() => {
                handleDeleteExpand();
                handleTeamToggle();
                team.id && handleDeleteTeam(team.id);
              }}
              noCallback={() => handleDeleteExpand()}
            />
          )}
        </div>
      </div>
      <div className={styles['set-list-grid']}>{setList}</div>
    </section>
  );
};

export default ExpandedTeam;