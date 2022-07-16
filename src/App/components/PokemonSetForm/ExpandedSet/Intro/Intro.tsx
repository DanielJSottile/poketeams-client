import React, {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';
import { PokemonSet, TextInput, BoolInput } from '../../../../@types';
import legality from '../../../../utils/legality';
import {
  validateSpecies,
  validateNickname,
  validateGender,
  validateShiny,
  validateGigantamax,
} from '../../../../utils/validations';
import Input from '../../../Input';
import Select from '../../../Select';
import styles from './Intro.module.scss';
import Sprites from './Sprites';

type IntroProps = {
  isPublic: boolean;
  set: PokemonSet;
  species: TextInput;
  nickname: TextInput;
  gender: TextInput;
  shiny: BoolInput;
  gigantamax: BoolInput;
  setSpecies: Dispatch<SetStateAction<TextInput>>;
  setNickname: Dispatch<SetStateAction<TextInput>>;
  setGender: Dispatch<SetStateAction<TextInput>>;
  setShiny: Dispatch<SetStateAction<BoolInput>>;
  setGigantamax: Dispatch<SetStateAction<BoolInput>>;
};

interface Option {
  value: string;
  label: ReactNode;
}

const Intro: FunctionComponent<IntroProps> = ({
  isPublic,
  set,
  species,
  nickname,
  gender,
  shiny,
  gigantamax,
  setSpecies,
  setNickname,
  setGender,
  setShiny,
  setGigantamax,
}) => {
  const createGenderOptions = (species: string): Option[] => {
    if (legality.returnGenderStatus(species) === false) {
      return [
        { value: '', label: 'Male or Female \u2642 / \u2640' },
        { value: 'M', label: 'Male \u2642' },
        { value: 'F', label: 'Female \u2640' },
      ];
    }
    if (legality.returnGenderStatus(species) === 'M') {
      return [
        { value: '', label: '------' },
        { value: 'M', label: 'Male' },
      ];
    }
    if (legality.returnGenderStatus(species) === 'F') {
      return [
        { value: '', label: '------' },
        { value: 'F', label: 'Female' },
      ];
    }
    if (legality.returnGenderStatus(species) === null) {
      return [{ value: '', label: 'No Gender' }];
    }
    return [];
  };

  return (
    <div className={styles['pokemon-intro']}>
      <div className={styles['name-sprite']}>
        <div className={styles['names']}>
          <Input
            inputHasError={!isPublic}
            isError={species.touched}
            htmlFor={'pokemon-name'}
            label={'Species: '}
            inputClass={styles['pokemon-name']}
            validationCallback={() => validateSpecies(species)}
            onChangeCallback={(e) =>
              setSpecies({ value: e.target.value, touched: true })
            }
            placeholder='e.g. Pikachu'
            value={isPublic ? set.species || 'Pikachu' : species.value}
            type='text'
            name='pokemon-name'
            id={`pokemon-name-${set?.id}`}
            disabled={isPublic}
            readOnly={isPublic}
          />
          <Input
            inputHasError={!isPublic}
            isError={species.touched}
            htmlFor={'pokemon-nickname'}
            label={'Nickname: (optional)'}
            inputClass={styles['pokemon-nickname']}
            validationCallback={() => validateNickname(nickname)}
            onChangeCallback={(e) =>
              setNickname({ value: e.target.value, touched: true })
            }
            placeholder={species.value}
            value={isPublic ? set.nickname || '' : nickname.value}
            type='text'
            name='pokemon-nickname'
            id={`pokemon-nickname-${set?.id}`}
            disabled={isPublic}
            readOnly={isPublic}
          />
          <Select
            selectHasError={!isPublic}
            htmlFor={'pokemon-gender'}
            label={'Gender: '}
            selectClass={styles['pokemon-gender']}
            validationCallback={() => validateGender(gender, species)}
            onChangeCallback={(e) =>
              setGender({ value: e.target.value, touched: true })
            }
            value={isPublic ? set.gender || '' : gender.value}
            name='pokemon-gender'
            id={`pokemon-gender-${set?.id}`}
            disabled={isPublic || !legality.isLegalSpecies(species.value)}
            options={createGenderOptions(
              isPublic ? set.species || '' : species.value
            )}
          />
          <Input
            inputHasError={!isPublic}
            isError={species.touched}
            htmlFor={'shiny'}
            label={'Shiny:'}
            validationCallback={() => validateShiny(shiny)}
            onChangeCallback={(e) =>
              setShiny({ value: e.currentTarget.checked, touched: true })
            }
            type='checkbox'
            id='shiny-2'
            name='shiny'
            checked={isPublic ? set.shiny || false : shiny.value}
            value={
              isPublic
                ? (set.shiny || false).toString()
                : shiny.value.toString()
            }
            disabled={isPublic}
            readOnly={isPublic}
          />
          {!!legality.isGigantamaxSpecies(species.value) && (
            <Input
              inputHasError={!isPublic}
              isError={species.touched}
              htmlFor={'gigantamax'}
              label={'Gigantamax:'}
              validationCallback={() => validateGigantamax(gigantamax)}
              onChangeCallback={(e) =>
                setGigantamax({ value: e.currentTarget.checked, touched: true })
              }
              type='checkbox'
              id='gigantamax'
              name='gigantamax'
              checked={isPublic ? set.gigantamax || false : gigantamax.value}
              value={
                isPublic
                  ? (set.gigantamax || false).toString()
                  : gigantamax.value.toString()
              }
              disabled={isPublic}
              readOnly={isPublic}
            />
          )}
        </div>
        <Sprites species={species} shiny={shiny} />
      </div>
    </div>
  );
};

export default Intro;
