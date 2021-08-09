import React, {
  useContext,
  FunctionComponent,
  Dispatch,
  SetStateAction,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpload,
  faCheckCircle,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import Button from '../../Button';
import TextArea from '../../TextArea';
import ExportText from '../../ExportText';
import DeleteExpand from '../../DeleteExpand';
import Intro from './Intro';
import Details from './Details';
import GeneralContext from '../../../contexts/GeneralContext';
import { validateNewSetImport } from '../../../utils/validations';
import showdownGenerate from '../../../utils/generate';
import { BoolInput, NumberInput, PokemonSet, TextInput } from '../../../@types';
import styles from './ExpandedSet.module.scss';
import ValidationError from '../../ValidationError';

type ExpandedSetProps = {
  set: PokemonSet;
  isPublic: boolean;
  species: TextInput;
  nickname: TextInput;
  gender: TextInput;
  shiny: BoolInput;
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
  deleteClicked: boolean;
  setFields: (setImport: string) => void;
  setSpecies: Dispatch<SetStateAction<TextInput>>;
  setNickname: Dispatch<SetStateAction<TextInput>>;
  setGender: Dispatch<SetStateAction<TextInput>>;
  setShiny: Dispatch<SetStateAction<BoolInput>>;
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
  setDeleteClicked: Dispatch<SetStateAction<boolean>>;
  setMoveOne: Dispatch<SetStateAction<TextInput>>;
  setMoveTwo: Dispatch<SetStateAction<TextInput>>;
  setMoveThree: Dispatch<SetStateAction<TextInput>>;
  setMoveFour: Dispatch<SetStateAction<TextInput>>;
};

const ExpandedSet: FunctionComponent<ExpandedSetProps> = ({
  set,
  isPublic,
  species,
  nickname,
  gender,
  shiny,
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
  deleteClicked,
  setFields,
  setSpecies,
  setNickname,
  setGender,
  setShiny,
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
  setDeleteClicked,
}): JSX.Element => {
  const {
    newSetImport,
    setNewSetImport,
    handleUpdateSetImport,
    handleDeleteSet,
  } = useContext(GeneralContext);

  const deleteSuccess = () => toast.success('Set Deleted!');

  return (
    <div className={styles['pokemon']}>
      {!isPublic && (
        <form>
          <div className={styles['pokemon-import']}>
            <TextArea
              containerClass={styles['import-width']}
              htmlFor={'pokemon-import'}
              label={'Import Pokemon Set:'}
              labelIcon={<FontAwesomeIcon icon={faUpload} />}
              textAreaHasError
              isError={newSetImport.value !== ''}
              placeholder="Import a Pokemon Showdown Set Here And It Will Re-populate The Field:"
              name="pokemon-import"
              id={`pokemon-import-${set?.id}`}
              value={newSetImport.value}
              onChangeCallback={(e) =>
                setNewSetImport({ value: e.target.value, touched: true })
              }
              validationCallback={() => validateNewSetImport(newSetImport)}
            />
            <Button
              buttonClass={styles['submit']}
              type="submit"
              disabled={!!validateNewSetImport(newSetImport)}
              onClickCallback={(e) => {
                e.preventDefault();
                handleUpdateSetImport(Number(set?.id));
                setFields(newSetImport.value);
              }}
            >
              Submit <FontAwesomeIcon icon={faCheckCircle} />
            </Button>
          </div>
        </form>
      )}
      <form>
        <Intro
          isPublic={isPublic}
          set={set}
          species={species}
          nickname={nickname}
          gender={gender}
          shiny={shiny}
          setSpecies={setSpecies}
          setNickname={setNickname}
          setGender={setGender}
          setShiny={setShiny}
        />
        <Details
          isPublic={isPublic}
          set={set}
          species={species}
          nickname={nickname}
          gender={gender}
          shiny={shiny}
          level={level}
          item={item}
          ability={ability}
          nature={nature}
          happiness={happiness}
          hpEv={hpEv}
          atkEv={atkEv}
          defEv={defEv}
          spAEv={spAEv}
          spDEv={spDEv}
          speEv={speEv}
          hpIv={hpIv}
          atkIv={atkIv}
          defIv={defIv}
          spAIv={spAIv}
          spDIv={spDIv}
          speIv={speIv}
          moveOne={moveOne}
          moveTwo={moveTwo}
          moveThree={moveThree}
          moveFour={moveFour}
          setLevel={setLevel}
          setItem={setItem}
          setAbility={setAbility}
          setNature={setNature}
          setHappiness={setHappiness}
          setHpEv={setHpEv}
          setAtkEv={setAtkEv}
          setDefEv={setDefEv}
          setSpAEv={setSpAEv}
          setSpDEv={setSpDEv}
          setSpeEv={setSpeEv}
          setHpIv={setHpIv}
          setAtkIv={setAtkIv}
          setDefIv={setDefIv}
          setSpAIv={setSpAIv}
          setSpDIv={setSpDIv}
          setSpeIv={setSpeIv}
          setMoveOne={setMoveOne}
          setMoveTwo={setMoveTwo}
          setMoveThree={setMoveThree}
          setMoveFour={setMoveFour}
        />
      </form>
      <ExportText
        exportText={'Export Pokemon:'}
        shareText={'Share This Pokemon Set!'}
        linkPathname={`/share/${set?.team_id}/${set?.id}`}
        linkState={{ singleSet: set }}
        inputValue={`poketeams.now.sh/${set?.team_id}/${set?.id}`}
        textAreaId={`export-pokemon${set.id}`}
        textAreaValue={showdownGenerate([set])}
      />

      <div>
        {!isPublic && (
          <Button
            onClickCallback={() => {
              setDeleteClicked(!deleteClicked);
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
            Delete Set!
          </Button>
        )}
        {!isPublic && deleteClicked && (
          <DeleteExpand
            message={"Are You Sure You'd Like to Delete this Set?"}
            yesCallback={() => {
              handleDeleteSet(set?.team_id || NaN, set?.id || NaN);
              setDeleteClicked(!deleteClicked);
              deleteSuccess();
            }}
            noCallback={() => setDeleteClicked(!deleteClicked)}
          />
        )}
      </div>
    </div>
  );
};

export default ExpandedSet;
