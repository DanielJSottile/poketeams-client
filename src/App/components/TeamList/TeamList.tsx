import React, { useContext, FunctionComponent } from 'react';
import { PokemonTeam } from '../../@types';
import GeneralContext from '../../contexts/GeneralContext';
import LazyLoader from '../Loaders/LazyLoader';
import Team from '../Team';
import styles from './TeamList.module.scss';
import TeamListPagination from './TeamListPagination';

type TeamListProps = {
  /** determines whether the list is public or private */
  isPublic: boolean;
};

const TeamList: FunctionComponent<TeamListProps> = ({
  isPublic,
}): JSX.Element => {
  const { userTeams, currentClickedFolder, publicTeams } =
    useContext(GeneralContext);

  const publicTeamList = publicTeams.map((team: PokemonTeam) => {
    return <Team isPublic key={team.id} id={`${team.team_name}`} team={team} />;
  });

  const privateTeamList = userTeams
    .filter(
      (team: PokemonTeam) => team.folder_id === Number(currentClickedFolder.id)
    )
    .map((team: PokemonTeam) => {
      return (
        <Team
          isPublic={false}
          id={`${team.team_name}`}
          key={team.id}
          team={team}
        />
      );
    });

  const teamList = isPublic ? publicTeamList : privateTeamList;

  const renderLazyOrMessage = () =>
    isPublic ? (
      <LazyLoader
        containerClass={styles['pokeball-div']}
        messageClass={styles['hint']}
        message={'(Hint: There May Be No Teams)'}
      />
    ) : (
      <h3>
        Either No Folder is Selected Or There Are No Teams! Make Teams with
        Pokemon!
      </h3>
    );

  return (
    <>
      {isPublic && <TeamListPagination />}
      {teamList.length ? teamList : renderLazyOrMessage()}
    </>
  );
};

export default TeamList;
