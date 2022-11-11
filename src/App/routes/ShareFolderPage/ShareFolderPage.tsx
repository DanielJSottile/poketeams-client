import React, { useState, useEffect, FunctionComponent } from 'react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import { PokemonFolder, PokemonTeam, PokemonSet } from '../../@types';
import FolderPublicShare from '../../components/FolderPublicShare';
import apiService from '../../services/apiService';
import styles from './ShareFolderPage.module.scss';

const ShareFolderPage: FunctionComponent = (): JSX.Element => {
  const { folder_id } = useParams();
  const [folder, setFolder] = useState<PokemonFolder[]>([]);
  const [teams, setTeams] = useState<PokemonTeam[]>([]);
  const [sets, setSets] = useState<PokemonSet[]>([]);

  useEffect(() => {
    const id = folder_id;
    apiService
      .getSingleFolderPublic(id || '')
      .then((data) => {
        setFolder([data]);
      })
      .then(() => {
        apiService
          .getTeamsForOneFolder(id || '')
          .then((data: PokemonTeam[]) => {
            setTeams(data);

            /* Much like adding teams and folders via import, we have to 
              go through the teams and add their sets.  This can be done via
              a Promise Array. */

            const promiseArray = data.map((team: PokemonTeam) => {
              return apiService.getSetsForOneTeam(team.id);
            });

            Promise.all(promiseArray).then((values: PokemonSet[][]) => {
              const merged: PokemonSet[] = values.flat();
              setSets(merged);
            });
          });
      });
  }, [folder_id]);

  return (
    <div className={styles['container']}>
      <Link className={styles['go-back']} to={'/'}>
        Go To PokéTeams <FontAwesomeIcon icon={faHome} />
      </Link>
      {folder[0] ? (
        <FolderPublicShare folder={folder[0]} teams={teams} sets={sets} />
      ) : (
        <h3>This folder seems to not exist anymore</h3>
      )}
    </div>
  );
};

export default ShareFolderPage;
