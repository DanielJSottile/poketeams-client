export interface PokemonFolder {
  date_created: string;
  date_modified: string;
  folder_name: string;
  id: number;
  user_id: number;
}

export interface PokemonTeam {
  team_name: string;
  description: string;
  id: number;
  user_name: string;
  date_created: string;
  folder_id: number;
}

export interface PokemonSet {
  nickname: string | null;
  species: string;
  gender: string | null;
  shiny: boolean;
  gigantamax: boolean;
  item: string | null;
  ability: string | null;
  level: number;
  happiness: number;
  nature: string | null;
  hp_ev: number;
  atk_ev: number;
  def_ev: number;
  spa_ev: number;
  spd_ev: number;
  spe_ev: number;
  hp_iv: number;
  atk_iv: number;
  def_iv: number;
  spa_iv: number;
  spd_iv: number;
  spe_iv: number;
  move_one: string;
  move_two: string | null;
  move_three: string | null;
  move_four: string | null;
  setExpandToggle?: boolean;
  deleteClicked?: boolean;
  copySuccess?: boolean;
  id?: number;
  team_id?: number;
}

export type TextInput = {
  value: string;
  touched: boolean;
};

type OmitInput = Omit<TextInput, 'value'>;

export interface InputWithId extends TextInput {
  id: string;
}

export interface NumberInput extends OmitInput {
  value: number;
}

export interface BoolInput extends OmitInput {
  value: boolean;
}

export type ParseReturn = {
  string: PokemonSet[];
  [key: string]: PokemonSet[];
};

export type PokemonSetPost = Omit<PokemonSet, 'id'>;

export type PokemonTeamPost = Omit<
  PokemonTeam,
  'id' | 'user_name' | 'date_created'
>;

export type PokemonFolderPost = Omit<PokemonFolder, 'id'>;

interface BaseStats {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}

interface Abilities {
  0: string;
  1?: string;
  H?: string;
  S?: string;
}

interface GenderRatio {
  M: number;
  F: number;
}

export type PokemonEntry = {
  num: number;
  species: string;
  baseForme?: string;
  baseSpecies?: string;
  forme?: string;
  types: string[];
  genderRatio?: GenderRatio;
  genderLock?: boolean | string | null;
  baseStats: BaseStats;
  maxHP?: number;
  abilities: Abilities;
  heightm: number;
  weightkg: number;
  color: string;
  prevo?: string;
  evoItem?: string;
  evoCondition?: string;
  evoType?: string;
  evoMove?: string;
  evoLevel?: number;
  evos?: string[];
  eggGroups: string[];
  inheritsFrom?: string;
  canHatch?: boolean;
  otherFormes?: string[];
  otherForms?: string[];
};
