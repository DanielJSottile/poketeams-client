import React from 'react';
import TeamsListPublicShare from '../TeamList-PublicShare/TeamList-PublicShare';
import './Folder-Public-Share.module.scss';

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

type Props = {
  /** folder that is being shared */
  folder?: Folder;
  /** list of teams  */
  teams?: PokemonTeam[];
  /** list of sets for teams */
  sets?: PokemonSet[];
};

const FolderPublicShare: React.FC<Props> = ({ folder, teams, sets }) => {
  return (
    <>
      <h3>
        <i className="fas fa-folder"></i> {folder?.folder_name}
      </h3>
      <TeamsListPublicShare teams={teams} sets={sets} />
    </>
  );
};

export default FolderPublicShare;
