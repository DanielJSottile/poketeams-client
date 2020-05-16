import React, { Component, Fragment } from 'react';
import UserContext from '../../contexts/UserContext';
import showdownGenerate from '../../functions/generate';

export default class Set extends Component {

  static contextType = UserContext;

  handleOnClick() {

  }

  renderExpandedSet() {

    const {set} = this.context;

    return (
      <div className="pokemon">
        <button>Fold Down</button> {/* onClick*/}
        <form> {/* onsubmit*/}
          <div className="pokemon-intro">
            <div className="name-sprite">
              <div className="names">
                <label htmlFor="pokemon-name">Species:</label>
                <input className="pokemon-name" placeholder="e.g. Pikachu" value={`${set.species}`} type="text" name="pokemon-name" id={`pokemon-name-${set.id}`} />
                <label htmlFor="pokemon-nickname">Nickname: (optional)</label>
                <input className="pokemon-nickname" placeholder={`${set.species}`} value={`${set.nickname}`} type="text" name="pokemon-nickname" id={`pokemon-nickname-${set.id}`} />
                  <div>
                    <label htmlFor="shiny">Shiny:</label>
                    <input type="checkbox" id="shiny-2" name="shiny" value={`${set.shiny}`}/>
                  </div>  
              </div>
              <div className="sprites">
                <p>[placeholder htmlFor type sprite(s)]</p>
                <p>[placeholder htmlFor sprite]</p>
              </div>
            </div>
            <form> {/* onsubmit*/}
              <div className="pokemon-import">
                <label htmlFor="pokemon-import">Import Pokemon Set:</label>
                <textarea type="text" placeholder="Import a Pokemon Showdown Set Here And It Will Re-populate The Field:" name="pokemon-import" id={`pokemon-import-${set.id}`}></textarea>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
          <div className="details">
            <div className="first-details">
              <label htmlFor="pokemon-level">Level: </label>
              <input className="pokemon-level" placeholder="100" value={`${set.level}`} type="text" name="pokemon-level" id={`pokemon-level-${set.id}`} />
              <label htmlFor="pokemon-item">Item: (optional)</label>
              <input className="pokemon-item" placeholder="e.g. Leftovers" value={`${set.item}`} type="text" name="pokemon-item" id={`pokemon-item-${set.id}`} />
              <label htmlFor="pokemon-ability">Ability: (optional)</label>
              <input className="pokemon-ability" placeholder="e.g. Static" value={`${set.ability}`} type="text" name="pokemon-ability" id={`pokemon-ability-${set.id}`} />
              <label htmlFor="pokemon-nature">Nature: (optional)</label>
              <input className="pokemon-nature" placeholder="e.g. Adamant" value={`${set.nature}`} type="text" name="pokemon-nature" id={`pokemon-nature-${set.id}`} />
              <label htmlFor="pokemon-happiness">Happiness:</label>
              <input className="pokemon-happiness" placeholder="255" value={`${set.happiness}`} type="number" name="pokemon-happiness" min="0" max="252" id={`pokemon-happiness-${set.id}`} />
            </div>
            <div className="stats">
              <div className="evs">
                <label htmlFor="pokemon-ev-hp">HP EV:</label>
                <input className="pokemon-ev" placeholder="0" value={`${set.hp_ev}`} type="number" name="pokemon-ev-hp" min="0" max="252" id={`pokemon-ev-hp-${set.id}`} />
                <label htmlFor="pokemon-ev-atk">Atk EV:</label>
                <input className="pokemon-ev" placeholder="0" value={`${set.atk_ev}`} type="number" name="pokemon-ev-atk" min="0" max="252" id={`pokemon-ev-atk-${set.id}`} />
                <label htmlFor="pokemon-ev-def">Def EV:</label>
                <input className="pokemon-ev" placeholder="0" value={`${set.def_ev}`} type="number" name="pokemon-ev-def" min="0" max="252" id={`pokemon-ev-def-${set.id}`} />
                <label htmlFor="pokemon-ev-spa">SpA EV:</label>
                <input className="pokemon-ev" placeholder="0" value={`${set.spa_ev}`} type="number" name="pokemon-ev-spa" min="0" max="252" id={`pokemon-ev-spa-${set.id}`} />
                <label htmlFor="pokemon-ev-spd">SpD EV:</label>
                <input className="pokemon-ev" placeholder="0" value={`${set.spd_ev}`} type="number" name="pokemon-ev-spd" min="0" max="252" id={`pokemon-ev-spd-${set.id}`} />
                <label htmlFor="pokemon-ev-spe">SpE EV:</label>
                <input className="pokemon-ev" placeholder="0" value={`${set.spe_ev}`} type="number" name="pokemon-ev-spe" min="0" max="252" id={`pokemon-ev-spe-${set.id}`} />
              </div>
              <div className="ivs">
                <label htmlFor="pokemon-iv-hp">HP IV:</label>
                <input className="pokemon-iv" placeholder="31" value={`${set.hp_iv}`} type="number" name="pokemon-iv-hp" min="0" max="31" id={`pokemon-iv-hp-${set.id}`} />
                <label htmlFor="pokemon-iv-atk">Atk IV:</label>
                <input className="pokemon-iv" placeholder="31" value={`${set.atk_iv}`} type="number" name="pokemon-iv-atk" min="0" max="31" id={`pokemon-iv-atk-${set.id}`} />
                <label htmlFor="pokemon-iv-def">Def IV:</label>
                <input className="pokemon-iv" placeholder="31" value={`${set.def_iv}`} type="number" name="pokemon-iv-def" min="0" max="31" id={`pokemon-iv-def-${set.id}`} />
                <label htmlFor="pokemon-iv-spa">SpA IV:</label>
                <input className="pokemon-iv" placeholder="31" value={`${set.spa_iv}`} type="number" name="pokemon-iv-spa" min="0" max="31" id={`pokemon-iv-spa-${set.id}`} />
                <label htmlFor="pokemon-iv-spd">SpD IV:</label>
                <input className="pokemon-iv" placeholder="31" value={`${set.spd_iv}`} type="number" name="pokemon-iv-spd" min="0" max="31" id={`pokemon-iv-spd-${set.id}`} />
                <label htmlFor="pokemon-iv-spe">SpE IV:</label>
                <input className="pokemon-iv" placeholder="31" value={`${set.spe_iv}`} type="number" name="pokemon-iv-spe" min="0" max="31" id={`pokemon-iv-spe-${set.id}`} />
              </div>
            </div>
            <div className="moves">
              <label htmlFor="pokemon-moves">Moves:</label>
                <input className="pokemon-move" placeholder="Tackle" value={`${set.move_one}`} type="text" name="pokemon-move" id={`pokemon-${set.id}-move-1`} />
                <input className="pokemon-move" value={`${set.move_two}`} type="text" name="pokemon-move" id={`pokemon-${set.id}-move-2`} />
                <input className="pokemon-move" value={`${set.move_three}`} type="text" name="pokemon-move" id={`pokemon-${set.id}-move-3`} />
                <input className="pokemon-move" value={`${set.move_four}`} type="text" name="pokemon-move" id={`pokemon-${set.id}-move-4`} />
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>
        
        <div className="export-pokemon">
          <div>
            <a href="set.html" target="_blank">Share This Set!</a>
            <input type="text" readonly value={`[hostname]/${set.team_id}/${set.id}`}/>
          </div>
          <div className="export-pokemon">
            <label htmlFor="export-pokemon">Export Pokemon:</label>
            <textarea readonly type="text" name="export-pokemon" id="export-pokemon-2">{showdownGenerate(set)}</textarea>
          </div>
        </div>
      </div>
    );
  };

  renderUnexpandedSet() {

    const {set} = this.context;

    return (
      <div className="pokemon">
        <div className="closed">
          <p>[mini sprite]</p>
          <p>{set.species}</p>
          <p>[type sprite(s)]</p>
        </div>
    </div>
    );
  }

  render() {
    return (
      <Fragment>
        {this.handleOnClick() ? this.renderUnexpandedSet() : this.renderExpandedSet()} {/* or some value in state */ }
      </Fragment>
    );
  };
};


