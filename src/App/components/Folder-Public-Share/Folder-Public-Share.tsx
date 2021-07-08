import React from 'react';
import TeamsListPublicShare from '../TeamList-PublicShare/TeamList-PublicShare';
import './Folder-Public-Share.module.scss';
import { PokemonFolder, PokemonTeam, PokemonSet } from '../../@types';

type Props = {
  /** folder that is being shared */
  folder?: PokemonFolder;
  /** list of teams  */
  teams?: PokemonTeam[];
  /** list of sets for teams */
  sets?: PokemonSet[];
};

const FolderPublicShare: React.FC<Props> = ({ folder, teams, sets }) => {
  return (
    <>
      <h3>
        <i className="fas fa-folder"></i> {folder?.folder_name}
      </h3>
      <TeamsListPublicShare teams={teams} sets={sets} />
    </>
  );
};

export default FolderPublicShare;
