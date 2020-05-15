const POKEMON = require('./pokemon');


function isLegalSpecies(species){

  let flag = false;

  POKEMON.forEach(pokemon => {
     if (species.toLowerCase() === pokemon.species.toLowerCase()){
       flag = !flag;
     }
  });
  return flag;
};

function findSpecies(species){
  if(isLegalSpecies(species)){

    let result;

   POKEMON.forEach(pokemon => {
      if (species.toLowerCase() === pokemon.species.toLowerCase()){
        result = pokemon;
      }
    })
    return result;
  } 
};

function returnType(species){

  let types;

  if (isLegalSpecies(species)) {
    types = findSpecies(species).types;
  }
  return types;
};

function returnGenderStatus(species){
  if (isLegalSpecies(species)) {
    let pokemon = findSpecies(species);
    if (Object.keys(pokemon).includes('genderLock')){
      return pokemon.genderLock
    } 
    return false;
  }
};

module.exports = {
  isLegalSpecies,
  findSpecies,
  returnType,
  returnGenderStatus
};