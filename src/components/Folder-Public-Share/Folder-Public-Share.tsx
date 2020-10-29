import React, { Fragment, lazy } from 'react';
import './Folder-Public-Share.scss';

// Code Splitting

const TeamsListPublicShare = lazy(
  () => import('../TeamList-PublicShare/TeamList-PublicShare')
);

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
