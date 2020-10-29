import React, { Fragment } from 'react';
import TeamsListPublicShare from '../TeamList-PublicShare/TeamList-PublicShare';
import './Folder-Public-Share.scss';

const FolderPublicShare = (props: any) => {
  // Final Render

  return (
    <Fragment>
      <h3>
        <i className="fas fa-folder"></i> {props?.folder?.folder_name}
      </h3>
      <TeamsListPublicShare teams={props.teams} sets={props.sets} />
    </Fragment>
  );
};

export default FolderPublicShare;
