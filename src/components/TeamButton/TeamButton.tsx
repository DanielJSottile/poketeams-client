import React, { useContext } from "react";
import GeneralContext from "../../contexts/GeneralContext";
import "./TeamButton.css";

const TeamButton = (props: any) => {
  const GenCon = useContext(GeneralContext);

  const { handleCurrentTeamClicked } = GenCon;

  // For now, the Link doesnt go to the anchor because the hash looks disgusting.
  return (
    <a
      href={`#${props.team_name}`}
      className="btn"
      id={props.id}
      onClick={(e) => {
        e.preventDefault();
        handleCurrentTeamClicked(props.team_name, props.id);
      }}
    >
      <i className="fas fa-layer-group"></i> {props.team_name}
    </a>
  );
};

export default TeamButton;
