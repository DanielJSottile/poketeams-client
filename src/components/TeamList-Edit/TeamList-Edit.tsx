import React, { Fragment, useContext } from 'react';
import TeamEdit from '../Team-Edit/Team-Edit';
import GeneralContext from '../../contexts/GeneralContext';
// import styles from './TeamList-Edit.module.scss';

// Interfaces

export interface PokemonTeam {
  team_name: string;
  team_description: string;
  description: string;
  id: number;
  user_name: string;
  date_created: string;
  folder_id: number;
}

// Component

const TeamListEdit = (props: any) => {
  // Set Context

  const GenCon = useContext(GeneralContext);

  const { userTeams, currentClickedFolder } = GenCon;

  const TeamList = userTeams
    .filter(
      (team: PokemonTeam) => team.folder_id === Number(currentClickedFolder.id)
    )
    .map((team: PokemonTeam, i) => {
      return (
        <TeamEdit
          //className="btn"
          id={`${team.team_name}`}
          key={i}
          team={team}
        />
      );
    });

  // Final Render

  return (
    <Fragment>
      {TeamList.length > 0 ? (
        TeamList
      ) : (
        <h3>
          Either No Folder is Selected Or There Are No Teams! Make Teams with
          Pokemon!
        </h3>
      )}
    </Fragment>
  );
};

export default TeamListEdit;
