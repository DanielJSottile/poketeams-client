import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import FolderPublicShare from '../../components/Folder-Public-Share/Folder-Public-Share';
import * as array from 'lodash';
import apiService from '../../services/apiService';
import styles from './ShareFolderPage.module.scss';

export type MatchParams = { folder_id: string };

interface Folder {
  date_created: string;
  date_modified: string;
  folder_name: string;
  id: number;
  user_id: number;
}

export interface PokemonTeam {
  team_name: string;
  team_description: string;
  description: string;
  id: number;
  user_name: string;
  date_created: string;
  folder_id: number;
}

export interface PokemonSet {
  nickname: string;
  species: string;
  gender: string;
  shiny: boolean;
  item: string;
  ability: string;
  level: number;
  happiness: number;
  nature: string;
  hp_ev: number;
  atk_ev: number;
  def_ev: number;
  spa_ev: number;
  spd_ev: number;
  spe_ev: number;
  hp_iv: number;
  atk_iv: number;
  def_iv: number;
  spa_iv: number;
  spd_iv: number;
  spe_iv: number;
  move_one: string;
  move_two: string;
  move_three: string;
  move_four: string;
  setExpandToggle: boolean;
  deleteClicked: boolean;
  copySuccess: boolean;
  id: number;
  team_id: number;
}

const ShareFolderPage: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}): JSX.Element => {
  // Set State

  // const [state, setState] = useState<Provider>();
  const [folder, setFolder] = useState([] as Folder[]);
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
        apiService.getTeamsForOneFolder(Number(id)).then((data: any) => {
          setTeams(data);

          /* Much like adding teams and folders via import, we have to 
              go through the teams and add their sets.  This can be done via
              a Promise Array. */

          const promiseArray = data.map((team: any) => {
            return apiService.getSetsForOneTeam(team.id);
          });

          Promise.all(promiseArray).then((values: any) => {
            const merged: PokemonSet[] = array.flattenDeep(values);
            setSets(merged);
          });
        });
      });
  }, [match.params.folder_id]);

  // Final Render

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
