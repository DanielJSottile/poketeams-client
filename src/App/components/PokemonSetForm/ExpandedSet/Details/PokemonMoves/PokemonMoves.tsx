import React, { FunctionComponent, Dispatch, SetStateAction } from 'react';
import { PokemonSet, TextInput } from '../../../../../@types';
import Input from '../../../../Input';
import styles from './PokemonMoves.module.scss';

type PokemonMoveProps = {
  set: PokemonSet;
  isPublic: boolean;
  moveOne: TextInput;
  moveTwo: TextInput;
  moveThree: TextInput;
  moveFour: TextInput;
  setMoveOne: Dispatch<SetStateAction<TextInput>>;
  setMoveTwo: Dispatch<SetStateAction<TextInput>>;
  setMoveThree: Dispatch<SetStateAction<TextInput>>;
  setMoveFour: Dispatch<SetStateAction<TextInput>>;
};

const PokemonMoves: FunctionComponent<PokemonMoveProps> = ({
  set,
  isPublic,
  moveOne,
  moveTwo,
  moveThree,
  moveFour,
  setMoveOne,
  setMoveTwo,
  setMoveThree,
  setMoveFour,
}) => {
  return (
    <div className={styles['moves']}>
      <Input
        containerClass={styles['label-direction']}
        inputHasError={false}
        htmlFor={'pokemon-moves'}
        label={'Moves:'}
        inputClass={styles['pokemon-move']}
        placeholder="Tackle"
        value={isPublic ? set.move_one || 'Tackle' : moveOne.value}
        onChangeCallback={(e) =>
          setMoveOne({ value: e.target.value, touched: true })
        }
        type="text"
        name="pokemon-move"
        id={`pokemon-${set?.id}-move-1`}
        disabled={isPublic}
        readOnly={isPublic}
      />
      <Input
        inputHasError={false}
        inputClass={styles['pokemon-move']}
        value={isPublic ? set.move_two || '' : moveTwo.value}
        onChangeCallback={(e) =>
          setMoveTwo({ value: e.target.value, touched: true })
        }
        type="text"
        name="pokemon-move"
        id={`pokemon-${set?.id}-move-2`}
        disabled={isPublic}
        readOnly={isPublic}
      />
      <Input
        inputHasError={false}
        inputClass={styles['pokemon-move']}
        value={isPublic ? set.move_three || '' : moveThree.value}
        onChangeCallback={(e) =>
          setMoveThree({ value: e.target.value, touched: true })
        }
        type="text"
        name="pokemon-move"
        id={`pokemon-${set?.id}-move-3`}
        disabled={isPublic}
        readOnly={isPublic}
      />
      <Input
        inputHasError={false}
        inputClass={styles['pokemon-move']}
        value={isPublic ? set.move_four || '' : moveFour.value}
        onChangeCallback={(e) =>
          setMoveFour({ value: e.target.value, touched: true })
        }
        type="text"
        name="pokemon-move"
        id={`pokemon-${set?.id}-move-4`}
        disabled={isPublic}
        readOnly={isPublic}
      />
    </div>
  );
};

export default PokemonMoves;
