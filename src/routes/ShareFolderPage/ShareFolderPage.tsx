import React, { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import FolderPublicShare from '../../components/Folder-Public-Share/Folder-Public-Share';
import './ShareFolderPage.css';

export interface Provider {
  folder?: any;
  teams?: any;
  sets?: any;
}

const ShareFolderPage = (props: any): JSX.Element => {
  const [state, setState] = useState<Provider>();

  /* This acts as our ComponentDidMount that gets the team
  specified in the url parameter.*/

  useEffect(() => {
    const id = props.match.params.folder_id;
    apiService
      .getSingleFolderPublic(id)
      .then((data: any) => {
        setState((oldVals) => ({ ...oldVals, folder: [data] }));
      })
      .then(() => {
        apiService
          .getTeamsForOneFolder(id)
          .then((data: any) => {
            setState((oldVals) => ({ ...oldVals, teams: data }));

            /* Much like adding teams and folders via import, we have to 
              go through the teams and add their sets.  This can be done via
              a Promise Array. */

            const promiseArray = data.map((team: any) => {
              return apiService.getSetsForOneTeam(team.id);
          })

            Promise.all(promiseArray)
              .then((values: any) => {
                // this comes back as an array of arrays.  we need one array of objects
                let merged = [].concat.apply([], values)
                // we could also use values.flat() but this breaks in I.E.
                setState((oldVals) => ({...oldVals, sets: merged}))
              })
          })
      })   
  }, [props.match.params.folder_id]);

  return (
    <div>
      {state?.folder[0] ? (
        <FolderPublicShare folder={state?.folder[0]} teams={state?.teams} sets={state?.sets} />
      ) : (
        <h3>This folder seems to not exist anymore</h3>
      )}
    </div>
  );
};

export default ShareFolderPage;
