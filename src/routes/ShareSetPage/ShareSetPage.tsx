import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import SetPublic from '../../components/Set-Public/Set-Public';
import apiService from '../../services/apiService';
import styles from './ShareSetPage.module.scss';

export type MatchParams = {
  /** match param */
  set_id: string;
};

export interface Provider {
  set: object[];
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

// Component

const ShareSetPage: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}): JSX.Element => {
  // Set State

  // const [state, setState] = useState<Provider>();
  const [set, setPokemonSet] = useState([] as PokemonSet[]);

  // Component LifeCycle

  useEffect(() => {
    apiService
      .getSingleSet(Number(match.params.set_id)) // Get the single public set!
      .then((data) => {
        setPokemonSet([data]);
      });
  }, [match.params.set_id]);

  // Final Render

  return (
    <div>
      <Link className={styles['go-back']} to={'/'}>
        Go To PokéTeams <i className="fas fa-home"></i>
      </Link>
      {set[0] ? (
        <SetPublic set={set[0]} />
      ) : (
        <h3>This set seems to not exist anymore</h3>
      )}
    </div>
  );
};
export default ShareSetPage;
