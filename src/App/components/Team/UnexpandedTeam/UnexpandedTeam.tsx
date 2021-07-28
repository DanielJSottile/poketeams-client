import React, { FunctionComponent } from 'react';
import Image from '../../Image';
import legality from '../../../utils/legality';
import { PokemonSet, PokemonTeam } from '../../../@types';
import styles from './UnexpandedTeam.module.scss';

type UnexpandedTeamProps = {
  id: string;
  team: PokemonTeam;
  teamSets: PokemonSet[];
  handleTeamToggle: () => void;
};
const UnexpandedTeam: FunctionComponent<UnexpandedTeamProps> = ({
  id,
  team,
  teamSets,
  handleTeamToggle,
}) => {
  const spriteMap = teamSets.map((set, i) => {
    return (
      <Image
        key={i}
        imageClass={styles['tiny-icon']}
        src={legality.returnIconSprite(set.species, set.shiny)}
        alt={set.species}
      />
    );
  });

  return (
    <section className={styles['team-section']} id={`${id}`}>
      <div
        role="button"
        tabIndex={0}
        className={styles['team-closed']}
        onClick={() => handleTeamToggle()}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === 'Space') {
            handleTeamToggle();
          }
        }}
      >
        <div>
          <h3>{team.team_name}</h3>
        </div>
        <div>
          <p>By {team.user_name}</p>
          <div className={styles['sprites-row']}>{spriteMap}</div>
          <p>
            Created on:{' '}
            {new Date(team.date_created || '').toLocaleString('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default UnexpandedTeam;
