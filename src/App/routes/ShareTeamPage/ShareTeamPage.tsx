import React, { useState, useEffect, FunctionComponent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import TeamPublicShare from '../../components/Team-Public-Share';
import apiService from '../../services/apiService';
import styles from './ShareTeamPage.module.scss';
import { PokemonTeam, PokemonSet } from '../../@types';

export type MatchProps = {
  /** match props */
  team_id: string;
};

const ShareTeamPage: FunctionComponent<RouteComponentProps<MatchProps>> = ({
  match,
}): JSX.Element => {
  const [team, setTeam] = useState<PokemonTeam[]>([]);
  const [sets, setPokemonSets] = useState<PokemonSet[]>([]);

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
    <div className={styles['container']}>
      <Link className={styles['go-back']} to={'/'}>
        Go To PokéTeams <FontAwesomeIcon icon={faHome} />
      </Link>
      {team[0] ? (
        <TeamPublicShare
          team={team[0]}
          id={team[0].id.toString()}
          sets={sets}
        />
      ) : (
        <h3>This team seems to not exist anymore</h3>
      )}
    </div>
  );
};

export default ShareTeamPage;
