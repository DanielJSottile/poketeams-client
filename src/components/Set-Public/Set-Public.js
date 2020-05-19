import React, { Component, Fragment } from 'react';
import UserContext from '../../contexts/UserContext';
import showdownGenerate from '../../functions/generate';
import legality from '../../functions/legality';

export default class Set extends Component {

  static contextType = UserContext;


  
  renderExpandedSet() {

    const {set} = this.props;
    
    const {handleSetToggle} = this.context;

    return (
      <div className="pokemon">
      <button onClick={() => handleSetToggle()}>Fold Down Set</button>
        <form disabled readOnly> 
          <div className="pokemon-intro">
            <div className="name-sprite">
              <div className="names">
                <label htmlFor="pokemon-name">Species:</label>
                <input className="pokemon-name" disabled readOnly value={set.species || 'Pikachu'} type="text" name="pokemon-name" id={`pokemon-name-${set.id}`} />
                <label htmlFor="pokemon-nickname">Nickname: (optional)</label>
                <input className="pokemon-nickname" placeholder={set.species || 'Pikachu'} disabled readOnly value={set.nickname || ''} type="text" name="pokemon-nickname" id={`pokemon-nickname-${set.id}`} />
                <label htmlFor="pokemon-gender">Gender: </label>
                <input className="pokemon-gender" disabled readOnly value={set.gender || ''} type="text" name="pokemon-gender" id={`pokemon-gender-${set.id}`} />
                  <div>
                    <label htmlFor="shiny">Shiny:</label>
                    <input type="checkbox" id="shiny-2" name="shiny" disabled readOnly checked={set.shiny || false}/>
                  </div>  
              </div>
              <div className="sprites">
                <img className="sprite-img" src={legality.returnIconSprite(set.species, set.shiny)} alt={set.species || 'Pikachu'}/>
                {legality.returnTypeIcon(legality.returnType(set.species)).map((type, i)=> {
                  return <img className="type-img" src={`${type}`} key={i} alt={`${i + 1}`}/>
                })}
              </div>
            </div>
          </div>
          <div className="details">
            <div className="first-details">
              <label htmlFor="pokemon-level">Level: </label>
              <input className="pokemon-level" disabled readOnly value={set.level || 100} type="text" name="pokemon-level" id={`pokemon-level-${set.id}`} />
              <label htmlFor="pokemon-item">Item: (optional)</label>
              <input className="pokemon-item" disabled readOnly value={set.item || ''} type="text" name="pokemon-item" id={`pokemon-item-${set.id}`} />
              <label htmlFor="pokemon-ability">Ability: (optional)</label>
              <input className="pokemon-ability" disabled readOnly value={set.ability || ''} type="text" name="pokemon-ability" id={`pokemon-ability-${set.id}`} />
              <label htmlFor="pokemon-nature">Nature: (optional)</label>
              <input className="pokemon-nature" disabled readOnly value={set.nature || ''} type="text" name="pokemon-nature" id={`pokemon-nature-${set.id}`} />
              <label htmlFor="pokemon-happiness">Happiness:</label>
              <input className="pokemon-happiness" disabled readOnly value={set.happiness || 255} type="number" name="pokemon-happiness" min="0" max="252" id={`pokemon-happiness-${set.id}`} />
            </div>
            <div className="stats">
              <div className="evs">
                <label htmlFor="pokemon-ev-hp">HP EV:</label>
                <input className="pokemon-ev" disabled readOnly value={set.hp_ev || 0} type="number" name="pokemon-ev-hp" min="0" max="252" id={`pokemon-ev-hp-${set.id}`} />
                <label htmlFor="pokemon-ev-atk">Atk EV:</label>
                <input className="pokemon-ev" disabled readOnly value={set.atk_ev || 0} type="number" name="pokemon-ev-atk" min="0" max="252" id={`pokemon-ev-atk-${set.id}`} />
                <label htmlFor="pokemon-ev-def">Def EV:</label>
                <input className="pokemon-ev" disabled readOnly value={set.def_ev || 0} type="number" name="pokemon-ev-def" min="0" max="252" id={`pokemon-ev-def-${set.id}`} />
                <label htmlFor="pokemon-ev-spa">SpA EV:</label>
                <input className="pokemon-ev" disabled readOnly value={set.spa_ev || 0} type="number" name="pokemon-ev-spa" min="0" max="252" id={`pokemon-ev-spa-${set.id}`} />
                <label htmlFor="pokemon-ev-spd">SpD EV:</label>
                <input className="pokemon-ev" disabled readOnly value={set.spd_ev || 0} type="number" name="pokemon-ev-spd" min="0" max="252" id={`pokemon-ev-spd-${set.id}`} />
                <label htmlFor="pokemon-ev-spe">SpE EV:</label>
                <input className="pokemon-ev" disabled readOnly value={set.spe_ev || 0} type="number" name="pokemon-ev-spe" min="0" max="252" id={`pokemon-ev-spe-${set.id}`} />
              </div>
              <div className="ivs">
                <label htmlFor="pokemon-iv-hp">HP IV:</label>
                <input className="pokemon-iv" disabled readOnly value={set.hp_iv || 31} type="number" name="pokemon-iv-hp" min="0" max="31" id={`pokemon-iv-hp-${set.id}`} />
                <label htmlFor="pokemon-iv-atk">Atk IV:</label>
                <input className="pokemon-iv" disabled readOnly value={set.atk_iv || 31} type="number" name="pokemon-iv-atk" min="0" max="31" id={`pokemon-iv-atk-${set.id}`} />
                <label htmlFor="pokemon-iv-def">Def IV:</label>
                <input className="pokemon-iv" disabled readOnly value={set.def_iv || 31} type="number" name="pokemon-iv-def" min="0" max="31" id={`pokemon-iv-def-${set.id}`} />
                <label htmlFor="pokemon-iv-spa">SpA IV:</label>
                <input className="pokemon-iv" disabled readOnly value={set.spa_iv || 31} type="number" name="pokemon-iv-spa" min="0" max="31" id={`pokemon-iv-spa-${set.id}`} />
                <label htmlFor="pokemon-iv-spd">SpD IV:</label>
                <input className="pokemon-iv" disabled readOnly value={set.spd_iv || 31} type="number" name="pokemon-iv-spd" min="0" max="31" id={`pokemon-iv-spd-${set.id}`} />
                <label htmlFor="pokemon-iv-spe">SpE IV:</label>
                <input className="pokemon-iv" disabled readOnly value={set.spe_iv || 31} type="number" name="pokemon-iv-spe" min="0" max="31" id={`pokemon-iv-spe-${set.id}`} />
              </div>
            </div>
            <div className="moves">
              <label htmlFor="pokemon-moves">Moves:</label>
                <input className="pokemon-move" disabled readOnly value={set.move_one || 'Tackle'} type="text" name="pokemon-move" id={`pokemon-${set.id}-move-1`} />
                <input className="pokemon-move" disabled readOnly value={set.move_two || ''} type="text" name="pokemon-move" id={`pokemon-${set.id}-move-2`} />
                <input className="pokemon-move" disabled readOnly value={set.move_three || ''} type="text" name="pokemon-move" id={`pokemon-${set.id}-move-3`} />
                <input className="pokemon-move" disabled readOnly value={set.move_four || ''} type="text" name="pokemon-move" id={`pokemon-${set.id}-move-4`} />
            </div>
          </div>
        </form>
        
        <div className="export-pokemon">
          <div>
            <a href="set.html" target="_blank">Share This Set!</a>
            <input type="text" disabled readOnly value={`[hostname]/${set.team_id}/${set.id}`}/>
          </div>
          <div className="export-pokemon">
            <label htmlFor="export-pokemon">Export Pokemon:</label>
            <textarea disabled readOnly type="text" name="export-pokemon" id="export-pokemon-2" value={showdownGenerate([set])}/>
          </div>
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


