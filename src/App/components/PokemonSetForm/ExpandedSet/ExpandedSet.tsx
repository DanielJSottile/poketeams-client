import React, {
  useContext,
  FunctionComponent,
  Dispatch,
  SetStateAction,
} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompressArrowsAlt,
  faUpload,
  faCheckCircle,
  faShareSquare,
  faDownload,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../Button';
import Input from '../../Input';
import TextArea from '../../TextArea';
import DeleteExpand from '../../DeleteExpand';
import Intro from './Intro';
import Details from './Details';
import GeneralContext from '../../../contexts/GeneralContext';
import { useClipboard } from '../../../utils/customHooks';
import { validateNewSetImport } from '../../../utils/validations';
import showdownGenerate from '../../../utils/generate';
import { BoolInput, NumberInput, PokemonSet, TextInput } from '../../../@types';
import styles from './ExpandedSet.module.scss';

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

  const { copySuccess, textArea, setCopySuccess, copyCodeToClipboard } =
    useClipboard();

  return (
    <div className={styles['pokemon']}>
      {/* <Button onClickCallback={() => handleSetToggle()}>
        Compress Set <FontAwesomeIcon icon={faCompressArrowsAlt} />
      </Button> */}
      {!isPublic && (
        <form>
          <div className={styles['pokemon-import']}>
            <label htmlFor="pokemon-import">
              Import Pokemon Set: <FontAwesomeIcon icon={faUpload} />
            </label>
            {newSetImport.value !== '' && (
              <p className="error-validate shake-horizontal">
                {validateNewSetImport(newSetImport)}
              </p>
            )}
            <TextArea
              textAreaHasError={false}
              placeholder="Import a Pokemon Showdown Set Here And It Will Re-populate The Field:"
              name="pokemon-import"
              id={`pokemon-import-${set?.id}`}
              value={newSetImport.value}
              onChangeCallback={(e) =>
                setNewSetImport({ value: e.target.value, touched: true })
              }
            />
            <Button
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

      <div className={styles['export-pokemon']}>
        {copySuccess && (
          <div className={styles['copied']}>Copied to Clipboard!!</div>
        )}
        <div>
          <Button
            onClickCallback={() => {
              copyCodeToClipboard();
              setTimeout(() => setCopySuccess(false), 3000);
            }}
          >
            Copy Text
          </Button>
          <Link
            to={{
              pathname: `/share/${set?.team_id}/${set?.id}`,
              state: { singleSet: set },
            }}
            target="_blank"
          >
            Share This Set! <FontAwesomeIcon icon={faShareSquare} />
          </Link>
          <Input
            inputHasError={false}
            type="text"
            readOnly
            value={`poketeams.now.sh/${set?.team_id}/${set?.id}`}
          />
        </div>
        <TextArea
          containerClass={styles['export-pokemon']}
          textAreaHasError
          htmlFor="export-pokemon"
          label="Export Pokemon: "
          labelIcon={<FontAwesomeIcon icon={faDownload} />}
          ref={textArea}
          disabled
          readOnly
          name="export-pokemon"
          id="export-pokemon-2"
          value={showdownGenerate([set])}
        />
      </div>
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
            }}
            noCallback={() => setDeleteClicked(!deleteClicked)}
          />
        )}
      </div>
    </div>
  );
};

export default ExpandedSet;