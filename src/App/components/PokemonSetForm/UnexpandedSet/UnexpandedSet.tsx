import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus, faStar } from '@fortawesome/free-solid-svg-icons';
import Image from '../../Image';
import legality from '../../../utils/legality';
import { PokemonSet } from '../../../@types';
import gmaxIcon from '../../../Images/gmax-icon.png';
import megaEvolutionIcon from '../../../Images/mega-evolution.png';
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
    .map((type: string) => {
      return (
        <Image
          imageClass={styles['type-img']}
          key={`${new Date().getTime()}-${type}`}
          src={`${type}`}
          alt={`${type}-icon`}
        />
      );
    });

  const findSpeciesGender = (set: PokemonSet) => {
    if (!set.gender) {
      return legality.returnGenderStatus(set.species);
    }

    return set.gender;
  };

  const renderGender = (set: PokemonSet) => {
    if (findSpeciesGender(set) === false) {
      return (
        <span>
          <FontAwesomeIcon icon={faMars} className={styles['male']} /> /{' '}
          <FontAwesomeIcon icon={faVenus} className={styles['female']} />
        </span>
      );
    }

    if (findSpeciesGender(set) === 'F') {
      return (
        <span>
          <FontAwesomeIcon icon={faVenus} className={styles['female']} />
        </span>
      );
    }

    if (findSpeciesGender(set) === 'M') {
      return (
        <span>
          <FontAwesomeIcon icon={faMars} className={styles['male']} />
        </span>
      );
    }

    return null;
  };

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
            <span className={styles['italic']}>{set.nickname || ''}</span>
            <div className={styles['species-row']}>
              <span>{set.species || ''} </span>
              {legality.isMegaEvolution(set.species) && (
                <Image
                  src={megaEvolutionIcon}
                  alt={'mega-evolution-icon'}
                  imageClass={styles['mega-icon']}
                />
              )}
              {(set.gigantamax || legality.isGigantamaxForm(set.species)) && (
                <Image
                  src={gmaxIcon}
                  alt={'gigantamax-icon'}
                  imageClass={styles['gmax-icon']}
                />
              )}
              {set.shiny && (
                <FontAwesomeIcon icon={faStar} className={styles['shiny']} />
              )}
            </div>

            <span>
              Lv. {set.level} {renderGender(set)}
            </span>
          </div>
          <div className={styles['inside']}>{types}</div>
        </div>
      </div>
    </>
  );
};

export default UnexpandedSet;
