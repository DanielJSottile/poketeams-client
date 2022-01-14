import React, { FunctionComponent, useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import PokemonSetForm from '../../components/PokemonSetForm';
import apiService from '../../services/apiService';
import styles from './ShareSetPage.module.scss';
import { PokemonSet } from '../../@types';

export type MatchParams = {
  /** match param */
  set_id: string;
};

const ShareSetPage: FunctionComponent<RouteComponentProps<MatchParams>> = ({
  match,
}): JSX.Element => {
  const [set, setPokemonSet] = useState<PokemonSet | null>(null);

  useEffect(() => {
    apiService.getSingleSet(Number(match.params.set_id)).then((data) => {
      setPokemonSet(data);
    });
  }, [match.params.set_id]);

  return (
    <div className={styles['container']}>
      <Link className={styles['go-back']} to={'/'}>
        Go To PokéTeams <FontAwesomeIcon icon={faHome} />
      </Link>
      {set ? (
        <div className={styles['set-list-grid']}>
          <PokemonSetForm set={set} isPublic />
        </div>
      ) : (
        <h3>This set seems to not exist anymore</h3>
      )}
    </div>
  );
};
export default ShareSetPage;
