import React, { useState, FunctionComponent } from 'react';
import showdownParse from '../../utils/parse';

import { PokemonSet } from '../../@types';
import ExpandedSet from './ExpandedSet';
import UnexpandedSet from './UnexpandedSet';
import Modal from '../Modal';

type PokemonSetFormProps = {
  /** Pokemon Set */
  set: PokemonSet;
  /** Determines whether the set is public or private */
  isPublic: boolean;
};

const PokemonSetForm: FunctionComponent<PokemonSetFormProps> = ({
  set,
  isPublic,
}) => {
  const handleSetModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [nickname, setNickname] = useState({
    value: set?.nickname || '',
    touched: false,
  });
  const [species, setSpecies] = useState({
    value: set?.species || 'Pikachu',
    touched: false,
  });
  const [gender, setGender] = useState({
    value: set?.gender || '',
    touched: false,
  });
  const [shiny, setShiny] = useState({
    value: set?.shiny || false,
    touched: false,
  });
  const [item, setItem] = useState({ value: set?.item || '', touched: false });
  const [ability, setAbility] = useState({
    value: set?.ability || '',
    touched: false,
  });
  const [level, setLevel] = useState({
    value: set?.level || 100,
    touched: false,
  });
  const [happiness, setHappiness] = useState({
    value: set?.happiness || 255,
    touched: false,
  });
  const [nature, setNature] = useState({
    value: set?.nature || '',
    touched: false,
  });
  const [hpEv, setHpEv] = useState({ value: set?.hp_ev || 0, touched: false });
  const [atkEv, setAtkEv] = useState({
    value: set?.atk_ev || 0,
    touched: false,
  });
  const [defEv, setDefEv] = useState({
    value: set?.def_ev || 0,
    touched: false,
  });
  const [spAEv, setSpAEv] = useState({
    value: set?.spa_ev || 0,
    touched: false,
  });
  const [spDEv, setSpDEv] = useState({
    value: set?.spd_ev || 0,
    touched: false,
  });
  const [speEv, setSpeEv] = useState({
    value: set?.spe_ev || 0,
    touched: false,
  });
  const [hpIv, setHpIv] = useState({ value: set?.hp_iv || 31, touched: false });
  const [atkIv, setAtkIv] = useState({
    value: set?.atk_iv || 31,
    touched: false,
  });
  const [defIv, setDefIv] = useState({
    value: set?.def_iv || 31,
    touched: false,
  });
  const [spAIv, setSpAIv] = useState({
    value: set?.spa_iv || 31,
    touched: false,
  });
  const [spDIv, setSpDIv] = useState({
    value: set?.spd_iv || 31,
    touched: false,
  });
  const [speIv, setSpeIv] = useState({
    value: set?.spe_iv || 31,
    touched: false,
  });
  const [moveOne, setMoveOne] = useState({
    value: set?.move_one || 'Tackle',
    touched: false,
  });
  const [moveTwo, setMoveTwo] = useState({
    value: set?.move_two || '',
    touched: false,
  });
  const [moveThree, setMoveThree] = useState({
    value: set?.move_three || '',
    touched: false,
  });
  const [moveFour, setMoveFour] = useState({
    value: set?.move_four || '',
    touched: false,
  });
  const [expandToggle, setExpandToggle] = useState(true); // remove
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);

  const setFields = (setImport: string) => {
    const parse = showdownParse(setImport)[0];

    setNickname({ value: parse.nickname || '', touched: false });
    setSpecies({ value: parse.species || 'Pikachu', touched: false });
    setGender({ value: parse.gender || '', touched: false });
    setShiny({ value: parse.shiny || false, touched: false });
    setItem({ value: parse.item || '', touched: false });
    setAbility({ value: parse.ability || '', touched: false });
    setLevel({ value: parse.level || 100, touched: false });
    setHappiness({ value: parse.happiness || 255, touched: false });
    setNature({ value: parse.nature || '', touched: false });
    setHpEv({ value: parse.hp_ev || 0, touched: false });
    setAtkEv({ value: parse.atk_ev || 0, touched: false });
    setDefEv({ value: parse.def_ev || 0, touched: false });
    setSpAEv({ value: parse.spa_ev || 0, touched: false });
    setSpDEv({ value: parse.spd_ev || 0, touched: false });
    setSpeEv({ value: parse.spe_ev || 0, touched: false });
    setHpIv({ value: parse.hp_iv || 31, touched: false });
    setAtkIv({ value: parse.atk_iv || 31, touched: false });
    setDefIv({ value: parse.def_iv || 31, touched: false });
    setSpAIv({ value: parse.spa_iv || 31, touched: false });
    setSpDIv({ value: parse.spd_iv || 31, touched: false });
    setSpeIv({ value: parse.spe_iv || 31, touched: false });
    setMoveOne({ value: parse.move_one || 'Tackle', touched: false });
    setMoveTwo({ value: parse.move_two || '', touched: false });
    setMoveThree({ value: parse.move_three || '', touched: false });
    setMoveFour({ value: parse.move_four || '', touched: false });
    setDeleteClicked(false);
  };

  return (
    <>
      <UnexpandedSet set={set} handleSetModal={handleSetModal} />

      <Modal isModalOpen={isModalOpen} handleSetModal={handleSetModal}>
        <ExpandedSet
          set={set}
          isPublic={isPublic}
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
          deleteClicked={deleteClicked}
          setFields={setFields}
          setSpecies={setSpecies}
          setNickname={setNickname}
          setGender={setGender}
          setShiny={setShiny}
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
          setDeleteClicked={setDeleteClicked}
        />
      </Modal>
    </>
  );
};

export default PokemonSetForm;
