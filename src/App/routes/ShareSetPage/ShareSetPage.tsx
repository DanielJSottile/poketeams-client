import React, { FunctionComponent, useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import SetPublic from '../../components/Set-Public/Set-Public';
import apiService from '../../services/apiService';
import styles from './ShareSetPage.module.scss';
import { PokemonSet } from '../../@types';

export type MatchParams = {
  /** match param */
  set_id: string;
};

export interface Provider {
  set: object[];
}

const ShareSetPage: FunctionComponent<RouteComponentProps<MatchParams>> = ({
  match,
}): JSX.Element => {
  const [set, setPokemonSet] = useState([] as PokemonSet[]);

  useEffect(() => {
    apiService.getSingleSet(Number(match.params.set_id)).then((data) => {
      setPokemonSet([data]);
    });
  }, [match.params.set_id]);

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
