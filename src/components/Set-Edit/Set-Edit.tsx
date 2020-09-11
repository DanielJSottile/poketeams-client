import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import GeneralContext from '../../contexts/GeneralContext';
import showdownGenerate from '../../functions/generate';
import showdownParse from '../../functions/parse';
import legality from '../../functions/legality';
import LoadingSets from '../Loaders/LoadingSets/LoadingSets';
import './Set-Edit.scss';

// Interfaces

export interface StringInput {
  value: string;
  touched: boolean;
}

export interface IntInput {
  value: number;
  touched: boolean;
}

export interface BoolInput {
  value: boolean;
  touched: boolean;
}

export interface Provider {
  nickname: StringInput;
  species: StringInput;
  gender: StringInput;
  shiny: BoolInput;
  item: StringInput;
  ability: StringInput;
  level: IntInput;
  happiness: IntInput;
  nature: StringInput;
  hp_ev: IntInput;
  atk_ev: IntInput;
  def_ev: IntInput;
  spa_ev: IntInput;
  spd_ev: IntInput;
  spe_ev: IntInput;
  hp_iv: IntInput;
  atk_iv: IntInput;
  def_iv: IntInput;
  spa_iv: IntInput;
  spd_iv: IntInput;
  spe_iv: IntInput;
  move_one: StringInput;
  move_two: StringInput;
  move_three: StringInput;
  move_four: StringInput;
  setExpandToggle: boolean;
  deleteClicked: boolean;
  copySuccess: boolean;
}

// Component

const SetEdit = (props: any) => {

  // Set Context

  const GenCon = useContext(GeneralContext);

  // Set State

  /* We actually do need to have State here, 
  because we are EDITING values from components 
  that there are more than ONE of. However, the
  function to update the form and delete are single
  functions handled in the General Context. */

  const [state, setState] = useState<Provider>({
    nickname: { value: props.set.nickname || '', touched: false },
    species: { value: props.set.species || 'Pikachu', touched: false },
    gender: { value: props.set.gender || '', touched: false },
    shiny: { value: props.set.shiny || false, touched: false },
    item: { value: props.set.item || '', touched: false },
    ability: { value: props.set.ability || '', touched: false },
    level: { value: props.set.level || 100, touched: false },
    happiness: { value: props.set.happiness || 255, touched: false },
    nature: { value: props.set.nature || '', touched: false },
    hp_ev: { value: props.set.hp_ev || 0, touched: false },
    atk_ev: { value: props.set.atk_ev || 0, touched: false },
    def_ev: { value: props.set.def_ev || 0, touched: false },
    spa_ev: { value: props.set.spa_ev || 0, touched: false },
    spd_ev: { value: props.set.spd_ev || 0, touched: false },
    spe_ev: { value: props.set.spe_ev || 0, touched: false },
    hp_iv: { value: props.set.hp_iv || 31, touched: false },
    atk_iv: { value: props.set.atk_iv || 31, touched: false },
    def_iv: { value: props.set.def_iv || 31, touched: false },
    spa_iv: { value: props.set.spa_iv || 31, touched: false },
    spd_iv: { value: props.set.spd_iv || 31, touched: false },
    spe_iv: { value: props.set.spe_iv || 31, touched: false },
    move_one: { value: props.set.move_one || 'Tackle', touched: false },
    move_two: { value: props.set.move_two || '', touched: false },
    move_three: { value: props.set.move_three || '', touched: false },
    move_four: { value: props.set.move_four || '', touched: false },
    setExpandToggle: true,
    deleteClicked: false,
    copySuccess: false,
  });

  // Set State Input Functions

  const setFields = (setImport: any) => {
    const parse = showdownParse(setImport)[0];
    setState((oldVals) => ({
      ...oldVals,
      nickname: { value: parse.nickname || '', touched: false },
      species: { value: parse.species || 'Pikachu', touched: false },
      gender: { value: parse.gender || '', touched: false },
      shiny: { value: parse.shiny || false, touched: false },
      item: { value: parse.item || '', touched: false },
      ability: { value: parse.ability || '', touched: false },
      level: { value: parse.level || 100, touched: false },
      happiness: { value: parse.happiness || 255, touched: false },
      nature: { value: parse.nature || '', touched: false },
      hp_ev: { value: parse.hp_ev || 0, touched: false },
      atk_ev: { value: parse.atk_ev || 0, touched: false },
      def_ev: { value: parse.def_ev || 0, touched: false },
      spa_ev: { value: parse.spa_ev || 0, touched: false },
      spd_ev: { value: parse.spd_ev || 0, touched: false },
      spe_ev: { value: parse.spe_ev || 0, touched: false },
      hp_iv: { value: parse.hp_iv || 31, touched: false },
      atk_iv: { value: parse.atk_iv || 31, touched: false },
      def_iv: { value: parse.def_iv || 31, touched: false },
      spa_iv: { value: parse.spa_iv || 31, touched: false },
      spd_iv: { value: parse.spd_iv || 31, touched: false },
      spe_iv: { value: parse.spe_iv || 31, touched: false },
      move_one: { value: parse.move_one || 'Tackle', touched: false },
      move_two: { value: parse.move_two || '', touched: false },
      move_three: { value: parse.move_three || '', touched: false },
      move_four: { value: parse.move_four || '', touched: false },
      deleteClicked: false,
    }));
  };

  const handleDeleteExpand = () => {
    setState((oldVals) => ({
      ...oldVals,
      deleteClicked: !state.deleteClicked,
    }));
  };

  const handleSetToggle = () => {
    setState((oldVals) => ({
      ...oldVals,
      setExpandToggle: !state.setExpandToggle,
    }));
  };

  const setSpecies = (species: string) => {
    setState((oldVals) => ({
      ...oldVals,
      species: { value: species, touched: true },
    }));
  };

  const setNickname = (nickname: string) => {
    setState((oldVals) => ({
      ...oldVals,
      nickname: { value: nickname, touched: true },
    }));
  };

  const setGender = (gender: string) => {
    setState((oldVals) => ({
      ...oldVals,
      gender: { value: gender, touched: true },
    }));
  };

  const setShiny = () => {
    setState((oldVals) => ({
      ...oldVals,
      shiny: { value: !state.shiny.value, touched: true },
    }));
  };

  const setItem = (item: string) => {
    setState((oldVals) => ({
      ...oldVals,
      item: { value: item, touched: true },
    }));
  };

  const setAbility = (ability: string) => {
    setState((oldVals) => ({
      ...oldVals,
      ability: { value: ability, touched: true },
    }));
  };

  const setLevel = (level: number) => {
    setState((oldVals) => ({
      ...oldVals,
      level: { value: Number(level), touched: true },
    }));
  };

  const setHappiness = (happiness: number) => {
    setState((oldVals) => ({
      ...oldVals,
      happiness: { value: Number(happiness), touched: true },
    }));
  };

  const setNature = (nature: string) => {
    setState((oldVals) => ({
      ...oldVals,
      nature: { value: nature, touched: true },
    }));
  };

  const setHpEv = (hpev: number) => {
    setState((oldVals) => ({
      ...oldVals,
      hp_ev: { value: Number(hpev), touched: true },
    }));
  };

  const setAtkEv = (atkev: number) => {
    setState((oldVals) => ({
      ...oldVals,
      atk_ev: { value: Number(atkev), touched: true },
    }));
  };

  const setDefEv = (defev: number) => {
    setState((oldVals) => ({
      ...oldVals,
      def_ev: { value: Number(defev), touched: true },
    }));
  };

  const setSpAEv = (spaev: number) => {
    setState((oldVals) => ({
      ...oldVals,
      spa_ev: { value: Number(spaev), touched: true },
    }));
  };

  const setSpDEv = (spdev: number) => {
    setState((oldVals) => ({
      ...oldVals,
      spd_ev: { value: Number(spdev), touched: true },
    }));
  };

  const setSpeEv = (speev: number) => {
    setState((oldVals) => ({
      ...oldVals,
      spe_ev: { value: Number(speev), touched: true },
    }));
  };

  const setHpIv = (hpiv: number) => {
    setState((oldVals) => ({
      ...oldVals,
      hp_iv: { value: Number(hpiv), touched: true },
    }));
  };

  const setAtkIv = (atkiv: number) => {
    setState((oldVals) => ({
      ...oldVals,
      atk_iv: { value: Number(atkiv), touched: true },
    }));
  };

  const setDefIv = (defiv: number) => {
    setState((oldVals) => ({
      ...oldVals,
      def_iv: { value: Number(defiv), touched: true },
    }));
  };

  const setSpAIv = (spaiv: number) => {
    setState((oldVals) => ({
      ...oldVals,
      spa_iv: { value: Number(spaiv), touched: true },
    }));
  };

  const setSpDIv = (spdiv: number) => {
    setState((oldVals) => ({
      ...oldVals,
      spd_iv: { value: Number(spdiv), touched: true },
    }));
  };

  const setSpeIv = (speiv: number) => {
    setState((oldVals) => ({
      ...oldVals,
      spe_iv: { value: Number(speiv), touched: true },
    }));
  };

  const setMoveOne = (moveone: string) => {
    setState((oldVals) => ({
      ...oldVals,
      move_one: { value: moveone, touched: true },
    }));
  };

  const setMoveTwo = (movetwo: string) => {
    setState((oldVals) => ({
      ...oldVals,
      move_two: { value: movetwo, touched: true },
    }));
  };

  const setMoveThree = (movethree: string) => {
    setState((oldVals) => ({
      ...oldVals,
      move_three: { value: movethree, touched: true },
    }));
  };

  const setMoveFour = (movefour: string) => {
    setState((oldVals) => ({
      ...oldVals,
      move_four: { value: movefour, touched: true },
    }));
  };

  const removeCopySuccess = (): any => {
    setState((oldVals) => ({ ...oldVals, copySuccess: false }));
  };

  // Copy To Clipboard Functionality

  const textArea: any = React.useRef(null);

  const copyCodeToClipboard = (): any => {
    textArea.current.select();
    document.execCommand('copy'); // this seems to not work
    const text = textArea.current.defaultValue;
    navigator.clipboard.writeText(text); // this seems to work!
    setState((oldVals) => ({ ...oldVals, copySuccess: true }));
  };

  // Validate Input Functions

  const validateNickname = (): any => {
    // Will some day check against Legal Nintendo filter!
    let nickname = state.nickname.value;
    if (typeof nickname !== 'string') {
      return `This is just superflous it should never come up.`;
    }
  };

  const validateItem = (): any => {
    // Will some day check against list of Items!
    let item = state.item.value;
    if (typeof item !== 'string') {
      return `This is just superflous it should never come up.`;
    }
  };

  const validateAbility = (): any => {
    // Will some day check against list of Abilities!
    let ability = state.ability.value;
    if (typeof ability !== 'string') {
      return `This is just superflous it should never come up.`;
    }
  };

  const validateNature = (): any => {
    // Will some day check against list of Natures!
    let nature = state.nature.value;
    if (typeof nature !== 'string') {
      return `This is just superflous it should never come up.`;
    }
  };

  const validateShiny = (): any => {
    // Normally this would be put against a legal Shiny list, but my custom game eliminates this.
    let shiny = state.shiny.value;
    if (typeof shiny !== 'boolean') {
      return `This is just superflous it should never come up.`;
    }
  };

  const validateSpecies = (): any => {
    let species = state.species.value.toString(); // will removing trim solve my problems?
    if (!legality.isLegalSpecies(species)) {
      return `Must be an 'existing' Pokemon species or form styled via '[species]-[form]'!`;
    }
  };

  const validateGender = (): any => {
    // does this work?
    let gender = state.gender.value;
    gender = gender.toString().trim();
    if (legality.returnGenderStatus(state.species.value)) {
      if (gender !== legality.returnGenderStatus(state.species.value)) {
        return `This species is locked to a gender of '${legality.returnGenderStatus(
          state.species.value
        )}'.`;
      }
    }
  };

  const validateLevel = (): any => {
    // in the future, Custom Game might be integrated.  Not sure what the max level is there.
    let level = Number(state.level.value);
    if (level > 100 || level < 1) {
      return `Level must be between 1 and 100`;
    }
  };

  const validateHappiness = (): any => {
    let happiness = Number(state.happiness.value);
    if (happiness > 255 || happiness < 0) {
      return `Hapiness must be between 0 and 255`;
    }
  };

  const validateEvs = () => {
    let flag;
    let hp_ev = Number(state.hp_ev.value);
    let atk_ev = Number(state.atk_ev.value);
    let def_ev = Number(state.def_ev.value);
    let spa_ev = Number(state.spa_ev.value);
    let spd_ev = Number(state.spd_ev.value);
    let spe_ev = Number(state.spe_ev.value);

    let evArr = [hp_ev, atk_ev, def_ev, spa_ev, spd_ev, spe_ev];

    /* While normally EV's can only have 508 (510) in total, 
    because Hackmons is a thing, we don't check this.*/

    evArr.forEach((ev) => {
      if (ev > 252 || ev < 0) {
        flag = `EV's must be set from 0 to 255`;
      }
    });
    return flag;
  };

  const validateIvs = () => {
    let flag;
    let hp_iv = Number(state.hp_iv.value);
    let atk_iv = Number(state.atk_iv.value);
    let def_iv = Number(state.def_iv.value);
    let spa_iv = Number(state.spa_iv.value);
    let spd_iv = Number(state.spd_iv.value);
    let spe_iv = Number(state.spe_iv.value);

    let evArr = [hp_iv, atk_iv, def_iv, spa_iv, spd_iv, spe_iv];

    evArr.forEach((iv) => {
      if (iv > 31 || iv < 0) {
        flag = `IV's must be set from 0 to 31`;
      }
    });
    return flag;
  };

  const validateMoves = (): any => {
    // Every Pokemon has at least 1 move.  Only one we actually need to check for
    let move_one = state.move_one.value;
    let move_two = state.move_two.value;
    let move_three = state.move_three.value;
    let move_four = state.move_four.value;

    if (!move_one) {
      return `Pokemon must have at least ONE move; make sure it is in the top input box.`;
    }

    if (
      typeof move_one !== 'string' ||
      typeof move_two !== 'string' ||
      typeof move_three !== 'string' ||
      typeof move_four !== 'string'
    ) {
      return `This is just superflous it should never come up.`;
    }
  };

  // Render Functions

  const renderExpandedSet = () => {
    const { set } = props;

    const {
      newSetImport,
      setNewSetContents,
      validateNewSetImport,
      handleUpdateSetImport,
      handleUpdateSet,
    } = GenCon;

    return (
      <div className="pokemon">
        <button onClick={() => handleSetToggle()}>
          Compress Set <i className="fas fa-compress-arrows-alt"></i>
        </button>
        <form>
          <div className="pokemon-import">
            <label htmlFor="pokemon-import">
              Import Pokemon Set: <i className="fas fa-upload"></i>
            </label>
            {newSetImport.value !== '' && (
              <p className="error-validate shake-horizontal">
                {validateNewSetImport()}
              </p>
            )}
            <textarea
              placeholder="Import a Pokemon Showdown Set Here And It Will Re-populate The Field:"
              name="pokemon-import"
              id={`pokemon-import-${set.id}`}
              value={newSetImport.value}
              onChange={(e) => setNewSetContents(e.target.value)}
            />
            <button
              type="submit"
              disabled={validateNewSetImport()}
              onClick={(e) => {
                e.preventDefault();
                handleUpdateSetImport(Number(set.id));
                setFields(newSetImport.value);
              }}
            >
              Submit <i className="fas fa-check-circle"></i>
            </button>
          </div>
        </form>
        <form>
          <div className="pokemon-intro">
            <div className="name-sprite">
              <div className="names">
                <label htmlFor="pokemon-name">Species:</label>
                {state.species.touched && (
                  <p className="error-validate shake-horizontal">
                    {validateSpecies()}
                  </p>
                )}
                <input
                  className="pokemon-name"
                  placeholder="e.g. Pikachu"
                  value={state.species.value}
                  onChange={(e) => setSpecies(e.target.value)}
                  type="text"
                  name="pokemon-name"
                  id={`pokemon-name-${set.id}`}
                />
                <label htmlFor="pokemon-nickname">Nickname: (optional)</label>
                {
                  <p className="error-validate shake-horizontal">
                    {validateNickname()}
                  </p>
                }
                <input
                  className="pokemon-nickname"
                  placeholder={state.species.value}
                  value={state.nickname.value}
                  onChange={(e) => setNickname(e.target.value)}
                  type="text"
                  name="pokemon-nickname"
                  id={`pokemon-nickname-${set.id}`}
                />
                <label htmlFor="pokemon-gender">Gender: </label>
                {
                  <p className="error-validate shake-horizontal">
                    {validateGender()}
                  </p>
                }
                <input
                  className="pokemon-gender"
                  placeholder="F, M, or N"
                  value={state.gender.value}
                  onChange={(e) => setGender(e.target.value)}
                  type="text"
                  name="pokemon-gender"
                  id={`pokemon-gender-${set.id}`}
                />
                <div>
                  <label htmlFor="shiny">Shiny:</label>
                  {
                    <p className="error-validate shake-horizontal">
                      {validateShiny()}
                    </p>
                  }
                  <input
                    type="checkbox"
                    id="shiny-2"
                    name="shiny"
                    checked={state.shiny.value}
                    value={state.shiny.value.toString()}
                    onChange={(e) => setShiny()}
                  />
                </div>
              </div>
              <div className="sprites">
                <img
                  className="sprite-img"
                  src={legality.returnIconSprite(
                    state.species.value,
                    state.shiny.value
                  )}
                  alt={state.species.value}
                />
                <div className="type-icons">
                  {legality
                    .returnTypeIcon(legality.returnType(state.species.value))
                    .map((type: any, i: number) => {
                      return (
                        <img
                          className="type-img"
                          src={`${type}`}
                          key={i}
                          alt={`${i + 1}`}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="details">
            <div className="first-details">
              <label htmlFor="pokemon-level">Level: </label>
              {state.species.touched && (
                <p className="error-validate shake-horizontal">
                  {validateLevel()}
                </p>
              )}
              <input
                className="pokemon-level"
                placeholder="100"
                value={state.level.value}
                onChange={(e) => setLevel(Number(e.target.value))}
                type="text"
                name="pokemon-level"
                id={`pokemon-level-${set.id}`}
              />
              <label htmlFor="pokemon-item">Item: (optional)</label>
              {
                <p className="error-validate shake-horizontal">
                  {validateItem()}
                </p>
              }
              <input
                className="pokemon-item"
                placeholder="e.g. Leftovers"
                value={state.item.value}
                onChange={(e) => setItem(e.target.value)}
                type="text"
                name="pokemon-item"
                id={`pokemon-item-${set.id}`}
              />
              <label htmlFor="pokemon-ability">Ability: (optional)</label>
              {
                <p className="error-validate shake-horizontal">
                  {validateAbility()}
                </p>
              }
              <input
                className="pokemon-ability"
                placeholder="e.g. Static"
                value={state.ability.value}
                onChange={(e) => setAbility(e.target.value)}
                type="text"
                name="pokemon-ability"
                id={`pokemon-ability-${set.id}`}
              />
              <label htmlFor="pokemon-nature">Nature: (optional)</label>
              {
                <p className="error-validate shake-horizontal">
                  {validateNature()}
                </p>
              }
              <input
                className="pokemon-nature"
                placeholder="e.g. Adamant"
                value={state.nature.value}
                onChange={(e) => setNature(e.target.value)}
                type="text"
                name="pokemon-nature"
                id={`pokemon-nature-${set.id}`}
              />
              <label htmlFor="pokemon-happiness">Happiness:</label>
              {state.happiness.touched && (
                <p className="error-validate shake-horizontal">
                  {validateHappiness()}
                </p>
              )}
              <input
                className="pokemon-happiness"
                placeholder="255"
                value={state.happiness.value}
                onChange={(e) => setHappiness(Number(e.target.value))}
                type="number"
                name="pokemon-happiness"
                min="0"
                max="255"
                id={`pokemon-happiness-${set.id}`}
              />
            </div>
            <div className="stats">
              <div className="evs">
                {
                  <p className="error-validate shake-horizontal">
                    {validateEvs()}
                  </p>
                }
                <label htmlFor="pokemon-ev-hp">HP EV:</label>
                <input
                  className="pokemon-ev"
                  placeholder="0"
                  value={Number(state.hp_ev.value)}
                  onChange={(e) => setHpEv(Number(e.target.value))}
                  type="number"
                  name="pokemon-ev-hp"
                  min="0"
                  max="252"
                  id={`pokemon-ev-hp-${set.id}`}
                />
                <label htmlFor="pokemon-ev-atk">Atk EV:</label>
                <input
                  className="pokemon-ev"
                  placeholder="0"
                  value={Number(state.atk_ev.value)}
                  onChange={(e) => setAtkEv(Number(e.target.value))}
                  type="number"
                  name="pokemon-ev-atk"
                  min="0"
                  max="252"
                  id={`pokemon-ev-atk-${set.id}`}
                />
                <label htmlFor="pokemon-ev-def">Def EV:</label>
                <input
                  className="pokemon-ev"
                  placeholder="0"
                  value={Number(state.def_ev.value)}
                  onChange={(e) => setDefEv(Number(e.target.value))}
                  type="number"
                  name="pokemon-ev-def"
                  min="0"
                  max="252"
                  id={`pokemon-ev-def-${set.id}`}
                />
                <label htmlFor="pokemon-ev-spa">SpA EV:</label>
                <input
                  className="pokemon-ev"
                  placeholder="0"
                  value={Number(state.spa_ev.value)}
                  onChange={(e) => setSpAEv(Number(e.target.value))}
                  type="number"
                  name="pokemon-ev-spa"
                  min="0"
                  max="252"
                  id={`pokemon-ev-spa-${set.id}`}
                />
                <label htmlFor="pokemon-ev-spd">SpD EV:</label>
                <input
                  className="pokemon-ev"
                  placeholder="0"
                  value={Number(state.spd_ev.value)}
                  onChange={(e) => setSpDEv(Number(e.target.value))}
                  type="number"
                  name="pokemon-ev-spd"
                  min="0"
                  max="252"
                  id={`pokemon-ev-spd-${set.id}`}
                />
                <label htmlFor="pokemon-ev-spe">SpE EV:</label>
                <input
                  className="pokemon-ev"
                  placeholder="0"
                  value={Number(state.spe_ev.value)}
                  onChange={(e) => setSpeEv(Number(e.target.value))}
                  type="number"
                  name="pokemon-ev-spe"
                  min="0"
                  max="252"
                  id={`pokemon-ev-spe-${set.id}`}
                />
              </div>
              <div className="ivs">
                {
                  <p className="error-validate shake-horizontal">
                    {validateIvs()}
                  </p>
                }
                <label htmlFor="pokemon-iv-hp">HP IV:</label>
                <input
                  className="pokemon-iv"
                  placeholder="31"
                  value={Number(state.hp_iv.value)}
                  onChange={(e) => setHpIv(Number(e.target.value))}
                  type="number"
                  name="pokemon-iv-hp"
                  min="0"
                  max="31"
                  id={`pokemon-iv-hp-${set.id}`}
                />
                <label htmlFor="pokemon-iv-atk">Atk IV:</label>
                <input
                  className="pokemon-iv"
                  placeholder="31"
                  value={Number(state.atk_iv.value)}
                  onChange={(e) => setAtkIv(Number(e.target.value))}
                  type="number"
                  name="pokemon-iv-atk"
                  min="0"
                  max="31"
                  id={`pokemon-iv-atk-${set.id}`}
                />
                <label htmlFor="pokemon-iv-def">Def IV:</label>
                <input
                  className="pokemon-iv"
                  placeholder="31"
                  value={Number(state.def_iv.value)}
                  onChange={(e) => setDefIv(Number(e.target.value))}
                  type="number"
                  name="pokemon-iv-def"
                  min="0"
                  max="31"
                  id={`pokemon-iv-def-${set.id}`}
                />
                <label htmlFor="pokemon-iv-spa">SpA IV:</label>
                <input
                  className="pokemon-iv"
                  placeholder="31"
                  value={Number(state.spa_iv.value)}
                  onChange={(e) => setSpAIv(Number(e.target.value))}
                  type="number"
                  name="pokemon-iv-spa"
                  min="0"
                  max="31"
                  id={`pokemon-iv-spa-${set.id}`}
                />
                <label htmlFor="pokemon-iv-spd">SpD IV:</label>
                <input
                  className="pokemon-iv"
                  placeholder="31"
                  value={Number(state.spd_iv.value)}
                  onChange={(e) => setSpDIv(Number(e.target.value))}
                  type="number"
                  name="pokemon-iv-spd"
                  min="0"
                  max="31"
                  id={`pokemon-iv-spd-${set.id}`}
                />
                <label htmlFor="pokemon-iv-spe">SpE IV:</label>
                <input
                  className="pokemon-iv"
                  placeholder="31"
                  value={Number(state.spe_iv.value)}
                  onChange={(e) => setSpeIv(Number(e.target.value))}
                  type="number"
                  name="pokemon-iv-spe"
                  min="0"
                  max="31"
                  id={`pokemon-iv-spe-${set.id}`}
                />
              </div>
            </div>
            <div className="moves">
              <label htmlFor="pokemon-moves">Moves:</label>
              {
                <p className="error-validate shake-horizontal">
                  {validateMoves()}
                </p>
              }
              <input
                className="pokemon-move"
                placeholder="Tackle"
                value={state.move_one.value}
                onChange={(e) => setMoveOne(e.target.value)}
                type="text"
                name="pokemon-move"
                id={`pokemon-${set.id}-move-1`}
              />
              <input
                className="pokemon-move"
                value={state.move_two.value}
                onChange={(e) => setMoveTwo(e.target.value)}
                type="text"
                name="pokemon-move"
                id={`pokemon-${set.id}-move-2`}
              />
              <input
                className="pokemon-move"
                value={state.move_three.value}
                onChange={(e) => setMoveThree(e.target.value)}
                type="text"
                name="pokemon-move"
                id={`pokemon-${set.id}-move-3`}
              />
              <input
                className="pokemon-move"
                value={state.move_four.value}
                onChange={(e) => setMoveFour(e.target.value)}
                type="text"
                name="pokemon-move"
                id={`pokemon-${set.id}-move-4`}
              />
            </div>
            <button
              type="submit"
              disabled={
                validateSpecies() ||
                validateGender() ||
                validateLevel() ||
                validateHappiness() ||
                validateEvs() ||
                validateIvs() ||
                validateMoves()
              }
              onClick={(e) => {
                e.preventDefault();
                handleUpdateSet(
                  set.id,
                  state.nickname.value,
                  state.species.value,
                  state.gender.value,
                  state.shiny.value,
                  state.item.value,
                  state.ability.value,
                  state.level.value,
                  state.happiness.value,
                  state.nature.value,
                  state.hp_ev.value,
                  state.atk_ev.value,
                  state.def_ev.value,
                  state.spa_ev.value,
                  state.spd_ev.value,
                  state.spe_ev.value,
                  state.hp_iv.value,
                  state.atk_iv.value,
                  state.def_iv.value,
                  state.spa_iv.value,
                  state.spd_iv.value,
                  state.spe_iv.value,
                  state.move_one.value,
                  state.move_two.value,
                  state.move_three.value,
                  state.move_four.value
                );
              }}
            >
              Save Set Details <i className="fas fa-save"></i>
            </button>
          </div>
        </form>

        <div className="export-pokemon">
          {state.copySuccess ? (
            <div className="copied">Copied to Clipboard!!</div>
          ) : null}
          <div>
            <button
              onClick={() => {
                copyCodeToClipboard();
                setTimeout(removeCopySuccess, 3000);
              }}
            >
              Copy Text
            </button>
            <Link
              to={{
                pathname: `/share/${set.team_id}/${set.id}`,
                state: { singleSet: set },
              }}
              target="_blank"
            >
              Share This Set! <i className="fas fa-share-square"></i>
            </Link>
            <input
              type="text"
              readOnly
              value={`poketeams.now.sh/${set.team_id}/${set.id}`}
            />
          </div>
          <div className="export-pokemon">
            <label htmlFor="export-pokemon">
              Export Pokemon: <i className="fas fa-download"></i>
            </label>
            <textarea
              ref={textArea}
              readOnly
              name="export-pokemon"
              id="export-pokemon-2"
              value={showdownGenerate([set])}
            />
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              handleDeleteExpand();
            }}
          >
            <i className="fas fa-trash-alt"></i> Delete Set!
          </button>
          {state.deleteClicked ? renderDeleteExpand() : null}
        </div>
      </div>
    );
  };

  const renderUnexpandedSet = () => {
    const { set } = props;

    const types = legality
      .returnTypeIcon(legality.returnType(set.species))
      .map((type: any, i: number) => {
        return (
          <img className="icon" key={i} src={`${type}`} alt={`${i + 1}`} />
        );
      });
    const imgIcon = (
      <img
        className="icon"
        src={legality.returnIconSprite(set.species, set.shiny)}
        alt={set.species}
      />
    );

    return (
      <Fragment>
        <div className="pokemon">
          <div className="closed" onClick={() => handleSetToggle()}>
            <div className="inside">
              {
                imgIcon.props.src ? (
                  imgIcon
                ) : (
                  <LoadingSets />
                ) /* this isn't quite ready yet*/
              }
            </div>
            <div className="inside">
              <span>{set.species}</span>
            </div>
            <div className="inside">
              {types ? types : <LoadingSets /> /* this isn't quite ready yet*/}
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const renderDeleteExpand = () => {
    const { handleDeleteSet } = GenCon;

    return (
      <div>
        <p>Are You Sure You'd Like to Delete this Set?</p>
        <button
          onClick={() => {
            handleDeleteSet(props.set.team_id, props.set.id);
            handleDeleteExpand();
          }}
        >
          Yes <i className="fas fa-thumbs-up"></i>
        </button>
        <button onClick={() => handleDeleteExpand()}>
          No <i className="fas fa-thumbs-down"></i>
        </button>
      </div>
    );
  };

  // Final Render

  return (
    <Fragment>
      {state.setExpandToggle ? renderUnexpandedSet() : renderExpandedSet()}
    </Fragment>
  );
};

export default SetEdit;
