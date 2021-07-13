import React, { useState, useEffect, FunctionComponent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import FolderPublicShare from '../../components/Folder-Public-Share/Folder-Public-Share';
import * as array from 'lodash';
import apiService from '../../services/apiService';
import styles from './ShareFolderPage.module.scss';
import { PokemonFolder, PokemonTeam, PokemonSet } from '../../@types';

export type MatchParams = { folder_id: string };

const ShareFolderPage: FunctionComponent<RouteComponentProps<MatchParams>> = ({
  match,
}): JSX.Element => {
  const [folder, setFolder] = useState([] as PokemonFolder[]);
  const [teams, setTeams] = useState([] as PokemonTeam[]);
  const [sets, setSets] = useState([] as PokemonSet[]);

  useEffect(() => {
    const id = match.params.folder_id;
    apiService
      .getSingleFolderPublic(Number(id))
      .then((data) => {
        setFolder([data]);
      })
      .then(() => {
        apiService
          .getTeamsForOneFolder(Number(id))
          .then((data: PokemonTeam[]) => {
            setTeams(data);

            /* Much like adding teams and folders via import, we have to 
              go through the teams and add their sets.  This can be done via
              a Promise Array. */

            const promiseArray = data.map((team: PokemonTeam) => {
              return apiService.getSetsForOneTeam(team.id);
            });

            Promise.all(promiseArray).then((values: PokemonSet[]) => {
              const merged: PokemonSet[] = array.flattenDeep(values);
              setSets(merged);
            });
          });
      });
  }, [match.params.folder_id]);

  return (
    <div>
      <Link className={styles['go-back']} to={'/'}>
        Go To PokéTeams <i className="fas fa-home"></i>
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
