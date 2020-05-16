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

export default function showdownGenerate(input) {

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
      setArr.push(`Ability: ${set.ability}`);
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