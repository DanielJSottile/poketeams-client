import React, { FunctionComponent, Dispatch, SetStateAction } from 'react';
import { NumberInput, PokemonSet, TextInput } from '../../../../../@types';
import { numberInputOnChange } from '../../../../../utils/functions';
import {
  validateItem,
  validateAbility,
  validateLevel,
  validateNature,
  validateHappiness,
} from '../../../../../utils/validations';
import Input from '../../../../Input';
import styles from './PokemonDetails.module.scss';

type PokemonDetailsProps = {
  isPublic: boolean;
  set: PokemonSet;
  species: TextInput;
  level: NumberInput;
  item: TextInput;
  ability: TextInput;
  nature: TextInput;
  happiness: NumberInput;
  setLevel: Dispatch<SetStateAction<NumberInput>>;
  setItem: Dispatch<SetStateAction<TextInput>>;
  setAbility: Dispatch<SetStateAction<TextInput>>;
  setNature: Dispatch<SetStateAction<TextInput>>;
  setHappiness: Dispatch<SetStateAction<NumberInput>>;
};

const PokemonDetails: FunctionComponent<PokemonDetailsProps> = ({
  isPublic,
  set,
  species,
  level,
  item,
  ability,
  nature,
  happiness,
  setLevel,
  setItem,
  setAbility,
  setNature,
  setHappiness,
}) => {
  return (
    <div className={styles['first-details']}>
      <Input
        inputHasError={!isPublic}
        isError={species.touched}
        htmlFor={'pokemon-level'}
        label={'Level: '}
        inputClass={styles['pokemon-level']}
        validationCallback={() => validateLevel(level)}
        onChangeCallback={(e) =>
          setLevel({ value: Number(e.target.value), touched: true })
        }
        placeholder='100'
        value={isPublic ? set.level || 100 : level.value}
        type='text'
        name='pokemon-level'
        id={`pokemon-level-${set?.id}`}
        disabled={isPublic}
        readOnly={isPublic}
      />
      <Input
        inputHasError={!isPublic}
        htmlFor={'pokemon-item'}
        label={'Item: (optional)'}
        inputClass={styles['pokemon-item']}
        validationCallback={() => validateItem(item)}
        onChangeCallback={(e) =>
          setItem({ value: e.target.value, touched: true })
        }
        placeholder='e.g. Leftovers'
        value={isPublic ? set.item || '' : item.value}
        type='text'
        name='pokemon-item'
        id={`pokemon-item-${set?.id}`}
        disabled={isPublic}
        readOnly={isPublic}
      />
      <Input
        inputHasError={!isPublic}
        htmlFor={'pokemon-ability'}
        label={'Ability: (optional)'}
        inputClass={styles['pokemon-ability']}
        validationCallback={() => validateAbility(ability)}
        onChangeCallback={(e) =>
          setAbility({ value: e.target.value, touched: true })
        }
        placeholder='e.g. Static'
        value={isPublic ? set.ability || '' : ability.value}
        type='text'
        name='pokemon-ability'
        id={`pokemon-ability-${set?.id}`}
        disabled={isPublic}
        readOnly={isPublic}
      />
      <Input
        inputHasError={!isPublic}
        htmlFor={'pokemon-nature'}
        label={'Nature: (optional)'}
        inputClass={styles['pokemon-nature']}
        validationCallback={() => validateNature(nature)}
        onChangeCallback={(e) =>
          setNature({ value: e.target.value, touched: true })
        }
        placeholder='e.g. Adamant'
        value={isPublic ? set.nature || '' : nature.value}
        type='text'
        name='pokemon-nature'
        id={`pokemon-nature-${set?.id}`}
        disabled={isPublic}
        readOnly={isPublic}
      />
      <Input
        inputHasError={!isPublic}
        isError={happiness.touched}
        htmlFor={'pokemon-happiness'}
        label={'Happiness:'}
        inputClass={styles['pokemon-happiness']}
        validationCallback={() => validateHappiness(happiness)}
        onChangeCallback={(e) => numberInputOnChange(e, setHappiness)}
        placeholder='255'
        value={isPublic ? set.happiness || 255 : happiness.value}
        type='text'
        name='pokemon-happiness'
        min='0'
        max='255'
        id={`pokemon-happiness-${set?.id}`}
        disabled={isPublic}
        readOnly={isPublic}
      />
    </div>
  );
};

export default PokemonDetails;
