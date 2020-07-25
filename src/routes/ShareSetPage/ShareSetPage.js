import React, { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import SetPublic from '../../components/Set-Public/Set-Public';

const ShareSetPage = (props) => {

  const [state, setState] = useState({set: []});
  
  useEffect(() => {
    apiService.getSingleSet(props.match.params.set_id) // Get the single public set!
      .then(data => {
        setState(oldVals => ({...oldVals, set: [data]}))
      })
  })

    return (
      <div>
      { state.set[0] ? <SetPublic set={state.set[0]}/> : <h3>This set seems to not exist anymore</h3>}
      </div>
    );
};
export default ShareSetPage;