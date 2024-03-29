import React, {
  useState,
  useEffect,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import jwtDecode from 'jwt-decode';
import {
  PokemonFolder,
  PokemonTeam,
  PokemonSet,
  TextInput,
  InputWithId,
  ParseReturn,
} from '../@types';
import {
  customErrorToast,
  customSuccessToast,
} from '../components/Utils/CustomToasts';
import apiService from '../services/apiService';
import TokenService from '../services/token-service';
import { showdownParse, showdownFolderParse } from '../utils/functions';
import legality from '../utils/legality';

type ContextProps = {
  children: ReactNode;
};

export interface MyToken {
  sub: string;
  user_id: string;
}

interface GeneralContextValues {
  userFolders: PokemonFolder[];
  userTeams: PokemonTeam[];
  userSets: PokemonSet[];
  publicTeams: PokemonTeam[];
  publicSets: PokemonSet[];
  folderAddClicked: boolean;
  newFolderName: TextInput;
  newFolderImport: TextInput;
  teamAddClicked: boolean;
  currentClickedTeam: InputWithId;
  newTeamName: TextInput;
  currentClickedFolder: InputWithId;
  desc: TextInput;
  newTeamImport: TextInput;
  newSetImport: TextInput;
  search: TextInput;
  sort: TextInput;
  filter: TextInput;
  filtersort: TextInput;
  page: number;
  setUserFolders: Dispatch<SetStateAction<PokemonFolder[]>>;
  setUserTeams: Dispatch<SetStateAction<PokemonTeam[]>>;
  setUserSets: Dispatch<SetStateAction<PokemonSet[]>>;
  setPublicTeams: Dispatch<SetStateAction<PokemonTeam[]>>;
  setPublicSets: Dispatch<SetStateAction<PokemonSet[]>>;
  setFolderAddClicked: (toggle: boolean) => void;
  setNewFolderName: (name: TextInput) => void;
  setNewFolderImport: (name: TextInput) => void;
  setTeamAddClicked: (toggle: boolean) => void;
  setNewTeamName: (name: TextInput) => void;
  setCurrentClickedFolder: (folder: InputWithId) => void;
  setDesc: (name: TextInput) => void;
  setNewTeamImport: (name: TextInput) => void;
  setNewSetImport: (name: TextInput) => void;
  setSearch: (name: TextInput) => void;
  setSort: (name: TextInput) => void;
  setFilter: (name: TextInput) => void;
  setFilterSort: (name: TextInput) => void;
  handlePostNewTeam: () => void;
  handlePostNewFolder: () => void;
  handleEditFolder: () => void;
  handleDeleteFolder: () => void;
  handleFilter: () => void;
  handleSearch: () => void;
  handleUpdateSetImport: (id?: string) => void;
  handleUpdateSet: (
    id: string | undefined,
    nickname: string,
    species: string,
    gender: string,
    shiny: boolean,
    gigantamax: boolean,
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
  handleDeleteSet: (teamId: string, setId: string) => void;
  handleUpdateTeam: (teamName: string, desc: string, teamId: string) => void;
  handleCreateDefaultPokemon: (team_id: string) => void;
  handleDeleteTeam: (teamId: string) => void;
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
  handlePostNewFolder: () => null,
  handleEditFolder: () => null,
  handleDeleteFolder: () => null,
  handleFilter: () => null,
  handleSearch: () => null,
  handleUpdateSetImport: () => null,
  handleUpdateSet: () => null,
  handleDeleteSet: () => null,
  handleUpdateTeam: () => null,
  handleCreateDefaultPokemon: () => null,
  handleDeleteTeam: () => null,
  handlePage: () => null,
  getUserState: () => null,
  clearUserState: () => null,
});

export default GeneralContext;

export const GeneralProvider = ({ children }: ContextProps): JSX.Element => {
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

  const createQuery = () => {
    return `?page=${page}&sort=${sort.value || 'newest'}&species=${
      search.value.toLowerCase() || 'all'
    }`;
  };

  const searchTenTeamsWithSets = () => {
    const query = createQuery();
    apiService.getTenTeamsSearch(query).then((teams) => {
      if (teams.length) {
        setPublicTeams(teams);
        setPublicSets([]);
        let newSets: PokemonSet[] = [];
        teams.forEach((team: PokemonTeam) => {
          !!team.id &&
            apiService.getSetsForOneTeam(team.id).then((sets) => {
              newSets = [...newSets, ...sets];
              setPublicSets(newSets);
            });
        });
      } else {
        const searchFail = () =>
          customErrorToast(
            'Search returned 0 results or no more teams.  Please try again with other parameters or go back.'
          );
        searchFail();
        return;
      }
    });
  };

  useEffect(() => {
    getUserState();
    searchTenTeamsWithSets();
  }, [page]);

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

  const clearUserState = () => {
    setUserFolders([]);
    setUserTeams([]);
    setUserSets([]);
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
        customSuccessToast('Posted New Folder!!');
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

            const altered = parsed.map((fullteam: ParseReturn) => {
              const createdTeam = newVals.find(
                (team) => team.team_name === Object.keys(fullteam)[0]
              );

              const sets = Object.values(fullteam)[0];

              return sets.map((set: PokemonSet) => {
                const def = {
                  team_id: createdTeam?.id,
                  species: 'Pikachu',
                  level: 100,
                  shiny: false,
                  gigantamax: false,
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

                const s = {
                  ...def,
                  team_id: createdTeam?.id,
                  nickname: set.nickname,
                  species: set.species,
                  gender: set.gender,
                  item: set.item,
                  ability: set.ability,
                  level: set.level,
                  shiny: set.shiny,
                  gigantamax: set.gigantamax,
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
              (set: PokemonSet): Promise<PokemonSet> => {
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
      .catch((error) => {
        const folderErrorToast = () =>
          customErrorToast(`Posting New Folder Failed: ${error}`);
        folderErrorToast();
      })
      .then(() => {
        setFolderAddClicked(!folderAddClicked);
        setNewFolderName({ value: '', touched: false });
        setNewFolderImport({ value: '', touched: false });
      });
  };

  const handleCreateDefaultPokemon = (team_id: string) => {
    const set_body = {
      team_id,
      nickname: null,
      species: 'Pikachu',
      gender: null,
      item: null,
      ability: null,
      level: 100,
      shiny: false,
      gigantamax: false,
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
      move_two: null,
      move_three: null,
      move_four: null,
    };

    apiService
      .postUserSet(
        set_body,
        jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id
      )
      .then((set) => {
        customSuccessToast('Posted New Pokemon Set!!');
        setUserSets([...userSets, set]);
      })
      .catch((error) => {
        const setErrorToast = () =>
          customErrorToast(`Posting New Pokemon Set Failed: ${error}`);
        setErrorToast();
      });
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
        customSuccessToast('Posted New Team!!');
        setUserTeams([
          ...userTeams,
          {
            ...team,
            folder_id: currentClickedFolder.id,
          },
        ]);
        if (newTeamImport.value) {
          const parsed = showdownParse(newTeamImport.value);

          const setPromises = parsed.map((set: PokemonSet) => {
            const def = {
              team_id: team.id,
              species: 'Pikachu',
              level: 100,
              shiny: false,
              gigantamax: false,
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

            const set_body = {
              ...def,
              team_id: team.id,
              nickname: set.nickname,
              species: set.species,
              gender: set.gender,
              item: set.item,
              ability: set.ability,
              level: set.level,
              shiny: set.shiny,
              gigantamax: set.gigantamax,
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
      })
      .catch((error) => {
        const teamErrorToast = () =>
          customErrorToast(`Posting New Team Failed: ${error}`);
        teamErrorToast();
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

    const folderSuccessToast = () =>
      customSuccessToast('Successfully Edited Folder!!');

    apiService
      .patchUserFolder(newFolderName.value, currentClickedFolder.id, userId)
      .then(() => {
        folderSuccessToast();
      })
      .catch((error) => {
        const setErrorToast = () =>
          customErrorToast(`Editing Folder Failed: ${error}`);
        setErrorToast();
      });

    const folder = { folder_name: newFolderName.value };

    setUserFolders(
      userFolders.map((fldr: PokemonFolder) => {
        return fldr.id.toString() !== currentClickedFolder.id
          ? fldr
          : { ...fldr, ...folder };
      })
    );
  };

  const handleUpdateTeam = (teamname: string, desc: string, id: string) => {
    const body = { id: id, team_name: teamname, description: desc };
    const userId = jwtDecode<MyToken>(
      TokenService.getAuthToken() || ''
    ).user_id;
    apiService
      .patchUserTeam(body, userId)
      .then(() => {
        customSuccessToast('Successfully Edited Team!!');
      })
      .catch((error) => {
        const setErrorToast = () =>
          customErrorToast(`Editing Team Failed: ${error}`);
        setErrorToast();
      });

    const team = { team_name: teamname, description: desc };

    setUserTeams(
      userTeams.map((tm) => {
        return tm.id !== id ? tm : { ...tm, ...team };
      })
    );
  };

  const handleUpdateSet = (
    id: string | undefined,
    nickname: string,
    species: string,
    gender: string,
    shiny: boolean,
    gigantamax: boolean,
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
      /** safeguard against switching between species */
      gigantamax: legality.isGigantamaxSpecies(species) ? gigantamax : false,
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

    const setSuccessToast = () =>
      customSuccessToast('Successfully Edited Pokemon Set!!');
    apiService
      .patchUserSet(body, userId)
      .then(() => {
        setSuccessToast();
      })
      .catch((error) => {
        const setErrorToast = () =>
          customErrorToast(`Editing Pokemon Set Failed: ${error}`);
        setErrorToast();
      });

    const set = {
      nickname,
      species,
      gender,
      item,
      ability,
      level,
      shiny,
      gigantamax,
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

  const handleUpdateSetImport = (id?: string) => {
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
      gigantamax: parsed.gigantamax,
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
    apiService
      .patchUserSet(body, userId)
      .then(() => {
        customSuccessToast('Team Import Successful!!');
      })
      .catch((error) => {
        const setErrorToast = () =>
          customErrorToast(`Pokemon Set Import Failed: ${error}`);
        setErrorToast();
      });

    const set = {
      nickname: parsed.nickname,
      species: parsed.species,
      gender: parsed.gender,
      item: parsed.item,
      ability: parsed.ability,
      level: Number(parsed.level),
      shiny: parsed.shiny,
      gigantamax: parsed.gigantamax,
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
    apiService.deleteUserFolder(currentClickedFolder.id);

    setUserFolders(
      userFolders.filter(
        (folder: PokemonFolder) => folder.id !== currentClickedFolder.id
      )
    );
    setCurrentClickedFolder({ value: '', id: '', touched: false });
  };

  const handleDeleteTeam = (team_id: string) => {
    apiService.deleteUserTeam(team_id);

    const newUserTeams = userTeams.filter((team) => team.id !== team_id);
    const newPublicTeams = publicTeams.filter((team) => team.id !== team_id);
    setPublicTeams(newPublicTeams);
    setUserTeams(newUserTeams);
    setCurrentClickedTeam({ value: '', id: '', touched: false });
  };

  const handleDeleteSet = (team_id: string, set_id: string) => {
    apiService.deleteUserSet(team_id, set_id);

    const newUserSets = userSets.filter((set) => set.id !== set_id);
    const newPublicSets = publicSets.filter((set) => set.id !== set_id);
    setPublicSets(newPublicSets);
    setUserSets(newUserSets);
  };

  const handlePage = (direction: 'up' | 'down') => {
    setPage(direction === 'up' ? page + 1 : page - 1);
    searchTenTeamsWithSets();
  };

  const handleSearch = () => {
    searchTenTeamsWithSets();
  };

  const handleFilter = () => {
    const query = createQuery();
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
    handleDeleteFolder,
    handleDeleteSet,
    handleDeleteTeam,
    handleEditFolder,
    handleFilter,
    handlePostNewFolder,
    handleCreateDefaultPokemon,
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
