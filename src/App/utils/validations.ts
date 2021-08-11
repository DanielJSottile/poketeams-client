import {
  PokemonSet,
  TextInput,
  InputWithId,
  NumberInput,
  BoolInput,
} from '../@types';
import { REGEX_UPPER_LOWER_NUMBER_SPECIAL } from './constants';
import { showdownParse, showdownFolderParse } from './functions';
import legality from './legality';

export const validateNewFolderName = (
  newFolderName: TextInput
): string | boolean => {
  if (!newFolderName.value) {
    return `Please provide a folder name!`;
  }
  if (newFolderName.value.length > 30) {
    return `Folder name is over 30 characters!`;
  }
  return false;
};

export const validateCurrentFolderClicked = (
  currentClickedFolder: InputWithId
): string | boolean => {
  if (!currentClickedFolder.id) {
    return `You'll need to click on a folder in order to add a team!`;
  }
  return false;
};

export const validateNewFolderImport = (
  newFolderImport: TextInput
): string | boolean => {
  if (newFolderImport.value) {
    const folderParse = showdownFolderParse(newFolderImport.value);
    if (
      folderParse.some((fullteam) => {
        const [teamName] = Object.entries(fullteam)[0];
        return !teamName;
      })
    ) {
      return `You are missing the team name in the import for one of your teams!
      Make sure that there is a team name before each group of sets
      (Hint: Should be formatted like this: === [format] Folder/Team Name ===)`;
    }

    if (
      folderParse.some((fullteam) => {
        const [, sets] = Object.entries(fullteam)[0];
        return sets.some((set) => {
          return !legality.isLegalSpecies(set.species);
        });
      })
    ) {
      return `There is an illegal species in your set.  Please check each line
      and fix this to be in the proper format!
        (Hint: It could be extra white space at the end because of Showdown's Exporter)
       (Hint: There could be a typo in your species name!)`;
    }
    return false;
  }
  return false;
};

export const validateNewTeamName = (
  newTeamName: TextInput
): string | boolean => {
  if (!newTeamName.value) {
    return `Please provide a team name!`;
  }
  return false;
};

export const validateDesc = (desc: TextInput): string | boolean => {
  if (typeof desc.value !== 'string') {
    return `This should never come up, it is superflous`;
  }
  return false;
};

export const validateNewTeamImport = (
  newTeamImport: TextInput
): string | boolean => {
  if (newTeamImport.value) {
    if (
      showdownParse(newTeamImport.value).some((set: PokemonSet) => {
        return !legality.isLegalSpecies(set.species);
      })
    ) {
      return `There is an illegal species in your set.  Please fix this to be in the proper format! 
      (Hint: It could be extra white space at the end because of Showdown's Exporter)
      (Hint: There could be a typo in your species name!)`;
    }
  }
  return false;
};

export const validateNewSetImport = (
  newSetImport: TextInput
): string | boolean => {
  if (showdownParse(newSetImport.value).length > 1) {
    return `You can only import 1 set here.`;
  }
  if (
    showdownParse(newSetImport.value).some((set: PokemonSet) => {
      return !legality.isLegalSpecies(set.species);
    })
  ) {
    return `There is an illegal species in your set.  Please fix this to be in the proper format! 
    (Hint: It could be extra white space at the end because of Showdown's Exporter)
    (Hint: There could be a typo in your species name!)`;
  }
  return false;
};

export const validateSearch = (search: TextInput): string | boolean => {
  if (!legality.isLegalSpecies(search.value.toString().trim())) {
    return `Must be an 'existing' Pokemon species or form styled via '[species]-[form]'!`;
  }
  return false;
};

export const validateNickname = (nickname: TextInput): string | boolean => {
  // TODO: check against Legal Nintendo filter!
  if (typeof nickname.value !== 'string') {
    return `This is just superflous it should never come up.`;
  }
  return false;
};

export const validateItem = (item: TextInput): string | boolean => {
  // TODO: check against list of Items!
  if (typeof item.value !== 'string') {
    return `This is just superflous it should never come up.`;
  }
  return false;
};

export const validateAbility = (ability: TextInput): string | boolean => {
  // TODO: check against list of Abilities!
  if (typeof ability.value !== 'string') {
    return `This is just superflous it should never come up.`;
  }
  return false;
};

export const validateNature = (nature: TextInput): string | boolean => {
  // TODO: check against list of Natures!
  if (typeof nature.value !== 'string') {
    return `This is just superflous it should never come up.`;
  }
  return false;
};

export const validateShiny = (shiny: BoolInput): string | boolean => {
  if (typeof shiny.value !== 'boolean') {
    return `This is just superflous it should never come up.`;
  }
  return false;
};

export const validateSpecies = (species: TextInput): string | boolean => {
  if (!legality.isLegalSpecies(species.value.toString())) {
    return `Must be an 'existing' Pokemon species or form styled via '[species]-[form]'!`;
  }
  return false;
};

export const validateGender = (
  gender: TextInput,
  species: TextInput
): string | boolean => {
  if (legality.returnGenderStatus(species.value)) {
    if (
      gender.value.toString().trim() !==
      legality.returnGenderStatus(species.value)
    ) {
      return `This species is locked to a gender of '${legality.returnGenderStatus(
        species.value
      )}'.`;
    }
  }
  return false;
};

export const validateLevel = (level: NumberInput): string | boolean => {
  // TODO: Integrate custom level flag
  if (Number(level.value) > 100 || Number(level.value) < 1) {
    return `Level must be between 1 and 100`;
  }
  return false;
};

export const validateHappiness = (happiness: NumberInput): string | boolean => {
  if (Number(happiness.value) > 255 || Number(happiness.value) < 0) {
    return `Hapiness must be between 0 and 255`;
  }

  return false;
};

export const validateEvs = (
  hpEv: NumberInput,
  atkEv: NumberInput,
  defEv: NumberInput,
  spAEv: NumberInput,
  spDEv: NumberInput,
  speEv: NumberInput
): string | boolean => {
  const evArr = [
    Number(hpEv.value),
    Number(atkEv.value),
    Number(defEv.value),
    Number(spAEv.value),
    Number(spDEv.value),
    Number(speEv.value),
  ];

  /* While normally EV's can only have 508 (510) in total, 
  because Hackmons is a thing, we don't check this.*/

  if (
    evArr.some((ev) => {
      return ev > 252 || ev < 0;
    })
  ) {
    return `EV's must be set from 0 to 255`;
  }
  return false;
};

export const validateIvs = (
  hpIv: NumberInput,
  atkIv: NumberInput,
  defIv: NumberInput,
  spAIv: NumberInput,
  spDIv: NumberInput,
  speIv: NumberInput
): string | boolean => {
  const ivArr = [
    Number(hpIv.value),
    Number(atkIv.value),
    Number(defIv.value),
    Number(spAIv.value),
    Number(spDIv.value),
    Number(speIv.value),
  ];

  if (
    ivArr.some((iv) => {
      return iv > 31 || iv < 0;
    })
  ) {
    return `IV's must be set from 0 to 31`;
  }
  return false;
};

export const validateMoves = (
  moveOne: TextInput,
  moveTwo: TextInput,
  moveThree: TextInput,
  moveFour: TextInput
): string | boolean => {
  if (!moveOne) {
    return `Pokemon must have at least ONE move; make sure it is in the top input box.`;
  }

  if (
    typeof moveOne.value !== 'string' ||
    typeof moveTwo.value !== 'string' ||
    typeof moveThree.value !== 'string' ||
    typeof moveFour.value !== 'string'
  ) {
    return `This is just superflous it should never come up.`;
  }
  return false;
};

export const validateTeamName = (teamName: TextInput): string | boolean => {
  if (!teamName.value) {
    return `Team MUST have a name!`;
  }
  return false;
};

export const validatePassword = (password: TextInput): string | boolean => {
  if (password.value.length < 8) {
    return `Password is too short.  Must be longer than 8 characters.
      Password cannot start or end with empty spaces.
      Password must contain an uppercase, lowercase, number and a special char.`;
  }
  if (password.value.length > 72) {
    return `Password is too long.  Password must be less than 72 characters.
      Password cannot start or end with empty spaces.
      Password must contain an uppercase, lowercase, number and a special char.`;
  }
  if (password.value.startsWith(' ') || password.value.endsWith(' ')) {
    return `Password cannot start or end with empty spaces.
      Password must contain an uppercase, lowercase, number and a special char`;
  }
  if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password.value)) {
    return 'Password must contain one upper case, lower case, number and special character';
  }
  return false;
};

export const validateVerifyPassword = (
  password: TextInput,
  verifyPassword: TextInput
): string | boolean => {
  if (password.value !== verifyPassword.value) {
    return 'Passwords must match';
  }
  return false;
};
