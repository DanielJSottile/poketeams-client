import React, { Fragment, FunctionComponent } from 'react';
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
    TeamList = teams?.map((team: PokemonTeam, i: number) => {
      const teamSets = sets?.filter((set: PokemonSet) => {
        return set.team_id === team.id;
      });

      return (
        <TeamPublicShare
          key={i}
          id={`${team.team_name}`}
          team={team}
          sets={teamSets}
        />
      );
    });
  }

  return (
    <Fragment>
      {TeamList ? (
        TeamList
      ) : (
        <LazyLoader
          containerClass={styles['pokeball-div']}
          messageClass={styles['hint']}
          message={'(Hint: There May Be No Teams)'}
        />
      )}
    </Fragment>
  );
};

export default TeamListPublicShare;
