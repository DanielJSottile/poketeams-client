import React, {
  useState,
  useEffect,
  createContext,
  ReactNode,
  MouseEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import apiService from '../services/apiService';
import TokenService from '../services/token-service';
import jwtDecode from 'jwt-decode';
import showdownParse from '../functions/parse';
import showdownFolderParse from '../functions/parseFolder';
import legality from '../functions/legality';
import { PokemonFolder, PokemonTeam, PokemonSet } from '../@types';

type Props = {
  children: ReactNode;
};

type Input = {
  value: string;
  touched: boolean;
};

interface InputWithId extends Input {
  id: string;
}

export interface MyToken {
  sub: string;
  user_id: number;
}

interface GeneralContextValues {
  userFolders: PokemonFolder[];
  userTeams: PokemonTeam[];
  userSets: PokemonSet[];
  publicTeams: PokemonTeam[];
  publicSets: PokemonSet[];
  folderAddClicked: boolean;
  newFolderName: Input;
  newFolderImport: Input;
  teamAddClicked: boolean;
  currentClickedTeam: InputWithId;
  newTeamName: Input;
  currentClickedFolder: InputWithId;
  desc: Input;
  newTeamImport: Input;
  newSetImport: Input;
  search: Input;
  sort: Input;
  filter: Input;
  filtersort: Input;
  page: number;
  setUserFolders: Dispatch<SetStateAction<PokemonFolder[]>>;
  setUserTeams: Dispatch<SetStateAction<PokemonTeam[]>>;
  setUserSets: Dispatch<SetStateAction<PokemonSet[]>>;
  setPublicTeams: Dispatch<SetStateAction<PokemonTeam[]>>;
  setPublicSets: Dispatch<SetStateAction<PokemonSet[]>>;
  setFolderAddClicked: (toggle: boolean) => void;
  setNewFolderName: (name: Input) => void;
  setNewFolderImport: (name: Input) => void;
  setTeamAddClicked: (toggle: boolean) => void;
  setNewTeamName: (name: Input) => void;
  setCurrentClickedFolder: (folder: InputWithId) => void;
  setDesc: (name: Input) => void;
  setNewTeamImport: (name: Input) => void;
  setNewSetImport: (name: Input) => void;
  setSearch: (name: Input) => void;
  setSort: (name: Input) => void;
  setFilter: (name: Input) => void;
  setFilterSort: (name: Input) => void;
  handlePostNewTeam: () => void;
  validateDesc: () => string | boolean;
  validateNewTeamName: () => string | boolean;
  validateNewTeamImport: () => string | boolean | undefined;
  validateCurrentFolderClicked: () => string | boolean;
  validateNewFolderImport: () => string | boolean | undefined;
  validateNewFolderName: () => string | boolean | undefined;
  validateFilter: () => string | boolean;
  validateSearch: () => string | boolean;
  validateNewSetImport: () => string | boolean | undefined;
  handlePostNewFolder: () => void;
  handleEditFolder: () => void;
  handleDeleteFolder: () => void;
  handleFilter: () => void;
  handleSearch: (e: MouseEvent<HTMLButtonElement>) => void;
  handleUpdateSetImport: (id: number) => void;
  handleUpdateSet: (
    id: number | undefined,
    nickname: string,
    species: string,
    gender: string,
    shiny: boolean,
    item: string,
    ability: string,
    level: number,
    happiness: number,
    nature: string,
    hp_ev: number,
    atk_ev: number,
    def_ev: number,
    spa_ev: number,
    spd_ev: number,
    spe_ev: number,
    hp_iv: number,
    atk_iv: number,
    def_iv: number,
    spa_iv: number,
    spd_iv: number,
    spe_iv: number,
    move_one: string,
    move_two: string,
    move_three: string,
    move_four: string
  ) => void;
  handleDeleteSet: (teamId: number, setId: number) => void;
  handleUpdateTeam: (teamName: string, desc: string, teamId: number) => void;
  handlePostNewPokemon: (
    team_id: number | undefined,
    nickname?: string,
    species?: string,
    gender?: string,
    shiny?: boolean,
    item?: string,
    ability?: string,
    level?: number,
    happiness?: number,
    nature?: string,
    hp_ev?: number,
    atk_ev?: number,
    def_ev?: number,
    spa_ev?: number,
    spd_ev?: number,
    spe_ev?: number,
    hp_iv?: number,
    atk_iv?: number,
    def_iv?: number,
    spa_iv?: number,
    spd_iv?: number,
    spe_iv?: number,
    move_one?: string,
    move_two?: string,
    move_three?: string,
    move_four?: string
  ) => void;
  handleDeleteTeam: (teamId: number) => void;
  handlePage: (direction: 'up' | 'down') => void;
  getUserState: () => void;
  clearUserState: () => void;
}

const GeneralContext = createContext<GeneralContextValues>({
  userFolders: [],
  userTeams: [],
  userSets: [],
  publicTeams: [],
  publicSets: [],
  folderAddClicked: false,
  newFolderName: {
    value: '',
    touched: false,
  },
  newFolderImport: {
    value: '',
    touched: false,
  },
  teamAddClicked: false,
  currentClickedTeam: {
    value: '',
    id: '',
    touched: false,
  },
  newTeamName: {
    value: '',
    touched: false,
  },
  currentClickedFolder: {
    value: '',
    id: '',
    touched: false,
  },
  desc: {
    value: '',
    touched: false,
  },
  newTeamImport: {
    value: '',
    touched: false,
  },
  newSetImport: {
    value: '',
    touched: false,
  },
  search: {
    value: '',
    touched: false,
  },
  sort: {
    value: '',
    touched: false,
  },
  filter: {
    value: '',
    touched: false,
  },
  filtersort: {
    value: '',
    touched: false,
  },
  page: 1,
  setUserFolders: () => null,
  setUserTeams: () => null,
  setUserSets: () => null,
  setPublicTeams: () => null,
  setPublicSets: () => null,
  setFolderAddClicked: () => null,
  setNewFolderName: () => null,
  setNewFolderImport: () => null,
  setTeamAddClicked: () => null,
  setNewTeamName: () => null,
  setCurrentClickedFolder: () => null,
  setDesc: () => null,
  setNewTeamImport: () => null,
  setNewSetImport: () => null,
  setSearch: () => null,
  setSort: () => null,
  setFilter: () => null,
  setFilterSort: () => null,
  handlePostNewTeam: () => null,
  validateDesc: () => false,
  validateNewTeamName: () => false,
  validateNewTeamImport: () => false,
  validateCurrentFolderClicked: () => false,
  validateNewFolderImport: () => false,
  validateNewFolderName: () => false,
  validateFilter: () => false,
  validateSearch: () => false,
  validateNewSetImport: () => false,
  handlePostNewFolder: () => null,
  handleEditFolder: () => null,
  handleDeleteFolder: () => null,
  handleFilter: () => null,
  handleSearch: () => null,
  handleUpdateSetImport: () => null,
  handleUpdateSet: () => null,
  handleDeleteSet: () => null,
  handleUpdateTeam: () => null,
  handlePostNewPokemon: () => null,
  handleDeleteTeam: () => null,
  handlePage: () => null,
  getUserState: () => null,
  clearUserState: () => null,
});

export default GeneralContext;

export const GeneralProvider = ({ children }: Props) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFolders, setUserFolders] = useState<PokemonFolder[]>([]);
  const [userTeams, setUserTeams] = useState<PokemonTeam[]>([]);
  const [userSets, setUserSets] = useState<PokemonSet[]>([]);
  const [publicTeams, setPublicTeams] = useState<PokemonTeam[]>([]);
  const [publicSets, setPublicSets] = useState<PokemonSet[]>([]);
  const [folderAddClicked, setFolderAddClicked] = useState(false);
  const [newFolderName, setNewFolderName] = useState({
    value: '',
    touched: false,
  });
  const [newFolderImport, setNewFolderImport] = useState({
    value: '',
    touched: false,
  });
  const [teamAddClicked, setTeamAddClicked] = useState(false);
  const [currentClickedTeam, setCurrentClickedTeam] = useState({
    value: '',
    id: '',
    touched: false,
  });
  const [newTeamName, setNewTeamName] = useState({ value: '', touched: false });
  const [currentClickedFolder, setCurrentClickedFolder] = useState({
    value: '',
    id: '',
    touched: false,
  });
  const [desc, setDesc] = useState({ value: '', touched: false });
  const [newTeamImport, setNewTeamImport] = useState({
    value: '',
    touched: false,
  });
  const [newSetImport, setNewSetImport] = useState({
    value: '',
    touched: false,
  });
  const [search, setSearch] = useState({ value: '', touched: false });
  const [sort, setSort] = useState({ value: '', touched: false });
  const [filter, setFilter] = useState({ value: '', touched: false });
  const [filtersort, setFilterSort] = useState({ value: '', touched: false });
  const [page, setPage] = useState(1);

  useEffect(() => {
    getUserState();

    const query = `?page=${page}&sort=${sort.value || 'newest'}&species=${
      search.value.toLowerCase() || 'all'
    }`;
    apiService.getTenTeamsSearch(query).then((teams) => {
      setPublicTeams(teams);
      setPublicSets([]);
      let newSets: PokemonSet[] = [];
      teams.forEach((team: PokemonTeam) => {
        apiService.getSetsForOneTeam(team.id).then((sets) => {
          newSets = [...newSets, ...sets];
          setPublicSets(newSets);
        });
      });
    });
  }, [page, search.value, sort.value]);

  const getUserState = () => {
    if (TokenService.getAuthToken()) {
      const user_id = jwtDecode<MyToken>(
        TokenService.getAuthToken() || ''
      ).user_id;

      apiService.getUserFolders(user_id).then((data) => {
        setUserFolders(data);
      });

      apiService.getUserTeams(user_id).then((data) => {
        setUserTeams(data);
      });

      apiService.getUserSets(user_id).then((data) => {
        setUserSets(data);
      });
    }
  };

  const handlePage = (direction: 'up' | 'down') => {
    setPage(direction === 'up' ? page + 1 : page - 1);

    const query = `?page=${page}&sort=${sort.value || 'newest'}&species=${
      search.value.toLowerCase() || 'all'
    }`;
    apiService.getTenTeamsSearch(query).then((teams) => {
      setPublicTeams(teams);
      setPublicSets([]);
      teams.forEach((team: PokemonTeam) => {
        apiService.getSetsForOneTeam(team.id).then((sets) => {
          setPublicSets([...publicSets, ...sets]);
        });
      });
    });
  };

  const clearUserState = () => {
    setUserFolders([]);
    setUserTeams([]);
    setUserSets([]);
  };

  const validateNewFolderName = (): string | boolean => {
    if (!newFolderName.value) {
      return `Please provide a folder name!`;
    }
    return false;
  };

  const validateCurrentFolderClicked = (): string | boolean => {
    if (!currentClickedFolder.id) {
      return `You'll need to click on a folder in order to add a team!`;
    }
    return false;
  };

  const validateNewFolderImport = (): string | boolean | undefined => {
    let flag;
    if (newFolderImport.value) {
      showdownFolderParse(newFolderImport.value).forEach(
        (fullteam: { string: PokemonSet[] }) => {
          const [teamName, sets] = Object.entries(fullteam)[0];
          if (!teamName) {
            flag = `You are missing the team name in the import for one of your teams!
        Make sure that there is a team name before each group of sets
        (Hint: Should be formatted like this: === [format] Folder/Team Name ===)`;
          }

          sets.forEach((set: PokemonSet) => {
            if (!legality.isLegalSpecies(set.species)) {
              flag = `There is an illegal species in your set.  Please check each line
          and fix this to be in the proper format! 
          (Hint: It could be extra white space at the end because of Showdown's Exporter)
          (Hint: There could be a typo in your species name!)`;
            }
          });
        }
      );
    }
    return flag;
  };

  const validateNewTeamName = (): string | boolean => {
    if (!newTeamName.value) {
      return `Please provide a team name!`;
    }
    return false;
  };

  const validateDesc = (): string | boolean => {
    if (typeof desc.value !== 'string') {
      return `This should never come up, it is superflous`;
    }
    return false;
  };

  const validateNewTeamImport = (): string | boolean | undefined => {
    let flag;
    if (newTeamImport.value) {
      showdownParse(newTeamImport.value).forEach((set: PokemonSet) => {
        if (!legality.isLegalSpecies(set.species)) {
          flag = `There is an illegal species in your set.  Please fix this to be in the proper format! 
        (Hint: It could be extra white space at the end because of Showdown's Exporter)
        (Hint: There could be a typo in your species name!)`;
        }
      });
    }
    return flag;
  };

  const validateNewSetImport = (): string | boolean | undefined => {
    let flag;

    if (showdownParse(newSetImport.value).length > 1) {
      flag = `You can only import 1 set here.`;
    }
    showdownParse(newSetImport.value).forEach((set: PokemonSet) => {
      if (!legality.isLegalSpecies(set.species)) {
        flag = `There is an illegal species in your set.  Please fix this to be in the proper format! 
        (Hint: It could be extra white space at the end because of Showdown's Exporter)
        (Hint: There could be a typo in your species name!)`;
      }
    });
    return flag;
  };

  const validateSearch = (): string | boolean => {
    if (!legality.isLegalSpecies(search.value.toString().trim())) {
      return `Must be an 'existing' Pokemon species or form styled via '[species]-[form]'!`;
    }
    return false;
  };

  const validateFilter = (): string | boolean => {
    if (!legality.isLegalSpecies(filter.value.toString().trim())) {
      return `Must be an 'existing' Pokemon species or form styled via '[species]-[form]'!`;
    }
    return false;
  };

  const handlePostNewFolder = () => {
    let folder: PokemonFolder;
    apiService
      .postUserFolder(
        newFolderName.value,
        jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id
      )
      .then((f) => {
        folder = f;
        setUserFolders([...userFolders, folder]);
      })
      .then(() => {
        if (newFolderImport.value) {
          const parsed = showdownFolderParse(newFolderImport.value);

          const teamPromises: Promise<PokemonTeam>[] = parsed.map(
            (fullteam: { string: PokemonSet[] }): Promise<PokemonTeam> => {
              const extract = Object.entries(fullteam)[0];
              const team_name = extract[0];
              const desc = '';
              const folderId = folder.id;
              const body = {
                team_name,
                description: desc,
                folder_id: folderId,
              };

              return apiService.postUserTeam(
                body,
                jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id
              );
            }
          );

          Promise.all(teamPromises).then((values) => {
            const newVals = values.map((team) => {
              return {
                ...team,
                folder_name: folder.folder_name,
                user_id: jwtDecode<MyToken>(TokenService.getAuthToken() || '')
                  .user_id,
                user_name: jwtDecode<MyToken>(TokenService.getAuthToken() || '')
                  .sub,
              };
            });
            setUserTeams([...userTeams, ...newVals]);

            let allSets: PokemonSet[] = [];

            let altered = parsed.map((fullteam: object) => {
              const createdTeam = newVals.find(
                (team) => team.team_name === Object.keys(fullteam)[0]
              );

              const sets = Object.values(fullteam)[0];

              return sets.map((set: PokemonSet) => {
                let def = {
                  team_id: createdTeam?.id,
                  species: 'Pikachu',
                  level: 100,
                  shiny: false,
                  happiness: 255,
                  nature: 'Adamant',
                  hp_ev: 0,
                  atk_ev: 0,
                  def_ev: 0,
                  spa_ev: 0,
                  spd_ev: 0,
                  spe_ev: 0,
                  hp_iv: 31,
                  atk_iv: 31,
                  def_iv: 31,
                  spa_iv: 31,
                  spd_iv: 31,
                  spe_iv: 31,
                  move_one: 'Tackle',
                };

                let s = {
                  ...def,
                  team_id: createdTeam?.id,
                  nickname: set.nickname,
                  species: set.species,
                  gender: set.gender,
                  item: set.item,
                  ability: set.ability,
                  level: set.level,
                  shiny: set.shiny,
                  happiness: set.happiness,
                  nature: set.nature,
                  hp_ev: set.hp_ev,
                  atk_ev: set.atk_ev,
                  def_ev: set.def_ev,
                  spa_ev: set.spa_ev,
                  spd_ev: set.spd_ev,
                  spe_ev: set.spe_ev,
                  hp_iv: set.hp_iv,
                  atk_iv: set.atk_iv,
                  def_iv: set.def_iv,
                  spa_iv: set.spa_iv,
                  spd_iv: set.spd_iv,
                  spe_iv: set.spe_iv,
                  move_one: set.move_one,
                  move_two: set.move_two,
                  move_three: set.move_three,
                  move_four: set.move_four,
                };
                return s;
              });
            });

            altered.forEach((sets: PokemonSet[]) => {
              allSets = [...allSets, ...sets];
            });

            const setPromises: Promise<PokemonSet>[] = allSets.map(
              (set: any): Promise<any> => {
                return apiService.postUserSet(
                  set,
                  jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id
                );
              }
            );

            Promise.all(setPromises).then((sets) => {
              setUserSets([...userSets, ...sets]);
            });
          });
        }
      })
      .then(() => {
        setFolderAddClicked(!folderAddClicked);
        setNewFolderName({ value: '', touched: false });
        setNewFolderImport({ value: '', touched: false });
      });
  };

  const handlePostNewPokemon = (
    team_id: any,
    nickname: any,
    species: any = 'Pikachu',
    gender: any,
    item: any,
    ability: any,
    level: any = 100,
    shiny: any = false,
    happiness: any = 255,
    nature: any = 'Adamant',
    hp_ev: any = 0,
    atk_ev: any = 0,
    def_ev: any = 0,
    spa_ev: any = 0,
    spd_ev: any = 0,
    spe_ev: any = 0,
    hp_iv: any = 31,
    atk_iv: any = 31,
    def_iv: any = 31,
    spa_iv: any = 31,
    spd_iv: any = 31,
    spe_iv: any = 31,
    move_one: any = 'Tackle',
    move_two: any,
    move_three: any,
    move_four: any
  ) => {
    const set_body = {
      team_id,
      nickname,
      species,
      gender,
      item,
      ability,
      level,
      shiny,
      happiness,
      nature,
      hp_ev,
      atk_ev,
      def_ev,
      spa_ev,
      spd_ev,
      spe_ev,
      hp_iv,
      atk_iv,
      def_iv,
      spa_iv,
      spd_iv,
      spe_iv,
      move_one,
      move_two,
      move_three,
      move_four,
    };

    apiService
      .postUserSet(
        set_body,
        jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id
      )
      .then((set) => setUserSets([...userSets, set]));
  };

  const handlePostNewTeam = () => {
    const body = {
      team_name: newTeamName.value,
      description: desc.value,
      folder_id: currentClickedFolder.id,
    };

    apiService
      .postUserTeam(
        body,
        jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id
      )
      .then((team) => {
        setUserTeams([
          ...userTeams,
          {
            ...team,
            folder_name: currentClickedFolder.value,
            user_id: jwtDecode<MyToken>(TokenService.getAuthToken() || '')
              .user_id,
            user_name: jwtDecode<MyToken>(TokenService.getAuthToken() || '')
              .sub,
          },
        ]);
        if (newTeamImport.value) {
          const parsed = showdownParse(newTeamImport.value);

          let setPromises = parsed.map((set: PokemonSet) => {
            let def = {
              team_id: team.id,
              species: 'Pikachu',
              level: 100,
              shiny: false,
              happiness: 255,
              nature: 'Adamant',
              hp_ev: 0,
              atk_ev: 0,
              def_ev: 0,
              spa_ev: 0,
              spd_ev: 0,
              spe_ev: 0,
              hp_iv: 31,
              atk_iv: 31,
              def_iv: 31,
              spa_iv: 31,
              spd_iv: 31,
              spe_iv: 31,
              move_one: 'Tackle',
            };

            let set_body = {
              ...def,
              team_id: team.id,
              nickname: set.nickname,
              species: set.species,
              gender: set.gender,
              item: set.item,
              ability: set.ability,
              level: set.level,
              shiny: set.shiny,
              happiness: set.happiness,
              nature: set.nature,
              hp_ev: set.hp_ev,
              atk_ev: set.atk_ev,
              def_ev: set.def_ev,
              spa_ev: set.spa_ev,
              spd_ev: set.spd_ev,
              spe_ev: set.spe_ev,
              hp_iv: set.hp_iv,
              atk_iv: set.atk_iv,
              def_iv: set.def_iv,
              spa_iv: set.spa_iv,
              spd_iv: set.spd_iv,
              spe_iv: set.spe_iv,
              move_one: set.move_one,
              move_two: set.move_two,
              move_three: set.move_three,
              move_four: set.move_four,
            };

            return apiService.postUserSet(
              set_body,
              jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id
            );
          });

          Promise.all(setPromises).then((sets) => {
            setUserSets([...userSets, ...sets]);
          });
        }
      });
    setTeamAddClicked(!teamAddClicked);
    setNewTeamName({ value: '', touched: false });
    setDesc({ value: '', touched: false });
    setNewTeamImport({ value: '', touched: false });
  };

  const handleEditFolder = () => {
    const userId = jwtDecode<MyToken>(
      TokenService.getAuthToken() || ''
    ).user_id;

    apiService.patchUserFolder(
      newFolderName.value,
      currentClickedFolder.id,
      userId
    );

    const folder = { folder_name: newFolderName.value };

    setUserFolders(
      userFolders.map((fldr: PokemonFolder) => {
        return fldr.id.toString() !== currentClickedFolder.id
          ? fldr
          : { ...fldr, ...folder };
      })
    );
  };

  const handleUpdateTeam = (teamname: string, desc: string, id: number) => {
    const body = { id: id, team_name: teamname, description: desc };
    const userId = jwtDecode<MyToken>(
      TokenService.getAuthToken() || ''
    ).user_id;
    apiService.patchUserTeam(body, userId);

    const team = { team_name: teamname, description: desc };

    setUserTeams(
      userTeams.map((tm) => {
        return tm.id !== id ? tm : { ...tm, ...team };
      })
    );
  };

  const handleUpdateSet = (
    id: number | undefined,
    nickname: string,
    species: string,
    gender: string,
    shiny: boolean,
    item: string,
    ability: string,
    level: number,
    happiness: number,
    nature: string,
    hp_ev: number,
    atk_ev: number,
    def_ev: number,
    spa_ev: number,
    spd_ev: number,
    spe_ev: number,
    hp_iv: number,
    atk_iv: number,
    def_iv: number,
    spa_iv: number,
    spd_iv: number,
    spe_iv: number,
    move_one: string,
    move_two: string,
    move_three: string,
    move_four: string
  ) => {
    const body = {
      id: id,
      nickname: nickname,
      species: species,
      gender: gender,
      item: item,
      ability: ability,
      level: Number(level),
      shiny: shiny,
      happiness: Number(happiness),
      nature: nature,
      hp_ev: Number(hp_ev),
      atk_ev: Number(atk_ev),
      def_ev: Number(def_ev),
      spa_ev: Number(spa_ev),
      spd_ev: Number(spd_ev),
      spe_ev: Number(spe_ev),
      hp_iv: Number(hp_iv),
      atk_iv: Number(atk_iv),
      def_iv: Number(def_iv),
      spa_iv: Number(spa_iv),
      spd_iv: Number(spd_iv),
      spe_iv: Number(spe_iv),
      move_one: move_one,
      move_two: move_two,
      move_three: move_three,
      move_four: move_four,
    };

    const userId = jwtDecode<MyToken>(
      TokenService.getAuthToken() || ''
    ).user_id;
    apiService.patchUserSet(body, userId);

    const set = {
      nickname,
      species,
      gender,
      item,
      ability,
      level,
      shiny,
      happiness,
      nature,
      hp_ev,
      atk_ev,
      def_ev,
      spa_ev,
      spd_ev,
      spe_ev,
      hp_iv,
      atk_iv,
      def_iv,
      spa_iv,
      spd_iv,
      spe_iv,
      move_one,
      move_two,
      move_three,
      move_four,
    };

    setUserSets(
      userSets.map((s) => {
        return s.id !== id ? s : { ...s, ...set };
      })
    );
  };

  const handleUpdateSetImport = (id: number) => {
    const parsed = showdownParse(newSetImport.value)[0];
    const userId = jwtDecode<MyToken>(
      TokenService.getAuthToken() || ''
    ).user_id;

    const body = {
      id: id,
      nickname: parsed.nickname,
      species: parsed.species,
      gender: parsed.gender,
      item: parsed.item,
      ability: parsed.ability,
      level: Number(parsed.level),
      shiny: parsed.shiny,
      happiness: Number(parsed.happiness),
      nature: parsed.nature,
      hp_ev: Number(parsed.hp_ev),
      atk_ev: Number(parsed.atk_ev),
      def_ev: Number(parsed.def_ev),
      spa_ev: Number(parsed.spa_ev),
      spd_ev: Number(parsed.spd_ev),
      spe_ev: Number(parsed.spe_ev),
      hp_iv: Number(parsed.hp_iv),
      atk_iv: Number(parsed.atk_iv),
      def_iv: Number(parsed.def_iv),
      spa_iv: Number(parsed.spa_iv),
      spd_iv: Number(parsed.spd_iv),
      spe_iv: Number(parsed.spe_iv),
      move_one: parsed.move_one,
      move_two: parsed.move_two,
      move_three: parsed.move_three,
      move_four: parsed.move_four,
    };
    apiService.patchUserSet(body, userId);

    const set = {
      nickname: parsed.nickname,
      species: parsed.species,
      gender: parsed.gender,
      item: parsed.item,
      ability: parsed.ability,
      level: Number(parsed.level),
      shiny: parsed.shiny,
      happiness: Number(parsed.happiness),
      nature: parsed.nature,
      hp_ev: Number(parsed.hp_ev),
      atk_ev: Number(parsed.atk_ev),
      def_ev: Number(parsed.def_ev),
      spa_ev: Number(parsed.spa_ev),
      spd_ev: Number(parsed.spd_ev),
      spe_ev: Number(parsed.spe_ev),
      hp_iv: Number(parsed.hp_iv),
      atk_iv: Number(parsed.atk_iv),
      def_iv: Number(parsed.def_iv),
      spa_iv: Number(parsed.spa_iv),
      spd_iv: Number(parsed.spd_iv),
      spe_iv: Number(parsed.spe_iv),
      move_one: parsed.move_one,
      move_two: parsed.move_two,
      move_three: parsed.move_three,
      move_four: parsed.move_four,
    };
    setUserSets(
      userSets.map((s) => {
        return s.id !== id ? s : { ...s, ...set };
      }) as PokemonSet[]
    );
    setNewSetImport({ value: '', touched: false });
  };

  const handleDeleteFolder = () => {
    apiService.deleteUserFolder(Number(currentClickedFolder.id));

    setUserFolders(
      userFolders.filter(
        (folder: PokemonFolder) =>
          Number(folder.id) !== Number(currentClickedFolder.id)
      )
    );
    setCurrentClickedFolder({ value: '', id: '', touched: false });
  };

  const handleDeleteTeam = (team_id: number) => {
    apiService.deleteUserTeam(team_id);

    const newUserTeams = userTeams.filter((team) => team.id !== team_id);
    const newPublicTeams = publicTeams.filter((team) => team.id !== team_id);
    setPublicTeams(newPublicTeams);
    setUserTeams(newUserTeams);
    setCurrentClickedTeam({ value: '', id: '', touched: false });
  };

  const handleDeleteSet = (team_id: number, set_id: number) => {
    apiService.deleteUserSet(team_id, set_id);

    const newUserSets = userSets.filter((set) => set.id !== set_id);
    const newPublicSets = publicSets.filter((set) => set.id !== set_id);
    setPublicSets(newPublicSets);
    setUserSets(newUserSets);
  };

  const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const query = `?page=${page}&sort=${sort.value || 'newest'}&species=${
      search.value.toLowerCase() || 'all'
    }`;
    apiService.getTenTeamsSearch(query).then((teams) => {
      setPublicTeams(teams);
      setPublicSets([]);
      teams.forEach((team: PokemonTeam) => {
        apiService.getSetsForOneTeam(team.id).then((sets) => {
          setPublicSets([...publicSets, ...sets]);
        });
      });
    });
  };

  const handleFilter = () => {
    const query = `?sort=${filtersort.value || 'newest'}&species=${
      filter.value.toLowerCase() || 'all'
    }`;
    if (TokenService.getAuthToken()) {
      const user_id = jwtDecode<MyToken>(
        TokenService.getAuthToken() || ''
      ).user_id;
      apiService.getUserFoldersFilter(user_id, query).then((data) => {
        setUserFolders(data);
      });
      apiService.getUserTeamsFilter(user_id, query).then((data) => {
        setUserTeams(data);
      });
    }
  };

  const value: GeneralContextValues = {
    userFolders,
    userTeams,
    userSets,
    publicTeams,
    publicSets,
    folderAddClicked,
    currentClickedFolder,
    newFolderName,
    teamAddClicked,
    currentClickedTeam,
    newTeamName,
    desc,
    newTeamImport,
    newFolderImport,
    newSetImport,
    search,
    sort,
    filter,
    filtersort,
    page,
    setSearch,
    setSort,
    setFilter,
    setFilterSort,
    setUserFolders,
    setUserSets,
    setUserTeams,
    setPublicSets,
    setPublicTeams,
    setFolderAddClicked,
    setNewFolderImport,
    setNewFolderName,
    setTeamAddClicked,
    setNewTeamImport,
    setNewTeamName,
    setNewSetImport,
    setCurrentClickedFolder,
    setDesc,
    validateCurrentFolderClicked,
    validateNewTeamName,
    validateDesc,
    validateFilter,
    validateNewFolderImport,
    validateNewFolderName,
    validateNewSetImport,
    validateNewTeamImport,
    validateSearch,
    handleDeleteFolder,
    handleDeleteSet,
    handleDeleteTeam,
    handleEditFolder,
    handleFilter,
    handlePostNewFolder,
    handlePostNewPokemon,
    handleSearch,
    handleUpdateSet,
    handleUpdateSetImport,
    handleUpdateTeam,
    handlePage,
    handlePostNewTeam,
    clearUserState,
    getUserState,
  };

  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
};
