import React, { FunctionComponent } from 'react';
import { PokemonTeam, PokemonSet } from '../../@types';
import LazyLoader from '../Loaders/LazyLoader';
import Team from '../Team';
import styles from './TeamListPublicShare.module.scss';

export type TeamListPublicShareProps = {
  /** List of Pokemon Teams */
  teams: PokemonTeam[] | undefined;
  /** List of Pokemon Sets */
  sets: PokemonSet[];
};

/** @todo: remove this eventually */
const TeamListPublicShare: FunctionComponent<TeamListPublicShareProps> = ({
  teams,
  sets,
}): JSX.Element => {
  let TeamList: JSX.Element[] = [];

  if (teams) {
    TeamList = teams?.map((team: PokemonTeam) => {
      const teamSets = sets?.filter((set: PokemonSet) => {
        return set.team_id === team.id;
      });

      return (
        <Team
          isPublic
          key={team.id}
          id={`${team.team_name}`}
          team={team}
          passedTeamSets={teamSets}
        />
      );
    });
  }

  return (
    <>
      {TeamList ? (
        TeamList
      ) : (
        <LazyLoader
          containerClass={styles['pokeball-div']}
          messageClass={styles['hint']}
          message={'(Hint: There May Be No Teams)'}
        />
      )}
    </>
  );
};

export default TeamListPublicShare;
