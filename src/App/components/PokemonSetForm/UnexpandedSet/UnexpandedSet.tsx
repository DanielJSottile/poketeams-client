import React, { FunctionComponent } from 'react';
import Image from '../../Image';
import legality from '../../../utils/legality';
import { PokemonSet } from '../../../@types';
import styles from './UnexpandedSet.module.scss';

type UnexpandedSetProps = {
  set: PokemonSet;
  handleSetModal: () => void;
};

const UnexpandedSet: FunctionComponent<UnexpandedSetProps> = ({
  set,
  handleSetModal,
}): JSX.Element => {
  const types = legality
    .returnTypeIcon(legality.returnType(set?.species || ''))
    .map((type: string, i: number) => {
      return (
        <Image
          imageClass={styles['type-img']}
          key={i}
          src={`${type}`}
          alt={`${i + 1}`}
        />
      );
    });

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className={styles['pokemon']}
        onClick={() => handleSetModal()}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === 'Space') {
            handleSetModal();
          }
        }}
      >
        <div className={styles['closed']}>
          <div className={styles['inside']}>
            <Image
              imageClass={styles['icon']}
              src={legality.returnIconSprite(set.species, set.shiny)}
              alt={set.species}
            />
          </div>
          <div className={styles['inside']}>
            <span>{set?.species || ''}</span>
          </div>
          <div className={styles['inside']}>{types}</div>
        </div>
      </div>
    </>
  );
};

export default UnexpandedSet;
