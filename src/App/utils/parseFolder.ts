import { PokemonSet } from '../@types';

/* This is based off the parse.ts file, but this is for the entire Folder import.  This may be 
adapted in the future to import entire collections as it parses the same data. */

// Helper Functions

type ParseReturn = {
  string: PokemonSet[];
  [key: string]: PokemonSet[];
};

function evIvParser(string: string | null, val: string): number[] {
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

    if (match![2] === 'HP') {
      hpV = Number(match![1]);
    } else if (match![2] === 'Atk') {
      atkV = Number(match![1]);
    } else if (match![2] === 'Def') {
      defV = Number(match![1]);
    } else if (match![2] === 'SpA') {
      spaV = Number(match![1]);
    } else if (match![2] === 'SpD') {
      spdV = Number(match![1]);
    } else if (match![2] === 'Spe') {
      speV = Number(match![1]);
    }
  });

  return [hpV, atkV, defV, spaV, spdV, speV];
}

// Parsing Function for Folder Format

export default function showdownFolderParse(input: string): ParseReturn[] {
  // Regular Expressions

  const FOLDERPARSE = /^=== \[(.*)\] (.*)\/(.*) ===$/;
  const NICKNAME_GEN_AND_ITEM_RE = /^(.*) \((.*)\) \(([MF])\) @ (.*)$/;
  const NICKNAME_AND_ITEM_RE = /^(.*) \((.{2,})\) @ (.*)$/;
  const NICKNAME_GEN_NO_ITEM_RE = /^(.*) \((.*)\) \(([MF])\)$/;
  const NICKNAME_NO_ITEM_RE = /^(.*) \((.*)\)$/;
  const NO_NICKNAME_GEN_AND_ITEM_RE = /^(.*) \(([MF])\) @ (.*)$/;
  const NO_NICKNAME_AND_ITEM_RE = /^(.*) @ (.*)$/;

  // eslint-disable-next-line
  // TODO: Add this as part of the teams
  let format: string;
  // eslint-disable-next-line
  // TODO: Check against the folder name
  let folder: string;
  let teamname: string;
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
  let nature: string | null = null;
  let moves: string[] = [];

  // parsing into teams if they exist (if they don't, theres no double line break)

  const folderList = input.split('\n\n\n'); // this splits now by 3 new lines, as the folders are set up this way.

  // parsing the individual teams

  return folderList.map((team: string) => {
    const lineList = team.split('\n\n');
    const idLine = lineList[0].trim();

    if (FOLDERPARSE.test(idLine)) {
      const folderMatch = idLine.match(FOLDERPARSE);
      // eslint-disable-next-line
      format = folderMatch![1].trim(); // unused for now
      // eslint-disable-next-line
      folder = folderMatch![2].trim(); // might be needed for validation, dont need now
      teamname = folderMatch![3].trim(); // use this!
    }

    const teamList = lineList.slice(1);

    const setList = teamList.map((t: string) => {
      // We need to clear the values to default, otherwise they will persist.

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
      nature = null;
      moves = [];

      const lineList = t.split('\n');
      const rest = lineList.slice(1, lineList.length);
      const s = lineList[0].trim();

      if (NICKNAME_GEN_AND_ITEM_RE.test(s)) {
        const sngi = s.match(NICKNAME_GEN_AND_ITEM_RE);
        nickname = sngi![1].trim();
        species = sngi![2].trim();
        gender = sngi![3].trim();
        item = sngi![4].trim();
      } else if (NICKNAME_NO_ITEM_RE.test(s)) {
        const ns = s.match(NICKNAME_NO_ITEM_RE);
        nickname = ns![1].trim();
        species = ns![2].trim();
      } else if (NICKNAME_AND_ITEM_RE.test(s)) {
        const sni = s.match(NICKNAME_AND_ITEM_RE);
        nickname = sni![1].trim();
        species = sni![2].trim();
        item = sni![3].trim();
      } else if (NICKNAME_GEN_NO_ITEM_RE.test(s)) {
        const sng = s.match(NICKNAME_GEN_NO_ITEM_RE);
        nickname = sng![1].trim();
        species = sng![2].trim();
        gender = sng![3].trim();
      } else if (NO_NICKNAME_GEN_AND_ITEM_RE.test(s)) {
        const sgi = s.match(NO_NICKNAME_GEN_AND_ITEM_RE);
        species = sgi![1].trim();
        gender = sgi![2].trim();
        item = sgi![3].trim();
      } else if (NO_NICKNAME_AND_ITEM_RE.test(s)) {
        const si = s.match(NO_NICKNAME_AND_ITEM_RE);
        species = si![1].trim();
        item = si![2].trim();
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
    const final = {} as ParseReturn;
    final[teamname] = setList as PokemonSet[];
    return final;
  });
}
