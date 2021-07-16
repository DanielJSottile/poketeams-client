import POKEMON from './pokemon';
import {
  ALL,
  TYPENULL,
  MIME,
  BADBIRB,
  FARGALAR,
  MIMEJR,
  MIMEGALAR,
  EXCEPTIONS,
  INFINITE,
  FARFETCHD,
  FARFETCDGALAR,
  SIRFETCHD,
  SIRFECHDMEGA,
  MIMEJRSTRING,
  MRMIME,
  MRMIMEGALAR,
  MRRIME,
  TYPENULLSTRING,
} from './constants';
import { PokemonEntry } from '../@types';

const birdCheck = (species: string) => {
  return (
    species.toLowerCase() === FARFETCHD ||
    species.toLowerCase() === SIRFETCHD ||
    species.toLowerCase() === FARFETCDGALAR ||
    species.toLowerCase() === SIRFECHDMEGA
  );
};

const LEGALITY = {
  removeWhiteSpaceHyphen(string: string): string {
    return string.replace(/-|:|'|\|.|’|\s/g, '').toLowerCase();
  },

  isLegalSpecies(species: string): boolean {
    if (birdCheck(species)) {
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

  findSpecies(species: string): PokemonEntry | undefined {
    if (this.isLegalSpecies(species)) {
      return POKEMON.get(this.removeWhiteSpaceHyphen(species));
    }
  },

  returnType(species: string): string[] {
    let types: string[] = ['???'];

    if (this.isLegalSpecies(species)) {
      types = this.findSpecies(species)?.types || [];
    }
    return types;
  },

  returnGenderStatus(species: string): boolean | string | null | undefined {
    if (this.isLegalSpecies(species)) {
      const pokemon = this.findSpecies(species) || ({} as PokemonEntry);
      if (
        (Object.keys(pokemon) as (keyof PokemonEntry)[])?.includes('genderLock')
      ) {
        return pokemon?.genderLock;
      }
      return false;
    }
    return false;
  },

  // These two functions in tandem return valid icon sprites based off of Pokemon Showdown's sprite index.
  // The function below makes things a bit cleaner.

  cleanSpecies(species: string, shiny: boolean, REGEX: RegExp): string {
    const match = species.match(REGEX);
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
    if (
      this.isLegalSpecies(species) &&
      (this.findSpecies(species)?.num || 0) > 0
    ) {
      if (INFINITE.includes(species.toLowerCase())) {
        return `https://imgur.com/m0p2ljo.png`;
      }

      if (EXCEPTIONS.includes(species.toLowerCase())) {
        return this.cleanSpecies(species, shiny, ALL);
      } else if (species.toLowerCase() === TYPENULLSTRING) {
        // special case for typenull
        return this.cleanSpecies(species, shiny, TYPENULL);
      } else if (
        species.toLowerCase() === MRMIME ||
        species.toLowerCase() === MRRIME
      ) {
        // special case for mr. mime and rime
        return this.cleanSpecies(species, shiny, MIME);
      } else if (birdCheck(species)) {
        // special case for the bad symbol on Showdown...
        return this.cleanSpecies(species, shiny, BADBIRB);
      } else if (species.toLowerCase() === "farfetch'd-galar") {
        // special case for farfetch'd galar
        return this.cleanSpecies(species, shiny, FARGALAR);
      } else if (species.toLowerCase() === MIMEJRSTRING) {
        // special case for mime jr.
        return this.cleanSpecies(species, shiny, MIMEJR);
      } else if (species.toLowerCase() === MRMIMEGALAR) {
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
        case 'INFINITE':
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
