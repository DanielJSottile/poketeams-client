import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import TeamPublicShare from '../../components/Team-Public-Share/Team-Public-Share';
import apiService from '../../services/apiService';
import styles from './ShareTeamPage.module.scss';

export type MatchProps = {
  /** match props */
  team_id: string;
};

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

const ShareTeamPage: React.FC<RouteComponentProps<MatchProps>> = ({
  match,
}): JSX.Element => {
  const [team, setTeam] = useState([] as PokemonTeam[]);
  const [sets, setPokemonSets] = useState([] as PokemonSet[]);

  useEffect(() => {
    const id = Number(match.params.team_id);
    apiService
      .getSingleTeam(id)
      .then((data) => {
        setTeam([data]);
      })
      .then(() => {
        apiService.getSetsForOneTeam(id).then((data) => {
          setPokemonSets(data);
        });
      });
  }, [match.params.team_id]);

  return (
    <div>
      <Link className={styles['go-back']} to={'/'}>
        Go To PokéTeams <i className="fas fa-home"></i>
      </Link>
      {team[0] ? (
        <TeamPublicShare team={team[0]} sets={sets} />
      ) : (
        <h3>This team seems to not exist anymore</h3>
      )}
    </div>
  );
};

export default ShareTeamPage;
