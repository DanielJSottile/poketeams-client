import React, { FunctionComponent } from 'react';
import Image from '../../../../Image';
import legality from '../../../../../utils/legality';
import { BoolInput, TextInput } from '../../../../../@types';
import styles from './Sprites.module.scss';

type SpritesProps = {
  species: TextInput;
  shiny: BoolInput;
};

const Sprites: FunctionComponent<SpritesProps> = ({ species, shiny }) => {
  return (
    <div className={styles['sprites']}>
      <Image
        imageClass={styles['sprite-img']}
        src={legality.returnIconSprite(species.value, shiny.value)}
        alt={species.value}
      />
      <div className={styles['type-icons']}>
        {legality
          .returnTypeIcon(legality.returnType(species.value))
          .map((type: string, i: number) => {
            return (
              <Image
                imageClass={styles['type-img']}
                src={`${type}`}
                key={i}
                alt={`${i + 1}`}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Sprites;
