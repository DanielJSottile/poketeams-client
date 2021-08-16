import React, { FunctionComponent } from 'react';
import TeamPublicShare from '../Team-Public-Share';
import LazyLoader from '../Loaders/LazyLoader';
import styles from './TeamList-PublicShare.module.scss';
import { PokemonTeam, PokemonSet } from '../../@types';

export type TeamListPublicShareProps = {
  /** List of Pokemon Teams */
  teams: PokemonTeam[] | undefined;
  /** List of Pokemon Sets */
  sets: PokemonSet[];
};

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
        <TeamPublicShare
          key={team.id}
          id={`${team.team_name}`}
          team={team}
          sets={teamSets}
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
