import React, {
  useContext,
  FunctionComponent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  PokemonSet,
  TextInput,
  BoolInput,
  NumberInput,
} from '../../../../@types';
import GeneralContext from '../../../../contexts/GeneralContext';
import {
  validateSpecies,
  validateGender,
  validateLevel,
  validateHappiness,
  validateEvs,
  validateIvs,
  validateMoves,
} from '../../../../utils/validations';
import Button from '../../../Button';
import ValidationError from '../../../ValidationError';
import styles from './Details.module.scss';
import PokemonDetails from './PokemonDetails';
import PokemonMoves from './PokemonMoves';
import PokemonValueInputs from './PokemonValueInputs';

type DetailsProps = {
  set: PokemonSet;
  isPublic: boolean;
  species: TextInput;
  nickname: TextInput;
  gender: TextInput;
  shiny: BoolInput;
  gigantamax: BoolInput;
  level: NumberInput;
  item: TextInput;
  ability: TextInput;
  nature: TextInput;
  happiness: NumberInput;
  hpEv: NumberInput;
  atkEv: NumberInput;
  defEv: NumberInput;
  spAEv: NumberInput;
  spDEv: NumberInput;
  speEv: NumberInput;
  hpIv: NumberInput;
  atkIv: NumberInput;
  defIv: NumberInput;
  spAIv: NumberInput;
  spDIv: NumberInput;
  speIv: NumberInput;
  moveOne: TextInput;
  moveTwo: TextInput;
  moveThree: TextInput;
  moveFour: TextInput;
  setLevel: Dispatch<SetStateAction<NumberInput>>;
  setItem: Dispatch<SetStateAction<TextInput>>;
  setAbility: Dispatch<SetStateAction<TextInput>>;
  setNature: Dispatch<SetStateAction<TextInput>>;
  setHappiness: Dispatch<SetStateAction<NumberInput>>;
  setHpEv: Dispatch<SetStateAction<NumberInput>>;
  setAtkEv: Dispatch<SetStateAction<NumberInput>>;
  setDefEv: Dispatch<SetStateAction<NumberInput>>;
  setSpAEv: Dispatch<SetStateAction<NumberInput>>;
  setSpDEv: Dispatch<SetStateAction<NumberInput>>;
  setSpeEv: Dispatch<SetStateAction<NumberInput>>;
  setHpIv: Dispatch<SetStateAction<NumberInput>>;
  setAtkIv: Dispatch<SetStateAction<NumberInput>>;
  setDefIv: Dispatch<SetStateAction<NumberInput>>;
  setSpAIv: Dispatch<SetStateAction<NumberInput>>;
  setSpDIv: Dispatch<SetStateAction<NumberInput>>;
  setSpeIv: Dispatch<SetStateAction<NumberInput>>;
  setMoveOne: Dispatch<SetStateAction<TextInput>>;
  setMoveTwo: Dispatch<SetStateAction<TextInput>>;
  setMoveThree: Dispatch<SetStateAction<TextInput>>;
  setMoveFour: Dispatch<SetStateAction<TextInput>>;
};

const Details: FunctionComponent<DetailsProps> = ({
  set,
  isPublic,
  species,
  nickname,
  gender,
  shiny,
  gigantamax,
  level,
  item,
  ability,
  nature,
  happiness,
  hpEv,
  atkEv,
  defEv,
  spAEv,
  spDEv,
  speEv,
  hpIv,
  atkIv,
  defIv,
  spAIv,
  spDIv,
  speIv,
  moveOne,
  moveTwo,
  moveThree,
  moveFour,
  setLevel,
  setItem,
  setAbility,
  setNature,
  setHappiness,
  setHpEv,
  setAtkEv,
  setDefEv,
  setSpAEv,
  setSpDEv,
  setSpeEv,
  setHpIv,
  setAtkIv,
  setDefIv,
  setSpAIv,
  setSpDIv,
  setSpeIv,
  setMoveOne,
  setMoveTwo,
  setMoveThree,
  setMoveFour,
}) => {
  const { handleUpdateSet } = useContext(GeneralContext);

  const EffortValueArray = [
    {
      isEffortValue: true,
      label: 'HP EV:',
      onChangeCallback: (e: ChangeEvent<HTMLInputElement>) =>
        setHpEv({ value: Number(e.target.value), touched: true }),
      value: isPublic ? set.hp_ev || 0 : hpEv.value,
      name: 'pokemon-ev-hp',
      id: `pokemon-ev-hp-${set?.id}`,
    },
    {
      isEffortValue: true,
      label: 'Atk EV:',
      onChangeCallback: (e: ChangeEvent<HTMLInputElement>) =>
        setAtkEv({ value: Number(e.target.value), touched: true }),
      value: isPublic ? set.atk_ev || 0 : atkEv.value,
      name: 'pokemon-ev-atk',
      id: `pokemon-ev-atk-${set?.id}`,
    },
    {
      isEffortValue: true,
      label: 'Def EV:',
      onChangeCallback: (e: ChangeEvent<HTMLInputElement>) =>
        setDefEv({ value: Number(e.target.value), touched: true }),
      value: isPublic ? set.def_ev || 0 : defEv.value,
      name: 'pokemon-ev-def',
      id: `pokemon-ev-def-${set?.id}`,
    },

    {
      isEffortValue: true,
      label: 'SpA EV:',
      onChangeCallback: (e: ChangeEvent<HTMLInputElement>) =>
        setSpAEv({ value: Number(e.target.value), touched: true }),
      value: isPublic ? set.spa_ev || 0 : spAEv.value,
      name: 'pokemon-ev-spa',
      id: `pokemon-ev-spa-${set?.id}`,
    },
    {
      isEffortValue: true,
      label: 'SpD EV:',
      onChangeCallback: (e: ChangeEvent<HTMLInputElement>) =>
        setSpDEv({ value: Number(e.target.value), touched: true }),
      value: isPublic ? set.spd_ev || 0 : spDEv.value,
      name: 'pokemon-ev-spd',
      id: `pokemon-ev-spd-${set?.id}`,
    },
    {
      isEffortValue: true,
      label: 'Spe EV:',
      onChangeCallback: (e: ChangeEvent<HTMLInputElement>) =>
        setSpeEv({ value: Number(e.target.value), touched: true }),
      value: isPublic ? set.spe_ev || 0 : speEv.value,
      name: 'pokemon-ev-spe',
      id: `pokemon-ev-spe-${set?.id}`,
    },
  ];
  const IndividualValueArray = [
    {
      isEffortValue: false,
      label: 'HP IV:',
      onChangeCallback: (e: ChangeEvent<HTMLInputElement>) =>
        setHpIv({ value: Number(e.target.value), touched: true }),
      value: isPublic ? set.hp_iv || 0 : hpIv.value,
      name: 'pokemon-iv-hp',
      id: `pokemon-iv-hp-${set?.id}`,
    },
    {
      isEffortValue: false,
      label: 'Atk IV:',
      onChangeCallback: (e: ChangeEvent<HTMLInputElement>) =>
        setAtkIv({ value: Number(e.target.value), touched: true }),
      value: isPublic ? set.atk_iv || 0 : atkIv.value,
      name: 'pokemon-iv-atk',
      id: `pokemon-iv-atk-${set?.id}`,
    },
    {
      isEffortValue: false,
      label: 'Def IV:',
      onChangeCallback: (e: ChangeEvent<HTMLInputElement>) =>
        setDefIv({ value: Number(e.target.value), touched: true }),
      value: isPublic ? set.def_iv || 0 : defIv.value,
      name: 'pokemon-iv-def',
      id: `pokemon-iv-def-${set?.id}`,
    },

    {
      isEffortValue: false,
      label: 'SpA IV:',
      onChangeCallback: (e: ChangeEvent<HTMLInputElement>) =>
        setSpAIv({ value: Number(e.target.value), touched: true }),
      value: isPublic ? set.spa_iv || 0 : spAIv.value,
      name: 'pokemon-iv-spa',
      id: `pokemon-iv-spa-${set?.id}`,
    },
    {
      isEffortValue: false,
      label: 'SpD IV:',
      onChangeCallback: (e: ChangeEvent<HTMLInputElement>) =>
        setSpDIv({ value: Number(e.target.value), touched: true }),
      value: isPublic ? set.spd_iv || 0 : spDIv.value,
      name: 'pokemon-iv-spd',
      id: `pokemon-iv-spd-${set?.id}`,
    },
    {
      isEffortValue: false,
      label: 'Spe IV:',
      onChangeCallback: (e: ChangeEvent<HTMLInputElement>) =>
        setSpeIv({ value: Number(e.target.value), touched: true }),
      value: isPublic ? set.spe_iv || 0 : speIv.value,
      name: 'pokemon-iv-spe',
      id: `pokemon-iv-spe-${set?.id}`,
    },
  ];

  return (
    <div className={styles['details']}>
      <PokemonDetails
        isPublic={isPublic}
        set={set}
        species={species}
        level={level}
        item={item}
        ability={ability}
        nature={nature}
        happiness={happiness}
        setLevel={setLevel}
        setItem={setItem}
        setAbility={setAbility}
        setNature={setNature}
        setHappiness={setHappiness}
      />
      <div className={styles['stats']}>
        <div className={styles['evs']}>
          <ValidationError
            errorBoolean={!isPublic}
            validationCallback={() =>
              validateEvs(hpEv, atkEv, defEv, spAEv, spDEv, speEv)
            }
          />
          <PokemonValueInputs
            valueArray={EffortValueArray}
            isPublic={isPublic}
          />
        </div>
        <div className={styles['ivs']}>
          <ValidationError
            errorBoolean={!isPublic}
            validationCallback={() =>
              validateIvs(hpIv, atkIv, defIv, spAIv, spDIv, speIv)
            }
          />
          <PokemonValueInputs
            valueArray={IndividualValueArray}
            isPublic={isPublic}
          />
        </div>
      </div>
      <PokemonMoves
        isPublic={isPublic}
        set={set}
        moveOne={moveOne}
        moveTwo={moveTwo}
        moveThree={moveThree}
        moveFour={moveFour}
        setMoveOne={setMoveOne}
        setMoveTwo={setMoveTwo}
        setMoveThree={setMoveThree}
        setMoveFour={setMoveFour}
      />
      {!isPublic && (
        <Button
          type="submit"
          disabled={
            !!validateSpecies(species) ||
            !!validateGender(gender, species) ||
            !!validateLevel(level) ||
            !!validateHappiness(happiness) ||
            !!validateEvs(hpEv, atkEv, defEv, spAEv, spDEv, speEv) ||
            !!validateIvs(hpIv, atkIv, defIv, spAIv, spDIv, speIv) ||
            !!validateMoves(moveOne, moveTwo, moveThree, moveFour) ||
            isPublic
          }
          id={'save-set-button'}
          buttonClass={styles['save-set-button']}
          onClickCallback={(e) => {
            e.preventDefault();
            handleUpdateSet(
              set?.id,
              nickname.value,
              species.value,
              gender.value,
              shiny.value,
              gigantamax.value,
              item.value,
              ability.value,
              level.value,
              happiness.value,
              nature.value,
              hpEv.value,
              atkEv.value,
              defEv.value,
              spAEv.value,
              spDEv.value,
              speEv.value,
              hpIv.value,
              atkIv.value,
              defIv.value,
              spAIv.value,
              spDIv.value,
              speIv.value,
              moveOne.value,
              moveTwo.value,
              moveThree.value,
              moveFour.value
            );
          }}
        >
          Save Set Details <FontAwesomeIcon icon={faSave} />
        </Button>
      )}
    </div>
  );
};

export default Details;
