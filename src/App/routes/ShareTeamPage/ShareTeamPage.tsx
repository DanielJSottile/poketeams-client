import React, { useState, useEffect, FunctionComponent } from 'react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import { PokemonTeam, PokemonSet } from '../../@types';
import Team from '../../components/Team';
import apiService from '../../services/apiService';
import styles from './ShareTeamPage.module.scss';

const ShareTeamPage: FunctionComponent = (): JSX.Element => {
  const { team_id } = useParams();
  const [team, setTeam] = useState<PokemonTeam[]>([]);
  const [sets, setPokemonSets] = useState<PokemonSet[]>([]);

  useEffect(() => {
    const id = team_id;
    apiService
      .getSingleTeam(id || '')
      .then((data) => {
        setTeam([data]);
      })
      .then(() => {
        apiService.getSetsForOneTeam(id || '').then((data) => {
          setPokemonSets(data);
        });
      });
  }, [team_id]);

  return (
    <div className={styles['container']}>
      <Link className={styles['go-back']} to={'/'}>
        Go To PokéTeams <FontAwesomeIcon icon={faHome} />
      </Link>
      {team[0] ? (
        <Team
          isPublic
          id={team[0].id.toString()}
          team={team[0]}
          passedTeamSets={sets}
        />
      ) : (
        <h3>This team seems to not exist anymore</h3>
      )}
    </div>
  );
};

export default ShareTeamPage;
