import React, { useContext, FunctionComponent } from 'react';
import TeamEdit from '../Team-Edit';
import GeneralContext from '../../contexts/GeneralContext';
import { PokemonTeam } from '../../@types';
// import styles from './TeamList-Edit.module.scss';

const TeamListEdit: FunctionComponent = (): JSX.Element => {
  const { userTeams, currentClickedFolder } = useContext(GeneralContext);

  const TeamList = userTeams
    .filter(
      (team: PokemonTeam) => team.folder_id === Number(currentClickedFolder.id)
    )
    .map((team: PokemonTeam, i) => {
      return <TeamEdit id={`${team.team_name}`} key={i} team={team} />;
    });

  return (
    <>
      {TeamList.length > 0 ? (
        TeamList
      ) : (
        <h3>
          Either No Folder is Selected Or There Are No Teams! Make Teams with
          Pokemon!
        </h3>
      )}
    </>
  );
};

export default TeamListEdit;
