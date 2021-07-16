/* This generator function is designed to take a format of the outcome of the parser.js
and turn it back into a string of text that matches the original format */

import { PokemonSet } from '../@types';

// Interfaces

export interface PokeObject {
  hp_ev: number;
  atk_ev: number;
  def_ev: number;
  spa_ev: number;
  spd_ev: number;
  spe_ev: number;
  hp_iv: number;
  atk_iv: number;
  def_iv: number;
  spa_iv: number;
  spd_iv: number;
  spe_iv: number;
}

// Helper Functions

function evGenerator(ob: PokeObject) {
  const evArr = [];

  if (
    ob.hp_ev === 0 &&
    ob.atk_ev === 0 &&
    ob.def_ev === 0 &&
    ob.spa_ev === 0 &&
    ob.spd_ev === 0 &&
    ob.spe_ev === 0
  ) {
    return;
  }

  if (ob.hp_ev > 0) {
    evArr.push(`${ob.hp_ev} HP`);
  }
  if (ob.atk_ev > 0) {
    evArr.push(`${ob.atk_ev} Atk`);
  }
  if (ob.def_ev > 0) {
    evArr.push(`${ob.def_ev} Def`);
  }
  if (ob.spa_ev > 0) {
    evArr.push(`${ob.spa_ev} SpA`);
  }
  if (ob.spd_ev > 0) {
    evArr.push(`${ob.spd_ev} SpD`);
  }
  if (ob.spe_ev > 0) {
    evArr.push(`${ob.spe_ev} Spe`);
  }

  return evArr.join(' / ');
}

function ivGenerator(ob: PokeObject) {
  const ivArr = [];

  if (
    ob.hp_iv === 31 &&
    ob.atk_iv === 31 &&
    ob.def_iv === 31 &&
    ob.spa_iv === 31 &&
    ob.spd_iv === 31 &&
    ob.spe_iv === 31
  ) {
    return;
  }

  if (ob.hp_iv < 31) {
    ivArr.push(`${ob.hp_iv} HP`);
  }
  if (ob.atk_iv < 31) {
    ivArr.push(`${ob.atk_iv} Atk`);
  }
  if (ob.def_iv < 31) {
    ivArr.push(`${ob.def_iv} Def`);
  }
  if (ob.spa_iv < 31) {
    ivArr.push(`${ob.spa_iv} SpA`);
  }
  if (ob.spd_iv < 31) {
    ivArr.push(`${ob.spd_iv} SpD`);
  }
  if (ob.spe_iv < 31) {
    ivArr.push(`${ob.spe_iv} Spe`);
  }

  return ivArr.join(' / ');
}

// Generator Function

export default function showdownGenerate(input: PokemonSet[]): string {
  return input
    .map((set: PokemonSet) => {
      const setArr = [];

      // handle first line first (redo this part pls)

      if (set.nickname && set.gender && set.item) {
        // nick, gender, item
        setArr.push(
          `${set.nickname} (${set.species}) (${set.gender}) @ ${set.item}`
        );
      } else if (set.nickname && !set.gender && set.item) {
        //nick, item
        setArr.push(`${set.nickname} (${set.species}) @ ${set.item}`);
      } else if (set.nickname && set.gender && !set.item) {
        // nick, gender
        setArr.push(`${set.nickname} (${set.species}) (${set.gender})`);
      } else if (set.nickname && !set.gender && !set.item) {
        // nick
        setArr.push(`${set.nickname} (${set.species})`);
      } else if (!set.nickname && set.gender && set.item) {
        // gender, item
        setArr.push(`${set.species} (${set.gender}) @ ${set.item}`);
      } else if (!set.nickname && set.gender && !set.item) {
        // gender
        setArr.push(`${set.species} (${set.gender})`);
      } else if (!set.nickname && !set.gender && set.item) {
        // item
        setArr.push(`${set.species} @ ${set.item}`);
      } else {
        setArr.push(`${set.species}`);
      }

      // the rest of it

      if (set.ability) {
        setArr.push(`Ability: ${set.ability}`);
      }

      if (set.level < 100) {
        setArr.push(`Level: ${set.level}`);
      }

      if (set.shiny) {
        setArr.push(`Shiny: Yes`);
      }

      if (set.happiness < 255) {
        setArr.push(`Happiness: ${set.happiness}`);
      }

      // ev's

      if (evGenerator(set)) {
        setArr.push(`EVs: ${evGenerator(set)}`);
      }

      // nature

      if (set.nature) {
        setArr.push(`${set.nature} Nature`);
      }

      // iv's

      if (ivGenerator(set)) {
        setArr.push(`IVs: ${ivGenerator(set)}`);
      }

      // moves

      if (!set.move_one) {
        setArr.push('- Tackle');
      } else {
        setArr.push(`- ${set.move_one}`);
      }

      if (set.move_two) {
        setArr.push(`- ${set.move_two}`);
      }

      if (set.move_three) {
        setArr.push(`- ${set.move_three}`);
      }

      if (set.move_four) {
        setArr.push(`- ${set.move_four}`);
      }

      return setArr.join('\n');
    })
    .join('\n\n');
}
