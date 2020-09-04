import React, { Fragment, useContext } from "react";
import GeneralContext from "../../contexts/GeneralContext";
import TeamEdit from "../Team-Edit/Team-Edit";
import "./TeamList-Edit.css";

export interface PokemonTeam {
  team_name: string;
  id: number;
  folder_id: number;
}

const TeamListEdit = (props: any) => {
  const GenCon = useContext(GeneralContext);

  const { userTeams, currentClickedFolder } = GenCon;

  const TeamList = userTeams
    .filter(
      (team: PokemonTeam) => team.folder_id === Number(currentClickedFolder.id)
    )
    .map((team: PokemonTeam, i) => {
      return (
        <TeamEdit
          className="btn"
          id={`${team.team_name}`}
          key={i}
          team={team}
        />
      );
    });

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
