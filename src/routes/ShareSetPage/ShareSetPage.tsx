import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../services/apiService';
import SetPublic from '../../components/Set-Public/Set-Public';
import './ShareSetPage.scss';

// Interfaces

export interface Provider {
  set: object[];
}

// Component

const ShareSetPage = (props: any): JSX.Element => {
  // Set State

  const [state, setState] = useState<Provider>();

  // Component LifeCycle

  useEffect(() => {
    apiService
      .getSingleSet(props.match.params.set_id) // Get the single public set!
      .then((data) => {
        setState((oldVals) => ({ ...oldVals, set: [data] }));
      });
  }, [props.match.params.set_id]);

  // Final Render

  return (
    <div>
      <Link className="go-back" to={'/'}>
        Go To PokéTeams <i className="fas fa-home"></i>
      </Link>
      {state?.set[0] ? (
        <SetPublic set={state?.set[0]} />
      ) : (
        <h3>This set seems to not exist anymore</h3>
      )}
    </div>
  );
};
export default ShareSetPage;
