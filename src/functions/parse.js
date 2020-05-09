/* This parser is based off of my own parser made in Python for this exact functionality.
Python standard things like .partion have been changed to .split, and the way the Regex is
handled is a bit different from Python, but the code is essentially the same. */

// helper functions

function evIvParser(string, val){
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

  evArr = string.split('/');

  evArr.forEach(value => {
    
    trim = value.trim();
    let match = trim.match(evIvRE)

    if (match[2] === 'HP') {
      hpV = Number(match[1]);
    } else if (match[2] === 'Atk') {
      atkV = Number(match[1]);
    } else if (match[2] === 'Def') {
      defV = Number(match[1]);
    } else if (match[2] === 'SpA') {
      spaV = Number(match[1]);
    } else if (match[2] === 'SpD') {
      spdV = Number(match[1]);
    } else if (match[2] === 'Spe') {
      speV = Number(match[1]);
    }

  });

  return [hpV, atkV, defV, spaV, spdV, speV];

}

// Singular function that handles the parsing for teams as well as single sets

function showdownParse(input) {

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

  return teamsList.map(team => {
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
    let moves = [];
    
  
  
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
  
        shiny = line.split(': ')[1];
  
      } else if (line.startsWith('Happiness:')){
  
        happiness = Number(line.split(': ')[1]);
  
      } else if (line.startsWith('EVs:')){
  
        ev = line.split(': ')[1];
  
      } else if (line.endsWith('Nature')){
  
        nature = line.split(' ')[0];
  
      } else if (line.startsWith('IVs:')){
  
        iv = line.split(': ')[1];
  
      } else if (line.startsWith('- ')){
       
        moves.splice(1, 0, (line.slice(1, line.length)).trim());

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
      hpEv: evIvParser(ev, 'ev')[0],
      atkEv: evIvParser(ev, 'ev')[1],
      defEv: evIvParser(ev, 'ev')[2],
      spaEv: evIvParser(ev, 'ev')[3],
      spdEv: evIvParser(ev, 'ev')[4],
      speEv: evIvParser(ev, 'ev')[5],
      nature: nature,
      hpIv: evIvParser(iv, 'iv')[0],
      atkIv: evIvParser(iv, 'iv')[1],
      defIv: evIvParser(iv, 'iv')[2],
      spaIv: evIvParser(iv, 'iv')[3],
      spdIv: evIvParser(iv, 'iv')[4],
      speIv: evIvParser(iv, 'iv')[5],
      moveOne: moves[0],
      moveTwo: moves[1] ? moves[1] : null,
      moveThree: moves[2] ? moves[2] : null,
      moveFour: moves[3] ? moves[3] : null
    };
  })
};

// pseudo-testing

const testOne = `Aegi Boi (Aegislash) (F) @ Choice Band  
Ability: Stance Change  
Level: 99  
Shiny: Yes  
Happiness: 252  
EVs: 164 HP / 252 Atk / 8 Def / 20 SpA / 8 SpD / 56 Spe  
Brave Nature  
IVs: 30 HP / 29 Def / 0 SpA / 28 SpD / 0 Spe  
- Close Combat  
- Head Smash  
- Iron Head  
- Shadow Claw`;

const testTwo = `Darkrai @ darkraite  
Ability: Bad Dreams  
Shiny: Yes  
EVs: 252 SpA / 4 SpD / 252 Spe  
Timid Nature  
- perditionspyre  
- Dark Pulse  
- Nasty Plot  
- Dark Void  

Zygarde-Complete @ Leftovers  
Ability: Power Construct  
EVs: 232 Atk / 44 SpD / 232 Spe  
Adamant Nature  
- Thousand Arrows  
- Dragon Tail  
- Substitute  
- Dragon Dance  

Groudon-Primal @ Red Orb  
Ability: Desolate Land  
EVs: 248 HP / 8 Def / 252 SpD  
Conscientious Nature  
IVs: 0 Spe  
- Precipice Blades  
- Dragon Tail  
- Toxic  
- Stealth Rock  

Yveltal @ Safety Goggles  
Ability: Dark Aura  
EVs: 248 HP / 180 Def / 80 Spe  
Fastidious Nature  
IVs: 0 Atk  
- Foul Play  
- Toxic  
- Roost  
- Taunt  

Arceus-Water @ Splash Plate  
Ability: Multitype  
EVs: 248 HP / 244 Def / 16 Spe  
Meticulous Nature  
IVs: 0 Atk  
- Ice Beam  
- Toxic  
- Recover  
- Defog  

Arceus-Infinite @ infinitiumz  
Ability: Multitype  
EVs: 248 HP / 8 Def / 148 SpD / 96 Spe  
Timid Nature  
- gravitybeam  
- Will-O-Wisp`;

console.log(showdownParse(testOne));
console.log(showdownParse(testTwo));


module.exports = {showdownParse};