/* This parser is based off of my own parser made in Python for this exact functionality.
Python standard things like .partion have been changed to .split, and the way the Regex is
handled is a bit different from Python, but the code is essentially the same. */

// helper functions

function evIvParser(string: string, val: string){
  let hpV = 0;
  let atkV = 0;
  let defV = 0;
  let spaV = 0;
  let spdV = 0;
  let speV = 0;

  if (val === 'iv'){
  hpV = 31;
  atkV = 31;
  defV = 31;
  spaV = 31;
  spdV = 31;
  speV = 31;  
  };

  if(!string){
    return [hpV, atkV, defV, spaV, spdV, speV];
  }
  
  const evIvRE = /(\d{1,3}) (.*)/

  let evArr = string.split('/');

  evArr.forEach(value => {
    
    let trim = value.trim();
    let match = trim.match(evIvRE)

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

// Singular function that handles the parsing for teams as well as single sets

export default function showdownParse(input: string) {

  // RegEx's

  const NICKNAME_GEN_AND_ITEM_RE = /^(.*) \((.*)\) \(([MF])\) @ (.*)$/; 
  const NICKNAME_AND_ITEM_RE = /^(.*) \((.{2,})\) @ (.*)$/;
  const NICKNAME_GEN_NO_ITEM_RE = /^(.*) \((.*)\) \(([MF])\)$/;
  const NICKNAME_NO_ITEM_RE = /^(.*) \((.*)\)$/;
  const NO_NICKNAME_GEN_AND_ITEM_RE = /^(.*) \(([MF])\) @ (.*)$/;
  const NO_NICKNAME_AND_ITEM_RE = /^(.*) @ (.*)$/;

  // parsing into teams if they exist (if they don't, theres no double line break)

  const teamsList = input.split('\n\n');

  // parsing the individual teams

  return teamsList.map((team: any)=> {
    const lineList = team.split('\n');
    const rest = lineList.slice(1, lineList.length);
    const s = lineList[0].trim();

  
    let item = null;
    let gender = null;
    let species = 'Pikachu';
    let nickname = null;
    let level = 100;
    let happiness = 255;
    let ev = null; 
    
    let iv = null; 
   
    let ability = null;
    let shiny = false;
    let nature = null;
    let moves: any[] = [];
    
  
  
    if (NICKNAME_GEN_AND_ITEM_RE.test(s)) {
  
      let sngi = s.match(NICKNAME_GEN_AND_ITEM_RE);
      nickname = sngi[1].trim();
      species = sngi[2].trim();
      gender = sngi[3].trim();
      item = sngi[4].trim();
  
    } else if (NICKNAME_NO_ITEM_RE.test(s)) {
  
      let ns = s.match(NICKNAME_NO_ITEM_RE);
      nickname = ns[1].trim();
      species = ns[2].trim();
       
    
    } else if (NICKNAME_AND_ITEM_RE.test(s)) { 
  
      let sni = s.match(NICKNAME_AND_ITEM_RE);
      nickname = sni[1].trim();
      species = sni[2].trim();
      item = sni[3].trim();
  
    } else if (NICKNAME_GEN_NO_ITEM_RE.test(s)) {
  
      let sng = s.match(NICKNAME_GEN_NO_ITEM_RE);
      nickname = sng[1].trim();
      species = sng[2].trim();
      gender = sng[3].trim();
  
  
    } else if (NO_NICKNAME_GEN_AND_ITEM_RE.test(s)) {
  
      let sgi = s.match(NO_NICKNAME_GEN_AND_ITEM_RE);
      species = sgi[1].trim();
      gender = sgi[2].trim();
      item = sgi[3].trim();
  
    } else if (NO_NICKNAME_AND_ITEM_RE.test(s)) {
  
      let si = s.match(NO_NICKNAME_AND_ITEM_RE);
      species = si[1].trim();
      item = si[2].trim();
  
    } else {
      species = s;
      
    }
    
    for (let i = 0; i < rest.length; i ++){
      const line = rest[i].trim();
  
      if (line.startsWith('Ability:')){
  
        ability = line.split(': ')[1];
  
      } else if (line.startsWith('Level:')){
  
        level = Number(line.split(': ')[1]);
  
      } else if (line.startsWith('Shiny:')){
  
        shiny = true;
  
      } else if (line.startsWith('Happiness:')){
  
        happiness = Number(line.split(': ')[1]);
  
      } else if (line.startsWith('EVs:')){
  
        ev = line.split(': ')[1];
  
      } else if (line.endsWith('Nature')){
  
        nature = line.split(' ')[0];
  
      } else if (line.startsWith('IVs:')){
  
        iv = line.split(': ')[1];
  
      } else if (line.startsWith('- ')){
       
        const moveLine = line.slice(1, line.length).trim();
        
        moves.push(moveLine);

      }
    }
  
    let setFinal = {
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
      move_four: moves[3] ? moves[3] : null
    };

    // We need to clear the values, otherwise they will persist.

    item = null;
    gender = null;
    species = 'Pikachu';
    nickname = null;
    level = 100;
    happiness  = 255;
    ev  = null; 
    iv = null; 
    ability = null;
    shiny = false;
    nature = null;
    moves = [];
    
    return setFinal;
  })
};
