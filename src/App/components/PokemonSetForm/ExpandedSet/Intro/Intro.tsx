import React, { FunctionComponent, Dispatch, SetStateAction } from 'react';
import Input from '../../../Input';
import Sprites from './Sprites';
import {
  validateSpecies,
  validateNickname,
  validateGender,
  validateShiny,
} from '../../../../utils/validations';
import { PokemonSet, TextInput, BoolInput } from '../../../../@types';
import styles from './Intro.module.scss';

type IntroProps = {
  isPublic: boolean;
  set: PokemonSet;
  species: TextInput;
  nickname: TextInput;
  gender: TextInput;
  shiny: BoolInput;
  setSpecies: Dispatch<SetStateAction<TextInput>>;
  setNickname: Dispatch<SetStateAction<TextInput>>;
  setGender: Dispatch<SetStateAction<TextInput>>;
  setShiny: Dispatch<SetStateAction<BoolInput>>;
};

const Intro: FunctionComponent<IntroProps> = ({
  isPublic,
  set,
  species,
  nickname,
  gender,
  shiny,
  setSpecies,
  setNickname,
  setGender,
  setShiny,
}) => {
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
            placeholder="e.g. Pikachu"
            value={isPublic ? set.species || 'Pikachu' : species.value}
            type="text"
            name="pokemon-name"
            id={`pokemon-name-${set?.id}`}
            disabled={isPublic}
            readOnly={isPublic}
          />
          <Input
            inputHasError={!isPublic}
            isError={species.touched}
            htmlFor={'pokemon-nickname'}
            label={'Nickname: (optional)'}
            inputClass={styles['pokemon-name']}
            validationCallback={() => validateNickname(nickname)}
            onChangeCallback={(e) =>
              setNickname({ value: e.target.value, touched: true })
            }
            placeholder={species.value}
            value={isPublic ? set.nickname || '' : nickname.value}
            type="text"
            name="pokemon-nickname"
            id={`pokemon-nickname-${set?.id}`}
            disabled={isPublic}
            readOnly={isPublic}
          />
          <Input
            inputHasError={!isPublic}
            htmlFor={'pokemon-gender'}
            label={'Gender: '}
            inputClass={styles['pokemon-gender']}
            validationCallback={() => validateGender(gender, species)}
            onChangeCallback={(e) =>
              setGender({ value: e.target.value, touched: true })
            }
            placeholder="F, M, or N"
            value={isPublic ? set.gender || '' : gender.value}
            type="text"
            name="pokemon-gender"
            id={`pokemon-gender-${set?.id}`}
            disabled={isPublic}
            readOnly={isPublic}
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
            type="checkbox"
            id="shiny-2"
            name="shiny"
            checked={isPublic ? set.shiny || false : shiny.value}
            value={
              isPublic
                ? (set.shiny || false).toString()
                : shiny.value.toString()
            }
            disabled={isPublic}
            readOnly={isPublic}
          />
        </div>
        <Sprites species={species} shiny={shiny} />
      </div>
    </div>
  );
};

export default Intro;
