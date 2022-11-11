import React, { FunctionComponent, useState, useEffect } from 'react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import { PokemonSet } from '../../@types';
import PokemonSetForm from '../../components/PokemonSetForm';
import apiService from '../../services/apiService';
import styles from './ShareSetPage.module.scss';

const ShareSetPage: FunctionComponent = (): JSX.Element => {
  const { set_id } = useParams();
  const [set, setPokemonSet] = useState<PokemonSet | null>(null);

  useEffect(() => {
    apiService.getSingleSet(set_id || '').then((data) => {
      setPokemonSet(data);
    });
  }, [set_id]);

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
