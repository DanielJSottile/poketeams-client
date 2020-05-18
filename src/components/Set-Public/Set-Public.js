import React, { Component, Fragment } from 'react';
import UserContext from '../../contexts/UserContext';
import showdownGenerate from '../../functions/generate';
import legality from '../../functions/legality';

export default class Set extends Component {

  static contextType = UserContext;

  state = {
    set: []
  }

  handleOnClick = () => {

  }

  
  renderExpandedSet() {

    const set = this.state.set;

    return (
      <div className="pokemon">
        <button>Fold Down</button> {/* onClick*/}
        <form disabled> 
          <div className="pokemon-intro">
            <div className="name-sprite">
              <div className="names">
                <label htmlFor="pokemon-name">Species:</label>
                <input className="pokemon-name" disabled value={this.state.species.value} type="text" name="pokemon-name" id={`pokemon-name-${set.id}`} />
                <label htmlFor="pokemon-nickname">Nickname: (optional)</label>
                <input className="pokemon-nickname" placeholder={this.state.species.value} disabled value={this.state.nickname.value} type="text" name="pokemon-nickname" id={`pokemon-nickname-${set.id}`} />
                <label htmlFor="pokemon-gender">Gender: </label>
                <input className="pokemon-gender" disabled value={this.state.gender.value} type="text" name="pokemon-gender" id={`pokemon-gender-${set.id}`} />
                  <div>
                    <label htmlFor="shiny">Shiny:</label>
                    <input type="checkbox" id="shiny-2" name="shiny" disabled value={this.state.shiny.value}/>
                  </div>  
              </div>
              <div className="sprites">
                <p>[placeholder htmlFor type sprite(s)]</p>
                <p>[placeholder htmlFor sprite]</p>
              </div>
            </div>
          </div>
          <div className="details">
            <div className="first-details">
              <label htmlFor="pokemon-level">Level: </label>
              <input className="pokemon-level" disabled value={this.state.level.value} type="text" name="pokemon-level" id={`pokemon-level-${set.id}`} />
              <label htmlFor="pokemon-item">Item: (optional)</label>
              <input className="pokemon-item" disabled value={this.state.item.value} type="text" name="pokemon-item" id={`pokemon-item-${set.id}`} />
              <label htmlFor="pokemon-ability">Ability: (optional)</label>
              <input className="pokemon-ability" disabled value={this.state.ability.value} type="text" name="pokemon-ability" id={`pokemon-ability-${set.id}`} />
              <label htmlFor="pokemon-nature">Nature: (optional)</label>
              <input className="pokemon-nature" disabled value={this.state.nature.value} type="text" name="pokemon-nature" id={`pokemon-nature-${set.id}`} />
              <label htmlFor="pokemon-happiness">Happiness:</label>
              <input className="pokemon-happiness" disabled value={this.state.happiness.value} type="number" name="pokemon-happiness" min="0" max="252" id={`pokemon-happiness-${set.id}`} />
            </div>
            <div className="stats">
              <div className="evs">
                <label htmlFor="pokemon-ev-hp">HP EV:</label>
                <input className="pokemon-ev" disabled value={this.state.hp_ev.value} type="number" name="pokemon-ev-hp" min="0" max="252" id={`pokemon-ev-hp-${set.id}`} />
                <label htmlFor="pokemon-ev-atk">Atk EV:</label>
                <input className="pokemon-ev" disabled value={this.state.atk_ev.value} type="number" name="pokemon-ev-atk" min="0" max="252" id={`pokemon-ev-atk-${set.id}`} />
                <label htmlFor="pokemon-ev-def">Def EV:</label>
                <input className="pokemon-ev" disabled value={this.state.def_ev.value} type="number" name="pokemon-ev-def" min="0" max="252" id={`pokemon-ev-def-${set.id}`} />
                <label htmlFor="pokemon-ev-spa">SpA EV:</label>
                <input className="pokemon-ev" disabled value={this.state.spa_ev.value} type="number" name="pokemon-ev-spa" min="0" max="252" id={`pokemon-ev-spa-${set.id}`} />
                <label htmlFor="pokemon-ev-spd">SpD EV:</label>
                <input className="pokemon-ev" disabled value={this.state.spd_ev.value} type="number" name="pokemon-ev-spd" min="0" max="252" id={`pokemon-ev-spd-${set.id}`} />
                <label htmlFor="pokemon-ev-spe">SpE EV:</label>
                <input className="pokemon-ev" disabled value={this.state.spe_ev.value} type="number" name="pokemon-ev-spe" min="0" max="252" id={`pokemon-ev-spe-${set.id}`} />
              </div>
              <div className="ivs">
                <label htmlFor="pokemon-iv-hp">HP IV:</label>
                <input className="pokemon-iv" disabled value={this.state.hp_iv.value} type="number" name="pokemon-iv-hp" min="0" max="31" id={`pokemon-iv-hp-${set.id}`} />
                <label htmlFor="pokemon-iv-atk">Atk IV:</label>
                <input className="pokemon-iv" disabled value={this.state.atk_iv.value} type="number" name="pokemon-iv-atk" min="0" max="31" id={`pokemon-iv-atk-${set.id}`} />
                <label htmlFor="pokemon-iv-def">Def IV:</label>
                <input className="pokemon-iv" disabled value={this.state.def_iv.value} type="number" name="pokemon-iv-def" min="0" max="31" id={`pokemon-iv-def-${set.id}`} />
                <label htmlFor="pokemon-iv-spa">SpA IV:</label>
                <input className="pokemon-iv" disabled value={this.state.spa_iv.value} type="number" name="pokemon-iv-spa" min="0" max="31" id={`pokemon-iv-spa-${set.id}`} />
                <label htmlFor="pokemon-iv-spd">SpD IV:</label>
                <input className="pokemon-iv" disabled value={this.state.spd_iv.value} type="number" name="pokemon-iv-spd" min="0" max="31" id={`pokemon-iv-spd-${set.id}`} />
                <label htmlFor="pokemon-iv-spe">SpE IV:</label>
                <input className="pokemon-iv" disabled value={this.state.spe_iv.value} type="number" name="pokemon-iv-spe" min="0" max="31" id={`pokemon-iv-spe-${set.id}`} />
              </div>
            </div>
            <div className="moves">
              <label htmlFor="pokemon-moves">Moves:</label>
                <input className="pokemon-move" disabled value={this.state.move_one.value} type="text" name="pokemon-move" id={`pokemon-${set.id}-move-1`} />
                <input className="pokemon-move" disabled value={this.state.move_two.value} type="text" name="pokemon-move" id={`pokemon-${set.id}-move-2`} />
                <input className="pokemon-move" disabled value={this.state.move_three.value} type="text" name="pokemon-move" id={`pokemon-${set.id}-move-3`} />
                <input className="pokemon-move" disabled value={this.state.movefour.value} type="text" name="pokemon-move" id={`pokemon-${set.id}-move-4`} />
            </div>
          </div>
        </form>
        
        <div className="export-pokemon">
          <div>
            <a href="set.html" target="_blank">Share This Set!</a>
            <input type="text" disabled value={`[hostname]/${set.team_id}/${set.id}`}/>
          </div>
          <div className="export-pokemon">
            <label htmlFor="export-pokemon">Export Pokemon:</label>
            <textarea disabled type="text" name="export-pokemon" id="export-pokemon-2">{showdownGenerate(set)}</textarea>
          </div>
        </div>
      </div>
    );
  };

  renderUnexpandedSet() {

    const set = this.state.set;

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


