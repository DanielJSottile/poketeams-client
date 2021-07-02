import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TeamPublicShare from '../../components/Team-Public-Share/Team-Public-Share';
import apiService from '../../services/apiService';
import styles from './ShareTeamPage.module.scss';

// Interfaces

export interface Provider {
  team?: any;
  sets?: any;
}

// Component

const ShareTeamPage = (props: any): JSX.Element => {
  // Set State

  const [state, setState] = useState<Provider>();

  // Component LifeCycle

  useEffect(() => {
    const id = props.match.params.team_id;
    apiService
      .getSingleTeam(id)
      .then((data) => {
        setState((oldVals) => ({ ...oldVals, team: [data] }));
      })

      /* Then we get the sets.  It doesn't matter if its done first
    or not.  Before, we were passing it into the public sets, but 
    this was causing a bug.  Instead, we pass these into a new
    special public team share component that just has the one team
    and the one set through props.  */

      .then(() => {
        apiService.getSetsForOneTeam(id).then((data) => {
          setState((oldVals) => ({ ...oldVals, sets: data }));
        });
      });
  }, [props.match.params.team_id]);

  // Final Render

  return (
    <div>
      <Link className={styles['go-back']} to={'/'}>
        Go To PokéTeams <i className="fas fa-home"></i>
      </Link>
      {state?.team[0] ? (
        <TeamPublicShare team={state?.team[0]} sets={state?.sets} />
      ) : (
        <h3>This team seems to not exist anymore</h3>
      )}
    </div>
  );
};

export default ShareTeamPage;
