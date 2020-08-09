import * as React from 'react';
import { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import SetPublic from '../../components/Set-Public/Set-Public';

export interface Provider {
  set: object[];
}

const ShareSetPage = (props: any): JSX.Element => {

  const [state, setState] = useState<Provider>(); // for useState, we must define the types that can go into it.

  /* This effectively works as ComponentDidMount, and the
  dependency means that it only updates once as long as it
  changes.  */
  
  useEffect(() => {
    apiService.getSingleSet(props.match.params.set_id) // Get the single public set!
      .then(data => {
        setState(oldVals => ({...oldVals, set: [data]}))
      })
  }, [props.match.params.set_id])

    return ( // we use the ? operator to provide optional chaining after 'state'
      <div>
      { state?.set[0] ? <SetPublic set={state?.set[0]}/> : <h3>This set seems to not exist anymore</h3>}
      </div>
    );
};
export default ShareSetPage;