import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import TeamsListPublicShare from '../TeamList-PublicShare';
import './Folder-Public-Share.module.scss';
import { PokemonFolder, PokemonTeam, PokemonSet } from '../../@types';

type FolderPublicShareProps = {
  /** folder that is being shared */
  folder?: PokemonFolder;
  /** list of teams  */
  teams?: PokemonTeam[];
  /** list of sets for teams */
  sets: PokemonSet[];
};

const FolderPublicShare: FunctionComponent<FolderPublicShareProps> = ({
  folder,
  teams,
  sets,
}) => {
  return (
    <>
      <h3>
        <FontAwesomeIcon icon={faFolder} /> {folder?.folder_name}
      </h3>
      <TeamsListPublicShare teams={teams} sets={sets} />
    </>
  );
};

export default FolderPublicShare;
