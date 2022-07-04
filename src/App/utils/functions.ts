import { ChangeEvent, SetStateAction } from 'react';
import { PokemonSet, ParseReturn, NumberInput } from '../@types';
import {
  FOLDERPARSE,
  NICKNAME_GEN_AND_ITEM_RE,
  NICKNAME_AND_ITEM_RE,
  NICKNAME_GEN_NO_ITEM_RE,
  NICKNAME_NO_ITEM_RE,
  NO_NICKNAME_GEN_AND_ITEM_RE,
  NO_NICKNAME_AND_ITEM_RE,
} from './constants';

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

type Input = {
  [x: string]: PokemonSet[];
};

export const evGenerator = (ob: PokeObject): string | undefined => {
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
};

export const ivGenerator = (ob: PokeObject): string | undefined => {
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
};

export const evIvParser = (string: string | null, val: string): number[] => {
  let hpV = 0;
  let atkV = 0;
  let defV = 0;
  let spaV = 0;
  let spdV = 0;
  let speV = 0;

  if (val === 'iv') {
    hpV = 31;
    atkV = 31;
    defV = 31;
    spaV = 31;
    spdV = 31;
    speV = 31;
  }

  if (!string) {
    return [hpV, atkV, defV, spaV, spdV, speV];
  }

  const evIvRE = /(\d{1,3}) (.*)/;

  const evArr = string.split('/');

  evArr.forEach((value) => {
    const trim = value.trim();
    const match = trim.match(evIvRE);

    if (match && match[2] === 'HP') {
      hpV = Number(match[1]);
    } else if (match && match[2] === 'Atk') {
      atkV = Number(match[1]);
    } else if (match && match[2] === 'Def') {
      defV = Number(match[1]);
    } else if (match && match[2] === 'SpA') {
      spaV = Number(match[1]);
    } else if (match && match[2] === 'SpD') {
      spdV = Number(match[1]);
    } else if (match && match[2] === 'Spe') {
      speV = Number(match[1]);
    }
  });

  return [hpV, atkV, defV, spaV, spdV, speV];
};

/** GENERATE FUNCTION */

export const generate = (sets: PokemonSet[]): string[] => {
  return sets.map((set: PokemonSet) => {
    const setArr = [];

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

    if (set.gigantamax) {
      setArr.push(`Gigantamax: Yes`);
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
  });
};

export const showdownGenerate = (input: PokemonSet[]): string => {
  return generate(input).join('\n\n');
};

export const showdownFolderGenerate = (
  folderName: string,
  input: Input[]
): string => {
  return input
    .map((team: Input) => {
      const [teamName, sets] = Object.entries(team)[0];

      // handle the first line
      let teamArr = [];

      teamArr.push(`=== [gen8] ${folderName}/${teamName} ===`);

      const teamSets = generate(sets);

      // handle third line next
      teamArr = [...teamArr, ...teamSets];
      return teamArr.join('\n\n');
    })
    .join('\n\n\n');
};

/** PARSE */

export const parse = (teamList: string[]): PokemonSet[] => {
  let item: string | null = null;
  let gender: string | null = null;
  let species = 'Pikachu';
  let nickname: string | null = null;
  let level = 100;
  let happiness = 255;
  let ev: string | null = null;
  let iv: string | null = null;
  let ability: string | null = null;
  let shiny = false;
  let gigantamax = false;
  let nature: string | null = null;
  let moves: string[] = [];

  return teamList.map((t: string) => {
    // We need to clear the values to default, otherwise they will persist.

    const lineList = t.split('\n');
    const rest = lineList.slice(1, lineList.length);
    const s = lineList[0].trim();

    item = null;
    gender = null;
    species = 'Pikachu';
    nickname = null;
    level = 100;
    happiness = 255;
    ev = null;
    iv = null;
    ability = null;
    shiny = false;
    gigantamax = false;
    nature = null;
    moves = [];

    if (NICKNAME_GEN_AND_ITEM_RE.test(s)) {
      const sngi = s.match(NICKNAME_GEN_AND_ITEM_RE) || [];
      nickname = sngi[1].trim();
      species = sngi[2].trim();
      gender = sngi[3].trim();
      item = sngi[4].trim();
    } else if (NICKNAME_NO_ITEM_RE.test(s)) {
      const ns = s.match(NICKNAME_NO_ITEM_RE) || [];
      nickname = ns[1].trim();
      species = ns[2].trim();
    } else if (NICKNAME_AND_ITEM_RE.test(s)) {
      const sni = s.match(NICKNAME_AND_ITEM_RE) || [];
      nickname = sni[1].trim();
      species = sni[2].trim();
      item = sni[3].trim();
    } else if (NICKNAME_GEN_NO_ITEM_RE.test(s)) {
      const sng = s.match(NICKNAME_GEN_NO_ITEM_RE) || [];
      nickname = sng[1].trim();
      species = sng[2].trim();
      gender = sng[3].trim();
    } else if (NO_NICKNAME_GEN_AND_ITEM_RE.test(s)) {
      const sgi = s.match(NO_NICKNAME_GEN_AND_ITEM_RE) || [];
      species = sgi[1].trim();
      gender = sgi[2].trim();
      item = sgi[3].trim();
    } else if (NO_NICKNAME_AND_ITEM_RE.test(s)) {
      const si = s.match(NO_NICKNAME_AND_ITEM_RE) || [];
      species = si[1].trim();
      item = si[2].trim();
    } else {
      species = s;
    }

    for (let i = 0; i < rest.length; i++) {
      const line = rest[i].trim();

      if (line.startsWith('Ability:')) {
        ability = line.split(': ')[1];
      } else if (line.startsWith('Level:')) {
        level = Number(line.split(': ')[1]);
      } else if (line.startsWith('Shiny:')) {
        shiny = true;
      } else if (line.startsWith('Gigantamax:')) {
        gigantamax = true;
      } else if (line.startsWith('Happiness:')) {
        happiness = Number(line.split(': ')[1]);
      } else if (line.startsWith('EVs:')) {
        ev = line.split(': ')[1];
      } else if (line.endsWith('Nature')) {
        nature = line.split(' ')[0];
      } else if (line.startsWith('IVs:')) {
        iv = line.split(': ')[1];
      } else if (line.startsWith('- ')) {
        const moveLine = line.slice(1, line.length).trim();

        moves.push(moveLine);
      }
    }

    const setFinal = {
      nickname: nickname,
      species: species,
      gender: gender,
      item: item,
      ability: ability,
      level: level,
      shiny: shiny,
      gigantamax: gigantamax,
      happiness: happiness,
      hp_ev: evIvParser(ev, 'ev')[0],
      atk_ev: evIvParser(ev, 'ev')[1],
      def_ev: evIvParser(ev, 'ev')[2],
      spa_ev: evIvParser(ev, 'ev')[3],
      spd_ev: evIvParser(ev, 'ev')[4],
      spe_ev: evIvParser(ev, 'ev')[5],
      nature: nature,
      hp_iv: evIvParser(iv, 'iv')[0],
      atk_iv: evIvParser(iv, 'iv')[1],
      def_iv: evIvParser(iv, 'iv')[2],
      spa_iv: evIvParser(iv, 'iv')[3],
      spd_iv: evIvParser(iv, 'iv')[4],
      spe_iv: evIvParser(iv, 'iv')[5],
      move_one: moves[0],
      move_two: moves[1] ? moves[1] : null,
      move_three: moves[2] ? moves[2] : null,
      move_four: moves[3] ? moves[3] : null,
    };

    return setFinal;
  });
};

export const showdownParse = (input: string): PokemonSet[] => {
  const teamsList = input.split('\n\n');
  return parse(teamsList);
};

export const showdownFolderParse = (input: string): ParseReturn[] => {
  // TODO: Add this as part of the teams
  let format: string;
  // TODO: Check against the folder name
  let folder: string;
  let teamname = '';

  // parsing into teams if they exist (if they don't, theres no double line break)

  const folderList = input.split('\n\n\n'); // this splits now by 3 new lines, as the folders are set up this way.

  // parsing the individual teams

  return folderList.map((team: string) => {
    const lineList = team.split('\n\n');
    const idLine = lineList[0].trim();

    if (FOLDERPARSE.test(idLine)) {
      const folderMatch = idLine.match(FOLDERPARSE) || [];
      // eslint-disable-next-line
      format = folderMatch[1].trim(); // unused for now
      // eslint-disable-next-line
      folder = folderMatch[2].trim(); // might be needed for validation, dont need now
      teamname = folderMatch[3].trim(); // use this!
    }

    const teamList = lineList.slice(1);

    const setList = parse(teamList);

    const final = {} as ParseReturn;
    final[teamname] = setList as PokemonSet[];
    return final;
  });
};

/**
 * This will only allow updating of the set-state callback if the character is a 0-9 digit
 * @param e HTML Input Change Event element
 * @param setStateCallback A set-state callback, i.e. setHpIv
 */
export const numberInputOnChange = (
  e: ChangeEvent<HTMLInputElement>,
  setStateCallback: (value: SetStateAction<NumberInput>) => void
): void => {
  const re = /^[0-9\b]+$/;
  if (e.target.value === '' || re.test(e.target.value)) {
    setStateCallback({ value: Number(e.target.value), touched: true });
  }
};
