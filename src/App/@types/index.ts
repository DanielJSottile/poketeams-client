export interface PokemonFolder {
  date_created: string;
  date_modified: string;
  folder_name: string;
  id: number;
  user_id: number;
}

export interface PokemonTeam {
  team_name: string;
  team_description: string;
  description: string;
  id: number;
  user_name: string;
  date_created: string;
  folder_id: number;
}

export interface PokemonSet {
  nickname: string;
  species: string;
  gender: string;
  shiny: boolean;
  item: string;
  ability: string;
  level: number;
  happiness: number;
  nature: string;
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
  move_two: string;
  move_three: string;
  move_four: string;
  setExpandToggle?: boolean;
  deleteClicked?: boolean;
  copySuccess?: boolean;
  id: number;
  team_id: number;
}
