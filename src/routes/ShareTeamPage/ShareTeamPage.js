import React, { useContext, useState, useEffect } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import apiService from '../../services/apiService';
import TeamPublic from '../../components/Team-Public/Team-Public';

const ShareTeamPage = (props) => {

  const GenCon = useContext(GeneralContext);

  const [state, setState] = useState({team: []});

  const {addPublicSets} = GenCon;

  /* This acts as our ComponentDidMount that gets the team
  specified in the url parameter.*/

  useEffect(() => {
    apiService.getSingleTeam(props.match.params.team_id)
      .then(data => {
        setState(oldVals => ({...oldVals, team: [data]}))
    })

    /* We'll need to get the sets now because they may or may not be 
    in the public teams at the moment (statistically almost 0 chance). 
    The dependencies make sure it only updates 1 time.  */

      .then(() => {
     apiService.getSetsForOneTeam(props.match.params.team_id)
      .then(data => {
        addPublicSets(data)
      })
    })
  }, [props.match.params.team_id, addPublicSets]); 

    return (
      
      <div>
       { state.team[0] ? <TeamPublic team={state.team[0]}/> : <h3>This team seems to not exist anymore</h3>}
      </div>
    );
};

export default ShareTeamPage;
