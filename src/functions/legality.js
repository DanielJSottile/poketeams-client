const POKEMON = require('./pokemon');

const ALL= /^(.*)\W(.*)$/; 
const TYPENULL = /^(.*):\W(.*)$/;

const exceptions = [
  'charizard-mega-y',
  'charizard-mega-x',
  'mewtwo-mega-y',
  'mewtwo-mega-x',
  'darmanitan-galar-zen',
  'ho-oh',
  'kommo-o',
  'jangmo-o',
  'hakamo-o',
  'sirfetch\'d',
  'farfetch\'d',
  'necrozma-dusk-mane',
  'necrozma-dawn-wings',
  'tapu bulu',
  'tapu lele',
  'tapu fini',
  'tapu koko',
]
  
const infinite = [
  'arcanine-mega',
  'rapidash-mega',
  'meganium-mega',
  'octillery-mega',
  'sunflora-mega',
  'dunsparce-mega',
  'mightyena-mega',
  'delcatty-mega',
  'flygon-mega',
  'milotic-mega',
  'castform-mega',
  'luxray-mega',
  'floatzel-mega',
  'yanmega-mega',
  'cresselia-mega',
  'darkrai-mega',
  'samurott-mega',
  'klinklang-mega',
  'beartic-mega',
  'noivern-mega',
  'golisopod-mega',
  'cinderace-mega',
  'sirfetch\'d-mega',
  'tyranitar-gmax',
  'regigigas-gmax',
  'jellicent-gmax',
  'hydreigon-gmax',
  'rotom-dex',
  'rotom-phone',
  'rotom-melee',
  'rotom-speak',
  'chesnaught-clemont',
  'delphox-serena',
  'unown-origin',
  'unown-alphabet',
  'kyurem-omnipotent',
  'mewtwo-armored',
  'nihilego-fusion',
  'guzzlord-fusion',
  'celebi-alternate',
  'arceus-infinite',
  'silvally-infinite',
  'castform-sandy',
  'castform-nasty',
  'alcremie-black-forest'
  ]

// Legality

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

  let types = ['???'];

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

function returnIconSprite(species, shiny){

  if (isLegalSpecies(species) && findSpecies(species).num > 0) {
    if (infinite.includes(species.toLowerCase())){
      return `https://imgur.com/m0p2ljo.png`
    }

    if (exceptions.includes(species.toLowerCase())) {
      let dashMatch = species.match(ALL);
      let partOne = dashMatch[1];
      let partTwo = dashMatch[2];
      species = `${partOne}${partTwo}`;
      if(!shiny){
        return `https://play.pokemonshowdown.com/sprites/ani/${species.toLowerCase()}.gif`;
      } else {
        return `https://play.pokemonshowdown.com/sprites/ani-shiny/${species.toLowerCase()}.gif`;
      }
    } else if (species.toLowerCase() === 'type: null') { // special case for typenull
      let dashMatch = species.match(TYPENULL);
      let partOne = dashMatch[1];
      let partTwo = dashMatch[2];
      species = `${partOne}${partTwo}`;
      if(!shiny){
        return `https://play.pokemonshowdown.com/sprites/ani/${species.toLowerCase()}.gif`;
      } else {
        return `https://play.pokemonshowdown.com/sprites/ani-shiny/${species.toLowerCase()}.gif`;
      }
    } 

    if(!shiny){
      return `https://play.pokemonshowdown.com/sprites/ani/${species.toLowerCase()}.gif`;
    } else {
      return `https://play.pokemonshowdown.com/sprites/ani-shiny/${species.toLowerCase()}.gif`;
    }
  } else {
    return `https://imgur.com/m0p2ljo.png`
  }
};

function returnTypeIcon(types) {
  const urls = types.map(type => {
    switch (type.toLowerCase()) {
      case 'bug':
      return `https://imgur.com/9ex5BV6.png`;
      case 'dark':
      return `https://imgur.com/uoXwMZF.png`;
      case 'dragon':
      return `https://imgur.com/Agm9LSg.png`;
      case 'electric':
      return `https://imgur.com/6rrimLN.png`;
      case 'fairy':
      return `https://imgur.com/DKCsIOv.png`;
      case 'fighting':
      return `https://imgur.com/0PiaukU.png`;
      case 'fire':
      return `https://imgur.com/AdJd8ua.png`;
      case 'flying':
      return `https://imgur.com/hmXQFXy.png`;
      case 'ghost':
      return `https://imgur.com/sOLJoNj.png`;
      case 'grass':
      return `https://imgur.com/emZGbVr.png`;
      case 'ground':
      return `https://imgur.com/c4gnllj.png`;
      case 'ice':
      return `https://imgur.com/3NLAUft.png`;
      case 'infinite':
      return `https://imgur.com/pINWaZD.png`;
      case 'normal':
      return `https://imgur.com/f4bdXSF.png`;
      case 'poison':
      return `https://imgur.com/wPavZFT.png`;
      case 'psychic':
      return `https://imgur.com/emftvEC.png`;
      case 'rock':
      return `https://imgur.com/iqjgywR.png`;
      case 'steel':
      return `https://imgur.com/1aapukI.png`;
      case 'water':
      return `https://imgur.com/7gDH9B8.png`;
      case '???':
      return `https://imgur.com/kHG7M8L.png`;
      default:
      return `https://imgur.com/kHG7M8L.png`;
    }
  })
  return urls;
}

module.exports =  {
  isLegalSpecies,
  findSpecies,
  returnType,
  returnGenderStatus,
  returnIconSprite,
  returnTypeIcon
};