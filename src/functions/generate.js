/* This generator function is designed to take a format of the outcome of the parser.js
and turn it back into a string of text that matches the original format */

// helper functions

function evGenerator(ob){
  let evArr = [];

  if((ob.hpEv === 0 && ob.atkEv === 0 && ob.defEv === 0 && ob.spaEv === 0 && ob.spdEv === 0 && ob.speEv === 0)){
    return;
  }

  if (ob.hpEv > 0){
    evArr.push(`${ob.hpEv} HP`)
  } if (ob.atkEv > 0){
    evArr.push(`${ob.atkEv} Atk`)
  } if (ob.defEv > 0){
    evArr.push(`${ob.defEv} Def`)
  } if (ob.spaEv > 0){
    evArr.push(`${ob.spaEv} SpA`)
  } if (ob.spdEv > 0){
    evArr.push(`${ob.spdEv} SpD`)
  } if (ob.speEv > 0){
    evArr.push(`${ob.speEv} Spe`)
  }

  return evArr.join(' / ');

}

function ivGenerator(ob){
  let ivArr = [];

  if((ob.hpIv === 31 && ob.atkIv === 31 && ob.defIv === 31 && ob.spaIv === 31 && ob.spdIv === 31 && ob.speIv === 31)){
    return;
  }

  if (ob.hpIv < 31){
    ivArr.push(`${ob.hpIv} HP`)
  } if (ob.atkIv < 31){
    ivArr.push(`${ob.atkIv} Atk`)
  } if (ob.defIv < 31){
    ivArr.push(`${ob.defIv} Def`)
  } if (ob.spaIv < 31){
    ivArr.push(`${ob.spaIv} SpA`)
  } if (ob.spdIv < 31){
    ivArr.push(`${ob.spdIv} SpD`)
  } if (ob.speIv < 31){
    ivArr.push(`${ob.speIv} Spe`)
  }

  return ivArr.join(' / ');

}


// generator function

function showdownGenerate(input) {

  return input.map(set => {

    let setArr = [];
    
    // handle first line first (redo this part pls)

    if (set.nickname && set.gender && set.item) { // nick, gender, item
      setArr.push(`${set.nickname} (${set.species}) (${set.gender}) @ ${set.item}`);
    } else if (set.nickname && !set.gender && set.item) { //nick, item
      setArr.push(`${set.nickname} (${set.species}) @ ${set.item}`);
    } else if (set.nickname && set.gender && !set.item) { // nick, gender
      setArr.push(`${set.nickname} (${set.species}) (${set.gender})`);
    } else if (set.nickname && !set.gender && !set.item) { // nick
      setArr.push(`${set.nickname} (${set.species})`);
    } else if (!set.nickname && set.gender && set.item) { // gender, item
      setArr.push(`${set.species} (${set.gender}) @ ${set.item}`);
    } else if (!set.nickname && set.gender && !set.item) { // gender
      setArr.push(`${set.species} (${set.gender})`);
    } else if (!set.nickname && !set.gender && set.item) { // item
      setArr.push(`${set.species} @ ${set.item}`);
    } else {
      setArr.push(`${set.species}`);
    }

    // the rest of it

    if (set.ability){
      setArr.push(`Abiity: ${set.ability}`);
    }

    if (set.level < 100){
      setArr.push(`Level: ${set.level}`);
    }

    if (set.shiny){
      setArr.push(`Shiny: Yes`);
    }

    if (set.happiness < 255){
      setArr.push(`Happiness: ${set.happiness}`);
    }

    // ev's

    if(evGenerator(set)){
      setArr.push(`EVs: ${evGenerator(set)}`);
    }
    
    // nature

    if (set.nature){
      setArr.push(`${set.nature} Nature`);
    }

    // iv's

    if(ivGenerator(set)){
      setArr.push(`IVs: ${ivGenerator(set)}`);
    }

    // moves

    if (!set.moveOne){
      setArr.push('- Tackle');
    } else {
      setArr.push(`- ${set.moveOne}`);
    }

    if (set.moveTwo){
      setArr.push(`- ${set.moveTwo}`);
    }

    if (set.moveThree){
      setArr.push(`- ${set.moveThree}`);
    }

    if (set.moveFour){
      setArr.push(`- ${set.moveFour}`);
    }

    return setArr.join('\n');
    
  }).join('\n\n')
};

// pseudo-test

const set = [
  {
    nickname: 'Aegi Boi',
    species: 'Aegislash',
    gender: 'F',
    item: 'Choice Band',
    ability: 'Stance Change',
    level: 99,
    shiny: 'Yes',
    happiness: 252,
    hpEv: 164,
    atkEv: 252,
    defEv: 8,
    spaEv: 20,
    spdEv: 8,
    speEv: 56,
    nature: 'Brave',
    hpIv: 30,
    atkIv: 31,
    defIv: 29,
    spaIv: 0,
    spdIv: 28,
    speIv: 0,
    moveOne: 'Close Combat',
    moveTwo: 'Shadow Claw',
    moveThree: 'Iron Head',
    moveFour: 'Head Smash'
  }
];


const team = [
  {
    nickname: null,
    species: 'Darkrai',
    gender: null,
    item: 'darkraite',
    ability: 'Bad Dreams',
    level: 100,
    shiny: 'Yes',
    happiness: 255,
    hpEv: 0,
    atkEv: 0,
    defEv: 0,
    spaEv: 252,
    spdEv: 4,
    speEv: 252,
    nature: 'Timid',
    hpIv: 31,
    atkIv: 31,
    defIv: 31,
    spaIv: 31,
    spdIv: 31,
    speIv: 31,
    moveOne: 'perditionspyre',
    moveTwo: 'Dark Void',
    moveThree: 'Nasty Plot',
    moveFour: 'Dark Pulse'
  },
  {
    nickname: null,
    species: 'Zygarde-Complete',
    gender: null,
    item: 'Leftovers',
    ability: 'Power Construct',
    level: 100,
    shiny: false,
    happiness: 255,
    hpEv: 0,
    atkEv: 232,
    defEv: 0,
    spaEv: 0,
    spdEv: 44,
    speEv: 232,
    nature: 'Adamant',
    hpIv: 31,
    atkIv: 31,
    defIv: 31,
    spaIv: 31,
    spdIv: 31,
    speIv: 31,
    moveOne: 'Thousand Arrows',
    moveTwo: 'Dragon Dance',
    moveThree: 'Substitute',
    moveFour: 'Dragon Tail'
  },
  {
    nickname: null,
    species: 'Groudon-Primal',
    gender: null,
    item: 'Red Orb',
    ability: 'Desolate Land',
    level: 100,
    shiny: false,
    happiness: 255,
    hpEv: 248,
    atkEv: 0,
    defEv: 8,
    spaEv: 0,
    spdEv: 252,
    speEv: 0,
    nature: 'Conscientious',
    hpIv: 31,
    atkIv: 31,
    defIv: 31,
    spaIv: 31,
    spdIv: 31,
    speIv: 0,
    moveOne: 'Precipice Blades',
    moveTwo: 'Stealth Rock',
    moveThree: 'Toxic',
    moveFour: 'Dragon Tail'
  },
  {
    nickname: null,
    species: 'Yveltal',
    gender: null,
    item: 'Safety Goggles',
    ability: 'Dark Aura',
    level: 100,
    shiny: false,
    happiness: 255,
    hpEv: 248,
    atkEv: 0,
    defEv: 180,
    spaEv: 0,
    spdEv: 0,
    speEv: 80,
    nature: 'Fastidious',
    hpIv: 31,
    atkIv: 0,
    defIv: 31,
    spaIv: 31,
    spdIv: 31,
    speIv: 31,
    moveOne: 'Foul Play',
    moveTwo: 'Taunt',
    moveThree: 'Roost',
    moveFour: 'Toxic'
  },
  {
    nickname: null,
    species: 'Arceus-Water',
    gender: null,
    item: 'Splash Plate',
    ability: 'Multitype',
    level: 100,
    shiny: false,
    happiness: 255,
    hpEv: 248,
    atkEv: 0,
    defEv: 244,
    spaEv: 0,
    spdEv: 0,
    speEv: 16,
    nature: 'Meticulous',
    hpIv: 31,
    atkIv: 0,
    defIv: 31,
    spaIv: 31,
    spdIv: 31,
    speIv: 31,
    moveOne: 'Ice Beam',
    moveTwo: 'Defog',
    moveThree: 'Recover',
    moveFour: 'Toxic'
  },
  {
    nickname: null,
    species: 'Arceus-Infinite',
    gender: null,
    item: 'infinitiumz',
    ability: 'Multitype',
    level: 100,
    shiny: false,
    happiness: 255,
    hpEv: 248,
    atkEv: 0,
    defEv: 8,
    spaEv: 0,
    spdEv: 148,
    speEv: 96,
    nature: 'Timid',
    hpIv: 31,
    atkIv: 31,
    defIv: 31,
    spaIv: 31,
    spdIv: 31,
    speIv: 31,
    moveOne: 'gravitybeam',
    moveTwo: 'Will-O-Wisp',
    moveThree: null,
    moveFour: null
  }
];

console.log(showdownGenerate(set));
console.log('\n');
console.log(showdownGenerate(team));


module.exports = {showdownGenerate};