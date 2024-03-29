import React, { useContext, FunctionComponent } from 'react';
import {
  faCompressArrowsAlt,
  faSave,
  faTrashAlt,
  faBan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { PokemonTeam, PokemonSet, TextInput } from '../../../@types';
import GeneralContext from '../../../contexts/GeneralContext';
import { showdownGenerate } from '../../../utils/functions';
import { validateTeamName, validateDesc } from '../../../utils/validations';
import Button from '../../Button';
import DeleteExpand from '../../DeleteExpand';
import ExportText from '../../ExportText';
import Form from '../../Form';
import TextArea from '../../TextArea';
import { customSuccessToast } from '../../Utils/CustomToasts';
import styles from './ExpandedTeam.module.scss';

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
  handleDeleteTeam: (id: string) => void;
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
  const { handleUpdateTeam } = useContext(GeneralContext);

  return (
    <section className={styles['team-section']} id={`${id}`}>
      <div className={styles['team']}>
        <Button
          onClickCallback={() => handleTeamToggle()}
          buttonClass={styles['compress-button']}
        >
          <FontAwesomeIcon icon={faCompressArrowsAlt} />
        </Button>
        <div className={styles['team-header']}>
          <Form className={styles['team-form']}>
            <div className={styles['team-title']}>
              <div className={styles['title-name']}>
                <TextArea
                  label={'Team Name:'}
                  htmlFor={'title-name'}
                  textAreaHasError={false}
                  disabled={isPublic}
                  readOnly={isPublic}
                  textAreaClass={styles['title']}
                  placeholder='e.g. Cool Team'
                  value={isPublic ? team.team_name : teamName.value}
                  onChangeCallback={(e) => inputTeamName(e.target.value)}
                  validationCallback={() => validateTeamName(teamName)}
                  name='team-name'
                  id={`team-name-${team.id}`}
                />
              </div>
              <p className={styles['title-text']}>
                Created on:{' '}
                {new Date(team.date_created || '').toLocaleString('en-GB', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className={styles['title-text']}>
                Created By: {team.user_name}
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
              htmlFor='title-content'
              label='Description:'
              validationCallback={() => validateDesc(description)}
              textAreaClass={classnames(
                styles['title-content'],
                styles['desc']
              )}
              placeholder='e.g. description'
              name='title-content'
              id={`title-content-${team.id}`}
              value={isPublic ? team.description || '' : description.value}
              onChangeCallback={(e) => setDesc(e.target.value)}
            />
            {!isPublic && (
              <Button
                type='submit'
                disabled={
                  !!validateTeamName(teamName) ||
                  !!validateDesc(description) ||
                  isPublic
                }
                id={`save-team-button-${id}`}
                buttonClass={styles['save-team-button']}
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
          </Form>
          <ExportText
            exportText={'Export Team:'}
            shareText={'Share This Team!'}
            linkPathname={`/share/${team.id}`}
            linkState={{ singleteam: team, sets: teamSets }}
            inputValue={`poketeams.now.sh/share/${team.id}`}
            textAreaId={`export-team-${team.id}`}
            textAreaValue={showdownGenerate(teamSets)}
          />
        </div>
        <div>
          {!isPublic && (
            <Button
              buttonClass={styles['delete']}
              onClickCallback={(e) => {
                e.preventDefault();
                handleDeleteExpand();
              }}
            >
              {deleteClicked ? (
                <span>
                  Cancel <FontAwesomeIcon icon={faBan} />
                </span>
              ) : (
                <span>
                  Delete Team! <FontAwesomeIcon icon={faTrashAlt} />
                </span>
              )}
            </Button>
          )}
          {deleteClicked && !isPublic && (
            <DeleteExpand
              message={"Are You Sure You'd Like to Delete this Team?"}
              yesCallback={() => {
                handleDeleteExpand();
                handleTeamToggle();
                team.id && handleDeleteTeam(team.id);
                customSuccessToast('Team Deleted!');
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
