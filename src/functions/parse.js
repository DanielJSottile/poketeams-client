/* This parser is based off of my own parser made in Python for this exact functionality.
Python standard things like .partion have been changed to .split, and the way the Regex is
handled is a bit different from Python, but the code is essentially the same. */


// Singular function that handles the parsing

function showdownParse(input) {

  // RegEx's

  const NICKNAME_GEN_AND_ITEM_RE = /^(.*) \((.*)\) \(([MF])\) @ (.*)$/; 
  const NICKNAME_AND_ITEM_RE = /^(.*) \((.{2,})\) @ (.*)$/;
  const NICKNAME_GEN_NO_ITEM_RE = /^(.*) \((.*)\) \(([MF])\)$/;
  const NICKNAME_NO_ITEM_RE = /^(.*) \((.*)\)$/;
  const NO_NICKNAME_GEN_AND_ITEM_RE = /^(.*) \(([MF])\) @ (.*)$/;
  const NO_NICKNAME_AND_ITEM_RE = /^(.*) @ (.*) $/;

  // parsing

  const lineList = input.split('\n');
  const rest = lineList.slice(1, lineList.length - 1);
  const s = lineList[0].trim();

  let item = null;
  let gender = 'Any';
  let species = null;
  let nickname = null;
  let level = '100';
  let happiness = '255';
  let ev = null; // need to break this down into 6 ev values
  let iv = null; // need to break this down into 6 iv values
  let ability = null;
  let shiny = null;
  let nature = null;
  let moves = []; // need to break this down into 4 move values


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

      level = line.split(': ')[1];

    } else if (line.startsWith('Shiny:')){

      shiny = line.split(': ')[1];

    } else if (line.startsWith('Happiness:')){

      happiness = line.split(': ')[1];

    } else if (line.startsWith('EVs:')){

      ev = line.split(': ')[1];

    } else if (line.endsWith('Nature')){

      nature = line.split(' ')[0];

    } else if (line.startsWith('IVs:')){

      iv = line.split(': ')[1];

    } else if (line.startsWith('- ')){
      
      moves.splice(1, 0, (line.slice(2, line.length)));
    }
  }

  return {
    nickname: nickname,
    species: species,
    gender: gender,
    item: item,
    ability: ability,
    level: level,
    shiny: shiny,
    happiness: happiness,
    ev: ev,
    nature: nature,
    iv: iv,
    moves: moves
  };
};

module.exports = {showdownParse};