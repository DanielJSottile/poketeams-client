import POKEMON from './pokemon';

// Regular Expressions

const ALL: RegExp = /^(.*)\W(.*)$/;
const TYPENULL: RegExp = /^(.*):\W(.*)$/;
const MIME: RegExp = /^(.*).\W(.*)$/;
const BADBIRB: RegExp = /^(.*)’(.*)$/;
const FARGALAR: RegExp = /^(.*)'(.*)$/;
const MIMEJR: RegExp = /^(.*)\W(.*).$/;
const MIMEGALAR: RegExp = /^(.*). (.*)$/;

// List of 'Exceptions' to regular Regex rules

const exceptions: string[] = [
  'vivillon-icy snow',
  'vivillon-high plains',
  'alcremie-ruby-cream',
  'alcremie-matcha-cream',
  'alcremie-mint-cream',
  'alcremie-lemon-cream',
  'alcremie-salted-cream',
  'alcremie-ruby-swirl',
  'alcremie-caramel-swirl',
  'alcremie-rainbow-swirl',
  'charizard-mega-y',
  'charizard-mega-x',
  'mewtwo-mega-y',
  'mewtwo-mega-x',
  'darmanitan-galar-zen',
  'ho-oh',
  'kommo-o',
  'jangmo-o',
  'hakamo-o',
  "sirfetch'd",
  'sirfetch’d',
  "farfetch'd",
  'farfetch’d',
  'necrozma-dusk-mane',
  'necrozma-dawn-wings',
  'tapu bulu',
  'tapu lele',
  'tapu fini',
  'tapu koko',
  'nidoran-m',
  'nidoran-f',
];

// List of Custom Pokemon

const infinite: string[] = [
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
  'togekiss-mega',
  'yanmega-mega',
  'cresselia-mega',
  'darkrai-mega',
  'samurott-mega',
  'klinklang-mega',
  'beartic-mega',
  'noivern-mega',
  'golisopod-mega',
  'cinderace-mega',
  "sirfetch'd-mega",
  'sirfetch’d-mega',
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
  'celebi-aumagari',
  'arceus-infinite',
  'silvally-infinite',
  'castform-sandy',
  'castform-nasty',
  'alcremie-black-forest',
  'arceus-aumagari',
  'mantine-aumagari',
  'mantyke-aumagari',
  'raikou-aumagari',
  'entei-aumagari',
  'suicune-aumagari',
  'gible-aumagari',
  'gabite-aumagari',
  'garchomp-aumagari',
  'hippowdon-aumagari',
  'pawniard-aumagari',
  'dubsknight',
  'drilbur-aumagari',
  'excadrill-aumagari',
  'urshifu-dragon-fist',
  'urshifu-tiger-claw',

  // not actually Custom, but not added into Showdown Yet
  // TODO: Check if these were added
  'venusaur-gmax',
  'blastoise-gmax',
  'rillaboom-gmax',
  'cinderace-gmax',
  'inteleon-gmax',
  'urshifu',
  'urshifu-rapid-strike',
  'zarude',
  'zarude-dada',
];

// Legality Object With Methods

const LEGALITY = {
  // Legality

  removeWhiteSpaceHyphen(string: string): string {
    return string.replace(/-|:|'|\|.|’|\s/g, '').toLowerCase();
  },

  isLegalSpecies(species: string): boolean {
    if (
      species.toLowerCase() === 'farfetch’d' ||
      species.toLowerCase() === 'sirfetch’d' ||
      species.toLowerCase() === 'farfetch’d-galar' ||
      species.toLowerCase() === 'sirfetch’d-mega'
    ) {
      // very stupid on Showdown to use the different single quote symbol...
      return true;
    }
    if (POKEMON.has(this.removeWhiteSpaceHyphen(species))) {
      return (
        species === POKEMON.get(this.removeWhiteSpaceHyphen(species))?.species
      );
    } else {
      return false;
    }
  },

  findSpecies(species: string): any {
    if (this.isLegalSpecies(species)) {
      return POKEMON.get(this.removeWhiteSpaceHyphen(species));
    }
  },

  returnType(species: string): string[] {
    let types: string[] = ['???'];

    if (this.isLegalSpecies(species)) {
      types = this.findSpecies(species)!.types;
    }
    return types;
  },

  returnGenderStatus(species: string): any {
    if (this.isLegalSpecies(species)) {
      let pokemon = this.findSpecies(species);
      if (Object.keys(pokemon)?.includes('genderLock')) {
        return pokemon?.genderLock;
      }
      return false;
    }
  },

  // These two functions in tandem return valid icon sprites based off of Pokemon Showdown's sprite index.
  // The function below makes things a bit cleaner.

  cleanSpecies(species: string, shiny: boolean, REGEX: RegExp): string {
    let match = species.match(REGEX);
    species = '';
    const cleanMatch = match!.slice(1);
    cleanMatch.forEach((part) => {
      species = species + `${part}`;
    });
    if (!shiny) {
      return `https://play.pokemonshowdown.com/sprites/ani/${species.toLowerCase()}.gif`;
    } else {
      return `https://play.pokemonshowdown.com/sprites/ani-shiny/${species.toLowerCase()}.gif`;
    }
  },

  returnIconSprite(species: string, shiny: boolean): string {
    if (this.isLegalSpecies(species) && this.findSpecies(species).num > 0) {
      if (infinite.includes(species.toLowerCase())) {
        return `https://imgur.com/m0p2ljo.png`;
      }

      if (exceptions.includes(species.toLowerCase())) {
        return this.cleanSpecies(species, shiny, ALL);
      } else if (species.toLowerCase() === 'type: null') {
        // special case for typenull
        return this.cleanSpecies(species, shiny, TYPENULL);
      } else if (
        species.toLowerCase() === 'mr. mime' ||
        species.toLowerCase() === 'mr. rime'
      ) {
        // special case for mr. mime and rime
        return this.cleanSpecies(species, shiny, MIME);
      } else if (
        species.toLowerCase() === 'farfetch’d' ||
        species.toLowerCase() === 'sirfetch’d' ||
        species.toLowerCase() === 'farfetch’d-galar' ||
        species.toLowerCase() === 'sirfetch’d-mega'
      ) {
        // special case for the bad symbol on Showdown...
        return this.cleanSpecies(species, shiny, BADBIRB);
      } else if (species.toLowerCase() === "farfetch'd-galar") {
        // special case for farfetch'd galar
        return this.cleanSpecies(species, shiny, FARGALAR);
      } else if (species.toLowerCase() === 'mime jr.') {
        // special case for mime jr.
        return this.cleanSpecies(species, shiny, MIMEJR);
      } else if (species.toLowerCase() === 'mr. mime-galar') {
        // special case for mr. mime galar
        return this.cleanSpecies(species, shiny, MIMEGALAR);
      }

      if (!shiny) {
        return `https://play.pokemonshowdown.com/sprites/ani/${species.toLowerCase()}.gif`;
      } else {
        return `https://play.pokemonshowdown.com/sprites/ani-shiny/${species.toLowerCase()}.gif`;
      }
    } else {
      return `https://imgur.com/m0p2ljo.png`;
    }
  },

  returnTypeIcon(types: string[]): string[] {
    const urls = types.map((type) => {
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
    });
    return urls;
  },
};

export default LEGALITY;
