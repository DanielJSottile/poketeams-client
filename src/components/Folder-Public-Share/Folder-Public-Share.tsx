import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import showdownGenerate from '../../functions/generate';
import TeamsListPublicShare from '../TeamList-PublicShare/TeamList-PublicShare';
import './Folder-Public-Share.css';

const FolderPublicShare = (props: any) => {
  return (
    <Fragment>
      <h3><i className="fas fa-folder"></i> {props.folder.folder_name}</h3>
      <TeamsListPublicShare teams={props.teams} sets={props.sets}/>
    </Fragment>
  );
};

export default FolderPublicShare;
