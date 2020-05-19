import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import showdownGenerate from '../../functions/generate';
import legality from '../../functions/legality';

export default class Set extends Component {

  static contextType = UserContext;

  /* We actually do need to have State here, 
  because we are EDITING values from components 
  that there are more than ONE of. However, the
  function to update the form and delete are single
  functions handled in the App.js. */

  state = {
    nickname: {value: this.props.set.nickname || '', touched: false},
    species: {value: this.props.set.species || 'Pikachu', touched: false},
    gender: {value: this.props.set.gender || '', touched: false},
    shiny: {value: this.props.set.shiny || false, touched: false},
    item: {value: this.props.set.item || '', touched: false},
    ability: {value: this.props.set.ability || '', touched: false},
    level: {value: this.props.set.level || 100, touched: false},
    happiness: {value: this.props.set.happiness || 255, touched: false},
    nature: {value: this.props.set.nature || '', touched: false},
    hp_ev: {value: this.props.set.hp_ev || 0, touched: false},
    atk_ev: {value: this.props.set.atk_ev || 0, touched: false},
    def_ev: {value: this.props.set.def_ev || 0, touched: false},
    spa_ev: {value: this.props.set.spa_ev || 0, touched: false},
    spd_ev: {value: this.props.set.spd_ev || 0, touched: false},
    spe_ev: {value: this.props.set.spe_ev || 0, touched: false},
    hp_iv: {value: this.props.set.hp_iv || 31, touched: false},
    atk_iv: {value: this.props.set.atk_iv || 31, touched: false},
    def_iv: {value: this.props.set.def_iv || 31, touched: false},
    spa_iv: {value: this.props.set.spa_iv || 31, touched: false},
    spd_iv: {value: this.props.set.spd_iv || 31, touched: false},
    spe_iv: {value: this.props.set.spe_iv || 31 , touched: false},
    move_one: {value: this.props.set.move_one || 'Tackle', touched: false},
    move_two: {value: this.props.set.move_two || '', touched: false},
    move_three: {value: this.props.set.move_three || '', touched: false},
    move_four: {value: this.props.set.move_four || '', touched: false},
  }

  /* Since we have State here, the setting and validating of these 
  Must be set in here.  Or at least, it's easier to do it that way.*/


  setSpecies = species => {
    this.setState({species: {value: species, touched: true}});
  };

  setNickname = nickname => {
    this.setState({nickname: {value: nickname, touched: true}});
  };

  setGender = gender => {
    this.setState({gender: {value: gender, touched: true}});
  };

  setShiny = () => {
    this.setState({shiny: {value: !this.state.shiny.value}});
  };

  setItem = item => {
    this.setState({item: {value: item, touched: true}});
  };

  setAbility = ability => {
    this.setState({ability: {value: ability, touched: true}});
  };

  setLevel = level => {
    this.setState({level: {value: level, touched: true}});
  };

  setHappiness = happiness => {
    this.setState({happiness: {value: happiness, touched: true}});
  };

  setNature = nature => {
    this.setState({nature: {value: nature, touched: true}});
  };

  setHpEv = hpev => {
    this.setState({hp_ev: {value: hpev, touched: true}});
  };

  setAtkEv = atkev => {
    this.setState({atk_ev: {value: atkev, touched: true}});
  };

  setDefEv = defev => {
    this.setState({def_ev: {value: defev, touched: true}}); 
  };

  setSpAEv = spaev => {
    this.setState({spa_ev: {value: spaev, touched: true}});
  };

  setSpDEv = spdev => {
    this.setState({spd_ev: {value: spdev, touched: true}});  
  };

  setSpeEv = speev => {
    this.setState({spe_ev: {value: speev, touched: true}});
  };

  setHpIv = hpiv => {
    this.setState({hp_iv: {value: hpiv, touched: true}});
  };

  setAtkIv = atkiv => {
    this.setState({atk_iv: {value: atkiv, touched: true}});
  };

  setDefIv = defiv => {
    this.setState({def_iv: {value: defiv, touched: true}}); 
  };

  setSpAIv = spaiv => {
    this.setState({spa_iv: {value: spaiv, touched: true}}); 
  };

  setSpDIv = spdiv => {
    this.setState({spd_iv: {value: spdiv, touched: true}}); 
  };

  setSpeIv = speiv => {
    this.setState({spe_iv: {value: speiv, touched: true}});
  };

  setMoveOne = moveone => {
    this.setState({move_one: {value: moveone, touched: true}});
  };

  setMoveTwo = movetwo => {
    this.setState({move_two: {value: movetwo, touched: true}});
  };

  setMoveThree = movethree => {
    this.setState({move_three: {value: movethree, touched: true}});
  };

  setMoveFour = movefour => {
    this.setState({move_four: {value: movefour, touched: true}});
  };

  // Validate Inputs

  /* We only need to validate things that are necessary.  However, we
  should still check that things are the correct value type (eventually
  may convert the entire site to Typescript to fix this?)*/

  validateNickname = () => { // Will some day check against Legal Nintendo filter!
    let nickname = this.state.nickname.value;
    if (typeof(nickname) !== 'string') {
      return `This is just superflous it should never come up.`
    };
  };

  validateItem = () => { // Will some day check against list of Items!
    let item = this.state.item.value;
    if (typeof(item) !== 'string') {
      return `This is just superflous it should never come up.`
    };
  };

  validateAbility = () => { // Will some day check against list of Abilities!
    let ability = this.state.ability.value;
    if (typeof(ability) !== 'string') {
      return `This is just superflous it should never come up.`
    };
  };

  validateNature = () => { // Will some day check against list of Natures!
    let nature = this.state.nature.value;
    if (typeof(nature) !== 'string') {
      return `This is just superflous it should never come up.`
    };
  };

  validateShiny = () => { // Normally this would be put against a legal Shiny list, but my custom game eliminates this.
    let shiny = this.state.shiny.value;
    if (typeof(shiny) !== 'boolean') {
      return `This is just superflous it should never come up.`
    };
  };

  validateSpecies = () => {
    let species = this.state.species.value;
    species = species.toString().trim();
    if(!legality.isLegalSpecies(species)){
      return `Must be an 'existing' Pokemon species or form styled via '[species]-[form]'!`
    };
  };

  validateGender = () => { // does this work?
    let gender = this.state.gender.value;
    gender = gender.toString().trim();
    if(legality.returnGenderStatus(this.state.species.value)){
      if (gender !== legality.returnGenderStatus(this.state.species.value)){
        return `This species is locked to a gender of '${legality.returnGenderStatus(this.state.species.value)}'.`
      };
    };
  };

  validateLevel = () => { // in the future, Custom Game might be integrated.  Not sure what the max level is there.
    let level = Number(this.state.level.value);
    if (level > 100 || level < 1) {
      return `Level must be between 1 and 100`
    };
  };

  validateHappiness = () => {
    let happiness = Number(this.state.happiness.value);
    if (happiness > 255 || happiness < 0) {
      return `Hapiness must be between 0 and 255`
    };
  };

  validateEvs = () => {
    let flag;
    let hp_ev = Number(this.state.hp_ev.value);
    let atk_ev = Number(this.state.atk_ev.value);
    let def_ev = Number(this.state.def_ev.value);
    let spa_ev = Number(this.state.spa_ev.value);
    let spd_ev = Number(this.state.spd_ev.value);
    let spe_ev = Number(this.state.spe_ev.value);

    let evArr = [hp_ev, atk_ev, def_ev, spa_ev, spd_ev, spe_ev];

    /* While normally EV's can only have 508 (510) in total, 
    because Hackmons is a thing, we don't check this.*/

    evArr.forEach(ev => {
      if(ev > 252 || ev < 0) {
        flag = `EV's must be set from 0 to 255`
      };
    });
    return flag;
  }

  validateIvs = () => {
    let flag;
    let hp_iv = Number(this.state.hp_iv.value);
    let atk_iv = Number(this.state.atk_iv.value);
    let def_iv = Number(this.state.def_iv.value);
    let spa_iv = Number(this.state.spa_iv.value);
    let spd_iv = Number(this.state.spd_iv.value);
    let spe_iv = Number(this.state.spe_iv.value);

    let evArr = [hp_iv, atk_iv, def_iv, spa_iv, spd_iv, spe_iv];

    evArr.forEach(iv => {
      if(iv > 31 || iv < 0) {
        flag = `IV's must be set from 0 to 31`
      };
    });
    return flag;
  };

  validateMoves = () => { // Every Pokemon has at least 1 move.  Only one we actually need to check for
    let move_one = this.state.move_one.value;
    let move_two = this.state.move_two.value;
    let move_three = this.state.move_three.value;
    let move_four = this.state.move_four.value;

    if (!move_one) {
      return `Pokemon must have at least ONE move; make sure it is in the top input box.`
    };

    if (typeof(move_one) !== 'string' ||
      typeof(move_two) !== 'string' ||
      typeof(move_three) !== 'string' ||
      typeof(move_four) !== 'string'
    ) {
      return `This is just superflous it should never come up.`
    };
  };

  // Renders


  renderExpandedSet() {

    const {set} = this.props;
    
    const {
      newSetImport,
      setNewSetContents,
      validateNewSetImport,
      handleUpdateSetImport,
      handleSetToggle,
      handleDeleteSet,
      handleUpdateSet,
    } = this.context;

    return (
      <div className="pokemon">
        <button onClick={() => handleSetToggle()}>Fold Down Set</button>
        <form> 
              <div className="pokemon-import">
                <label htmlFor="pokemon-import">Import Pokemon Set:</label>
                {newSetImport.value !== "" && <p className="error">{validateNewSetImport()}</p>}
                <textarea type="text" placeholder="Import a Pokemon Showdown Set Here And It Will Re-populate The Field:" name="pokemon-import" id={`pokemon-import-${set.id}`} value={newSetImport.value} onChange={e => setNewSetContents(e.target.value)}/>
                <button type="submit"
                  disabled={
                    validateNewSetImport()
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdateSetImport();
                  }}>Submit</button>
              </div>
            </form>
        <form> 
          <div className="pokemon-intro">
            <div className="name-sprite">
              <div className="names">
                <label htmlFor="pokemon-name">Species:</label>
                {this.state.species.touched && <p className="error">{this.validateSpecies()}</p>}
                <input className="pokemon-name" placeholder="e.g. Pikachu" value={this.state.species.value} onChange={e => this.setSpecies(e.target.value)} type="text" name="pokemon-name" id={`pokemon-name-${set.id}`} />
                <label htmlFor="pokemon-nickname">Nickname: (optional)</label>
                {<p className="error">{this.validateNickname()}</p>}
                <input className="pokemon-nickname" placeholder={this.state.species.value} value={this.state.nickname.value} onChange={e => this.setNickname(e.target.value)} type="text" name="pokemon-nickname" id={`pokemon-nickname-${set.id}`} />
                <label htmlFor="pokemon-gender">Gender: </label>
                {<p className="error">{this.validateGender()}</p>}
                <input className="pokemon-gender" placeholder="F, M, or N" value={this.state.gender.value} onChange={e => this.setGender(e.target.value)} type="text" name="pokemon-gender" id={`pokemon-gender-${set.id}`} />
                  <div>
                    <label htmlFor="shiny">Shiny:</label>
                    {<p className="error">{this.validateShiny()}</p>}
                    <input type="checkbox" id="shiny-2" name="shiny" checked={this.state.shiny.value} value={this.state.shiny.value} onChange={e => this.setShiny(e.target.value)}/>
                  </div>  
              </div>
              <div className="sprites">
                <img src={legality.returnIconSprite(this.state.species.value, this.state.shiny.value)} alt={this.state.species.value}/>
                {legality.returnTypeIcon(legality.returnType(this.state.species.value)).map((type, i)=> {
                  return <img src={`${type}`} key={i} alt={`${i + 1}`}/>
                })}
              </div>
            </div>
          </div>
          <div className="details">
            <div className="first-details">
              <label htmlFor="pokemon-level">Level: </label>
              {this.state.species.touched && <p className="error">{this.validateLevel()}</p>}
              <input className="pokemon-level" placeholder="100" value={this.state.level.value} onChange={e => this.setLevel(e.target.value)} type="text" name="pokemon-level" id={`pokemon-level-${set.id}`} />
              <label htmlFor="pokemon-item">Item: (optional)</label>
              {<p className="error">{this.validateItem()}</p>}
              <input className="pokemon-item" placeholder="e.g. Leftovers" value={this.state.item.value} onChange={e => this.setItem(e.target.value)} type="text" name="pokemon-item" id={`pokemon-item-${set.id}`} />
              <label htmlFor="pokemon-ability">Ability: (optional)</label>
              {<p className="error">{this.validateAbility()}</p>}
              <input className="pokemon-ability" placeholder="e.g. Static" value={this.state.ability.value} onChange={e => this.setAbility(e.target.value)} type="text" name="pokemon-ability" id={`pokemon-ability-${set.id}`} />
              <label htmlFor="pokemon-nature">Nature: (optional)</label>
              {<p className="error">{this.validateNature()}</p>}
              <input className="pokemon-nature" placeholder="e.g. Adamant" value={this.state.nature.value} onChange={e => this.setNature(e.target.value)} type="text" name="pokemon-nature" id={`pokemon-nature-${set.id}`} />
              <label htmlFor="pokemon-happiness">Happiness:</label>
              {this.state.happiness.touched && <p className="error">{this.validateHappiness()}</p>}
              <input className="pokemon-happiness" placeholder="255" value={this.state.happiness.value} onChange={e => this.setHappiness(e.target.value)} type="number" name="pokemon-happiness" min="0" max="255" id={`pokemon-happiness-${set.id}`} />
            </div>
            <div className="stats">
              <div className="evs">
              {<p className="error">{this.validateEvs()}</p>}
                <label htmlFor="pokemon-ev-hp">HP EV:</label>
                <input className="pokemon-ev" placeholder="0" value={this.state.hp_ev.value} onChange={e => this.setHpEv(e.target.value)} type="number" name="pokemon-ev-hp" min="0" max="252" id={`pokemon-ev-hp-${set.id}`} />
                <label htmlFor="pokemon-ev-atk">Atk EV:</label>
                <input className="pokemon-ev" placeholder="0" value={this.state.atk_ev.value} onChange={e => this.setAtkEv(e.target.value)} type="number" name="pokemon-ev-atk" min="0" max="252" id={`pokemon-ev-atk-${set.id}`} />
                <label htmlFor="pokemon-ev-def">Def EV:</label>
                <input className="pokemon-ev" placeholder="0" value={this.state.def_ev.value} onChange={e => this.setDefEv(e.target.value)} type="number" name="pokemon-ev-def" min="0" max="252" id={`pokemon-ev-def-${set.id}`} />
                <label htmlFor="pokemon-ev-spa">SpA EV:</label>
                <input className="pokemon-ev" placeholder="0" value={this.state.spa_ev.value} onChange={e => this.setSpAEv(e.target.value)} type="number" name="pokemon-ev-spa" min="0" max="252" id={`pokemon-ev-spa-${set.id}`} />
                <label htmlFor="pokemon-ev-spd">SpD EV:</label>
                <input className="pokemon-ev" placeholder="0" value={this.state.spd_ev.value} onChange={e => this.setSpDEv(e.target.value)} type="number" name="pokemon-ev-spd" min="0" max="252" id={`pokemon-ev-spd-${set.id}`} />
                <label htmlFor="pokemon-ev-spe">SpE EV:</label>
                <input className="pokemon-ev" placeholder="0" value={this.state.spe_ev.value} onChange={e => this.setSpeEv(e.target.value)} type="number" name="pokemon-ev-spe" min="0" max="252" id={`pokemon-ev-spe-${set.id}`} />
              </div>
              <div className="ivs">
              {<p className="error">{this.validateIvs()}</p>}
                <label htmlFor="pokemon-iv-hp">HP IV:</label>
                <input className="pokemon-iv" placeholder="31" value={this.state.hp_iv.value} onChange={e => this.setHpIv(e.target.value)} type="number" name="pokemon-iv-hp" min="0" max="31" id={`pokemon-iv-hp-${set.id}`} />
                <label htmlFor="pokemon-iv-atk">Atk IV:</label>
                <input className="pokemon-iv" placeholder="31" value={this.state.atk_iv.value} onChange={e => this.setAtkIv(e.target.value)} type="number" name="pokemon-iv-atk" min="0" max="31" id={`pokemon-iv-atk-${set.id}`} />
                <label htmlFor="pokemon-iv-def">Def IV:</label>
                <input className="pokemon-iv" placeholder="31" value={this.state.def_iv.value} onChange={e => this.setDefIv(e.target.value)} type="number" name="pokemon-iv-def" min="0" max="31" id={`pokemon-iv-def-${set.id}`} />
                <label htmlFor="pokemon-iv-spa">SpA IV:</label>
                <input className="pokemon-iv" placeholder="31" value={this.state.spa_iv.value} onChange={e => this.setSpAIv(e.target.value)} type="number" name="pokemon-iv-spa" min="0" max="31" id={`pokemon-iv-spa-${set.id}`} />
                <label htmlFor="pokemon-iv-spd">SpD IV:</label>
                <input className="pokemon-iv" placeholder="31" value={this.state.spd_iv.value} onChange={e => this.setSpDIv(e.target.value)} type="number" name="pokemon-iv-spd" min="0" max="31" id={`pokemon-iv-spd-${set.id}`} />
                <label htmlFor="pokemon-iv-spe">SpE IV:</label>
                <input className="pokemon-iv" placeholder="31" value={this.state.spe_iv.value} onChange={e => this.setSpeIv(e.target.value)} type="number" name="pokemon-iv-spe" min="0" max="31" id={`pokemon-iv-spe-${set.id}`} />
              </div>
            </div>
            <div className="moves">
              <label htmlFor="pokemon-moves">Moves:</label>
              {<p className="error">{this.validateMoves()}</p>}
                <input className="pokemon-move" placeholder="Tackle" value={this.state.move_one.value} onChange={e => this.setMoveOne(e.target.value)} type="text" name="pokemon-move" id={`pokemon-${set.id}-move-1`} />
                <input className="pokemon-move" value={this.state.move_two.value} onChange={e => this.setMoveTwo(e.target.value)} type="text" name="pokemon-move" id={`pokemon-${set.id}-move-2`} />
                <input className="pokemon-move" value={this.state.move_three.value} onChange={e => this.setMoveThree(e.target.value)} type="text" name="pokemon-move" id={`pokemon-${set.id}-move-3`} />
                <input className="pokemon-move" value={this.state.move_four.value} onChange={e => this.setMoveFour(e.target.value)} type="text" name="pokemon-move" id={`pokemon-${set.id}-move-4`} />
            </div>
            <button type="submit"
                disabled={
                  this.validateSpecies() ||
                  this.validateGender() ||
                  this.validateLevel() ||
                  this.validateHappiness() ||
                  this.validateEvs() ||
                  this.validateIvs() ||
                  this.validateMoves()
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdateSet(
                    this.state.nickname,
                    this.state.species,
                    this.state.gender,
                    this.state.shiny,
                    this.state.item,
                    this.state.ability,
                    this.state.level,
                    this.state.happiness,
                    this.state.nature,
                    this.state.hp_ev,
                    this.state.atk_ev,
                    this.state.def_ev,
                    this.state.spa_ev,
                    this.state.spd_ev,
                    this.state.spe_ev,
                    this.state.hp_iv,
                    this.state.atk_iv,
                    this.state.def_iv,
                    this.state.spa_iv,
                    this.state.spd_iv,
                    this.state.spe_iv,
                    this.state.move_one,
                    this.state.move_two,
                    this.state.move_three,
                    this.state.move_four,
                    set.id,
                    set.team_id,
                    set.user_id,
                  );
                }}>Save Team Details</button>
          </div>
        </form>
        
        <div className="export-pokemon">
          <div>
            <Link to={`/share/${set.team_id}/${set.id}`} target="_blank">Share This Set!</Link>
            <input type="text" readOnly value={`[hostname]/${set.team_id}/${set.id}`}/>
          </div>
          <div className="export-pokemon">
            <label htmlFor="export-pokemon">Export Pokemon:</label>
            <textarea readOnly type="text" name="export-pokemon" id="export-pokemon-2" value={showdownGenerate([set])}/>
          </div>
        </div>
        <div>
          <button onClick={(e) => {
            e.preventDefault();
            handleDeleteSet(this.props.team.id);
            }}>Delete Set!</button>
        </div>
      </div>
    );
  };

  renderUnexpandedSet() {

    const {set} = this.props;
    
    const {
      handleSetToggle,
    } = this.context;

    return (
      <div className="pokemon">
        <div className="closed" onClick={() => handleSetToggle()}>
          <img className="icon" src={legality.returnIconSprite(set.species, set.shiny)} alt={set.species}/>
          <p>{set.species}</p>
          {legality.returnTypeIcon(legality.returnType(set.species)).map((type, i)=> {
            return <img className="icon" key={i} src={`${type}`} alt={`${i + 1}`}/>
          })}
        </div>
    </div>
    );
  }

  render() {
    const {setExpandToggle} = this.context;
    return (
      <Fragment>
        {setExpandToggle ? this.renderUnexpandedSet() : this.renderExpandedSet()} {/* or some value in state */ }
      </Fragment>
    );
  };
};


