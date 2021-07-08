import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import TokenService from '../services/token-service';
import jwtDecode from 'jwt-decode';
import showdownParse from '../functions/parse';
import showdownFolderParse from '../functions/parseFolder';
import legality from '../functions/legality';

type Props = {
  children: React.ReactNode;
};

export interface StringInput {
  value: string;
  touched: boolean;
}

export interface StringIDInput {
  value: string;
  id: string;
  touched: boolean;
}

export interface PageVal {
  value: number;
}

export interface MyToken {
  sub: any;
  user_id: any;
}

interface CreateProvider {
  userFolders: any[];
  userTeams: any[];
  userSets: any[];
  publicTeams: any[];
  publicSets: any[];
  folderAddClicked: boolean;
  currentClickedFolder: StringIDInput;
  newFolderName: StringInput;
  newFolderImport: StringInput;
  teamAddClicked: boolean;
  currentClickedTeam: StringIDInput;
  newTeamName: StringInput;
  desc: StringInput;
  newTeamImport: StringInput;
  newSetImport: StringInput;
  search: StringInput;
  sort: StringInput;
  filter: StringInput;
  filtersort: StringInput;
  page: PageVal;
  setNewFolderName(string: string): void;
  handleFolderAddClickExpand(): any;
  handlePostNewFolder(): any;
  validateNewFolderName(): any;
  validateCurrentFolderClicked(): any;
  handleCurrentFolderClicked(string: string, id: string): void; // should be number for id?
  validateNewFolderImport(): any;
  handleEditFolder(): any;
  handleDeleteFolder(): any;
  setNewFolderContents(contents: string): any;
  setNewTeamName(name: string): any;
  setNewTeamContents(contents: string): any;
  handleTeamAddClickExpand(): any;
  handlePostNewTeam(): any;
  validateNewTeamName(): any;
  validateNewTeamImport(): any;
  handleUpdateTeam(name: string, desc: string, id: number): any;
  handleDeleteTeam(id: number): any;
  handleDeleteSet(team_id: number, set_id: number): any;
  handleUpdateSet(
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
  ): any;
  setNewSetContents(value: string): any;
  setDesc(desc: string): any;
  validateDesc(): any;
  validateNewSetImport(): any;
  handleUpdateSetImport(value: number): any;
  handlePostNewPokemon(id: number): any;
  clearUserState(): any;
  getUserState(): any;
  setSearch(string: string): any;
  setSort(string: string): any;
  validateSearch(): any;
  handleSearch(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): any;
  setFilter(string: string): any;
  setFilterSort(string: string): any;
  validateFilter(): any;
  handleFilter(): any;
  handlePageUp(): any;
  handlePageDown(): any;
  addPublicSets(): any;
  clearPublicSets(): any;
}

interface StateProvider {
  userFolders: any[];
  userTeams: any[];
  userSets: any[];
  publicTeams: any[];
  publicSets: any[];
  folderAddClicked: boolean;
  currentClickedFolder: StringIDInput;
  newFolderName: StringInput;
  teamAddClicked: boolean;
  currentClickedTeam: StringIDInput;
  newTeamName: StringInput;
  desc: StringInput;
  newTeamImport: StringInput;
  newFolderImport: StringInput;
  newSetImport: StringInput;
  search: StringInput;
  sort: StringInput;
  filter: StringInput;
  filtersort: StringInput;
  page: PageVal;
}

const GeneralContext = React.createContext<CreateProvider>({
  userFolders: [],
  userTeams: [],
  userSets: [],
  publicTeams: [],
  publicSets: [],
  newFolderImport: { value: '', touched: false },
  folderAddClicked: false,
  currentClickedFolder: { value: '', id: '', touched: false },
  newFolderName: { value: '', touched: false },
  teamAddClicked: false,
  currentClickedTeam: { value: '', id: '', touched: false },
  newTeamName: { value: '', touched: false },
  desc: { value: '', touched: false },
  newTeamImport: { value: '', touched: false },
  newSetImport: { value: '', touched: false },
  search: { value: '', touched: false },
  sort: { value: '', touched: false },
  filter: { value: '', touched: false },
  filtersort: { value: '', touched: false },
  page: { value: 1 },

  setNewFolderName: () => {},
  handleFolderAddClickExpand: () => {},
  handlePostNewFolder: () => {},
  validateNewFolderName: () => {},
  validateCurrentFolderClicked: () => {},
  handleCurrentFolderClicked: () => {},
  handleEditFolder: () => {},
  handleDeleteFolder: () => {},
  setNewFolderContents: () => {},
  validateNewFolderImport: () => {},
  setNewTeamName: () => {},
  setNewTeamContents: () => {},
  handleTeamAddClickExpand: () => {},
  handlePostNewTeam: () => {},
  validateNewTeamName: () => {},
  validateNewTeamImport: () => {},
  handleUpdateTeam: () => {},
  handleDeleteTeam: () => {},
  handleDeleteSet: () => {},
  handleUpdateSet: () => {},
  setNewSetContents: () => {},
  setDesc: () => {},
  validateDesc: () => {},
  validateNewSetImport: () => {},
  handleUpdateSetImport: () => {},
  handlePostNewPokemon: () => {},
  clearUserState: () => {},
  getUserState: () => {},
  setSearch: () => {},
  setSort: () => {},
  validateSearch: () => {},
  handleSearch: () => {},
  setFilter: () => {},
  setFilterSort: () => {},
  validateFilter: () => {},
  handleFilter: () => {},
  handlePageUp: () => {},
  handlePageDown: () => {},
  addPublicSets: () => {},
  clearPublicSets: () => {},
});

export default GeneralContext;

export const GeneralProvider = ({ children }: Props) => {
  const [state, setState] = useState<StateProvider>({
    userFolders: [],
    userTeams: [],
    userSets: [],
    publicTeams: [],
    publicSets: [],
    folderAddClicked: false,
    currentClickedFolder: { value: '', id: '', touched: false },
    newFolderName: { value: '', touched: false },
    newFolderImport: { value: '', touched: false },
    teamAddClicked: false,
    currentClickedTeam: { value: '', id: '', touched: false },
    newTeamName: { value: '', touched: false },
    desc: { value: '', touched: false },
    newTeamImport: { value: '', touched: false },
    newSetImport: { value: '', touched: false },
    search: { value: '', touched: false },
    sort: { value: '', touched: false },
    filter: { value: '', touched: false },
    filtersort: { value: '', touched: false },
    page: { value: 1 },
  });

  useEffect(() => {
    if (TokenService.getAuthToken()) {
      const user_id = jwtDecode<MyToken>(
        TokenService.getAuthToken() || ''
      ).user_id;

      apiService.getUserFolders(user_id).then((data) => {
        setState((oldVals) => ({ ...oldVals, userFolders: data }));
      });

      apiService.getUserTeams(user_id).then((data) => {
        setState((oldVals) => ({ ...oldVals, userTeams: data }));
      });

      apiService.getUserSets(user_id).then((data) => {
        setState((oldVals) => ({ ...oldVals, userSets: data }));
      });
    }

    const search = state.search.value || 'all';
    const sort = state.sort.value || 'newest';
    const page = state.page.value;
    const query = `?page=${page}&sort=${sort}&species=${search.toLowerCase()}`;
    apiService.getTenTeamsSearch(query).then((teams) => {
      setState((oldVals) => ({ ...oldVals, publicTeams: teams }));
      setState((oldVals) => ({ ...oldVals, publicSets: [] }));
      let newSets: any[] = [];
      teams.forEach((team: any) => {
        apiService.getSetsForOneTeam(team.id).then((sets) => {
          newSets = [...newSets, ...sets];
          setState((oldVals) => ({ ...oldVals, publicSets: newSets }));
        });
      });
    });
  }, [state.page.value, state.search.value, state.sort.value]);

  const setNewFolderName = (newFolderName: any) => {
    setState((oldVals) => ({
      ...oldVals,
      newFolderName: { value: newFolderName, touched: true },
    }));
  };

  const handleFolderAddClickExpand = () => {
    setState((oldVals) => ({
      ...oldVals,
      folderAddClicked: !state.folderAddClicked,
    }));
  };

  const handleCurrentFolderClicked = (name: string, folder_id: any) => {
    setState((oldVals) => ({
      ...oldVals,
      currentClickedFolder: { value: name, id: folder_id, touched: true },
    }));
  };

  const setNewFolderContents = (newFolderImport: any) => {
    setState((oldVals) => ({
      ...oldVals,
      newFolderImport: { value: newFolderImport, touched: true },
    }));
  };

  const setNewTeamName = (newTeamName: any) => {
    setState((oldVals) => ({
      ...oldVals,
      newTeamName: { value: newTeamName, touched: true },
    }));
  };

  const setDesc = (desc: any) => {
    setState((oldVals) => ({
      ...oldVals,
      desc: { value: desc, touched: true },
    }));
  };

  const setNewTeamContents = (newTeamImport: any) => {
    setState((oldVals) => ({
      ...oldVals,
      newTeamImport: { value: newTeamImport, touched: true },
    }));
  };

  const handleTeamAddClickExpand = () => {
    setState((oldVals) => ({
      ...oldVals,
      teamAddClicked: !state.teamAddClicked,
    }));
  };

  const setNewSetContents = (newSetImport: any) => {
    setState((oldVals) => ({
      ...oldVals,
      newSetImport: { value: newSetImport, touched: true },
    }));
  };

  const setSearch = (searchval: any) => {
    setState((oldVals) => ({
      ...oldVals,
      search: { value: searchval, touched: true },
    }));
  };

  const setSort = (sortval: any) => {
    setState((oldVals) => ({
      ...oldVals,
      sort: { value: sortval, touched: true },
    }));
  };

  const setFilter = (filter: any) => {
    setState((oldVals) => ({
      ...oldVals,
      filter: { value: filter, touched: true },
    }));
  };

  const setFilterSort = (filtersort: any) => {
    setState((oldVals) => ({
      ...oldVals,
      filtersort: { value: filtersort, touched: true },
    }));
  };

  const handlePageUp = () => {
    setState((oldVals) => ({
      ...oldVals,
      page: { value: state.page.value + 1 },
    }));

    const search = state.search.value || 'all';
    const sort = state.sort.value || 'newest';
    const page = state.page.value + 1;
    const query = `?page=${page}&sort=${sort}&species=${search.toLowerCase()}`;
    apiService.getTenTeamsSearch(query).then((teams) => {
      setState((oldVals) => ({ ...oldVals, publicTeams: teams }));
      setState((oldVals) => ({ ...oldVals, publicSets: [] }));
      teams.forEach((team: any) => {
        apiService.getSetsForOneTeam(team.id).then((sets) => {
          setState((oldVals) => ({
            ...oldVals,
            publicSets: [...state.publicSets, ...sets],
          }));
        });
      });
    });
  };

  const handlePageDown = () => {
    if (state.page.value > 1) {
      setState((oldVals) => ({
        ...oldVals,
        page: { value: state.page.value - 1 },
      }));

      const search = state.search.value || 'all';
      const sort = state.sort.value || 'newest';
      const page = state.page.value - 1;
      const query = `?page=${page}&sort=${sort}&species=${search.toLowerCase()}`;
      apiService.getTenTeamsSearch(query).then((teams) => {
        setState((oldVals) => ({ ...oldVals, publicTeams: teams }));
        setState((oldVals) => ({ ...oldVals, publicSets: [] }));
        teams.forEach((team: any) => {
          apiService.getSetsForOneTeam(team.id).then((sets) => {
            setState((oldVals) => ({
              ...oldVals,
              publicSets: [...state.publicSets, ...sets],
            }));
          });
        });
      });
    }
  };

  const clearUserState = () => {
    setState((oldVals) => ({
      ...oldVals,
      userFolders: [],
      userTeams: [],
      userSets: [],
    }));
  };

  const clearPublicSets = () => {
    setState((oldVals) => ({ ...oldVals, publicSets: [] }));
  };

  const getUserState = () => {
    if (TokenService.getAuthToken()) {
      const user_id = jwtDecode<MyToken>(
        TokenService.getAuthToken() || ''
      ).user_id;

      apiService.getUserFolders(user_id).then((data) => {
        setState((oldVals) => ({ ...oldVals, userFolders: data }));
      });

      apiService.getUserTeams(user_id).then((data) => {
        setState((oldVals) => ({ ...oldVals, userTeams: data }));
      });

      apiService.getUserSets(user_id).then((data) => {
        setState((oldVals) => ({ ...oldVals, userSets: data }));
      });
    }
  };

  const addPublicSets = (sets: any) => {
    setState((oldVals) => ({
      ...oldVals,
      publicSets: [...state.publicSets, ...sets],
    }));
  };

  const validateNewFolderName = (): any => {
    let folder_name = state.newFolderName.value;
    if (!folder_name) {
      return `Please provide a folder name!`;
    }
  };

  const validateCurrentFolderClicked = (): any => {
    let folder = state.currentClickedFolder.id;
    if (!folder) {
      return `You'll need to click on a folder in order to add a team!`;
    }
  };

  const validateNewFolderImport = () => {
    let flag;
    let folder_import = state.newFolderImport.value;
    if (folder_import) {
      showdownFolderParse(folder_import).forEach((fullteam: any) => {
        const [teamName, sets]: any = Object.entries(fullteam)[0];
        if (!teamName) {
          flag = `You are missing the team name in the import for one of your teams!
        Make sure that there is a team name before each group of sets
        (Hint: Should be formatted like this: === [format] Folder/Team Name ===)`;
        }

        sets.forEach((set: any) => {
          if (!legality.isLegalSpecies(set.species)) {
            flag = `There is an illegal species in your set.  Please check each line
          and fix this to be in the proper format! 
          (Hint: It could be extra white space at the end because of Showdown's Exporter)
          (Hint: There could be a typo in your species name!)`;
          }
        });
      });
    }
    return flag;
  };

  const validateNewTeamName = (): any => {
    let team_name = state.newTeamName.value;
    if (!team_name) {
      return `Please provide a team name!`;
    }
  };

  const validateDesc = (): any => {
    let description = state.desc.value;
    if (typeof description !== 'string') {
      return `This should never come up, it is superflous`;
    }
  };

  const validateNewTeamImport = () => {
    let flag;
    let team_import = state.newTeamImport.value;
    if (team_import) {
      showdownParse(team_import).forEach((set: any) => {
        if (!legality.isLegalSpecies(set.species)) {
          flag = `There is an illegal species in your set.  Please fix this to be in the proper format! 
        (Hint: It could be extra white space at the end because of Showdown's Exporter)
        (Hint: There could be a typo in your species name!)`;
        }
      });
    }
    return flag;
  };

  const validateNewSetImport = () => {
    let flag;
    let set_import = state.newSetImport.value;

    if (showdownParse(set_import).length > 1) {
      flag = `You can only import 1 set here.`;
    }
    showdownParse(set_import).forEach((set: any) => {
      if (!legality.isLegalSpecies(set.species)) {
        flag = `There is an illegal species in your set.  Please fix this to be in the proper format! 
        (Hint: It could be extra white space at the end because of Showdown's Exporter)
        (Hint: There could be a typo in your species name!)`;
      }
    });
    return flag;
  };

  const validateSearch = (): any => {
    let search = state.search.value;
    search = search.toString().trim();
    if (!legality.isLegalSpecies(search)) {
      return `Must be an 'existing' Pokemon species or form styled via '[species]-[form]'!`;
    }
  };

  const validateFilter = (): any => {
    let filter = state.filter.value;
    filter = filter.toString().trim();
    if (!legality.isLegalSpecies(filter)) {
      return `Must be an 'existing' Pokemon species or form styled via '[species]-[form]'!`;
    }
  };

  const handlePostNewFolder = (): any => {
    const folder_name = state.newFolderName.value;
    const contents = state.newFolderImport.value;
    let folder: any;
    apiService
      .postUserFolder(
        folder_name,
        jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id
      )
      .then((f) => {
        folder = f;
        setState((oldVals) => ({
          ...oldVals,
          userFolders: [...state.userFolders, folder],
        }));
      })
      .then(() => {
        if (contents) {
          const parsed = showdownFolderParse(contents);

          const teamPromises: Promise<any>[] = parsed.map(
            (fullteam: object): Promise<any> => {
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
            setState((oldVals) => ({
              ...oldVals,
              userTeams: [...state.userTeams, ...newVals],
            }));

            let allSets: any = [];

            let altered = parsed.map((fullteam: object) => {
              const createdTeam = newVals.find(
                (team) => team.team_name === Object.keys(fullteam)[0]
              );

              const sets = Object.values(fullteam)[0];

              return sets.map((set: any) => {
                let def = {
                  team_id: createdTeam.id,
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
                  team_id: createdTeam.id,
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

            altered.forEach((sets: any) => {
              allSets = [...allSets, ...sets];
            });

            const setPromises: Promise<any>[] = allSets.map(
              (set: any): Promise<any> => {
                return apiService.postUserSet(
                  set,
                  jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id
                );
              }
            );

            Promise.all(setPromises).then((sets) => {
              setState((oldVals) => ({
                ...oldVals,
                userSets: [...state.userTeams, ...sets],
              }));
            });
          });
        }
      })
      .then(() => {
        setState((oldVals) => ({
          ...oldVals,
          folderAddClicked: !state.folderAddClicked,
          newFolderName: { value: '', touched: false },
          newFolderImport: { value: '', touched: false },
        }));
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
      .then((set) =>
        setState((oldVals) => ({
          ...oldVals,
          userSets: [...state.userSets, set],
        }))
      );
  };

  const handlePostNewTeam = () => {
    const team_name = state.newTeamName.value;
    const desc = state.desc.value;
    const currentClickedFolder = state.currentClickedFolder.id;
    const contents = state.newTeamImport.value;
    const body = {
      team_name,
      description: desc,
      folder_id: currentClickedFolder,
    };

    apiService
      .postUserTeam(
        body,
        jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id
      )
      .then((team) => {
        setState((oldVals) => ({
          ...oldVals,
          userTeams: [
            ...state.userTeams,
            {
              ...team,
              folder_name: state.currentClickedFolder.value,
              user_id: jwtDecode<MyToken>(TokenService.getAuthToken() || '')
                .user_id,
              user_name: jwtDecode<MyToken>(TokenService.getAuthToken() || '')
                .sub,
            },
          ],
        }));
        if (contents) {
          const parsed = showdownParse(contents);

          let setPromises = parsed.map((set: any) => {
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
            setState((oldVals) => ({
              ...oldVals,
              userSets: [...state.userSets, ...sets],
            }));
          });
        }
      });
    setState((oldVals) => ({
      ...oldVals,
      teamAddClicked: !state.teamAddClicked,
      newTeamName: { value: '', touched: false },
      desc: { value: '', touched: false },
      newTeamImport: { value: '', touched: false },
    }));
  };

  const handleEditFolder = () => {
    const folder_name = state.newFolderName.value;
    const id = state.currentClickedFolder.id;
    const userId = jwtDecode<MyToken>(
      TokenService.getAuthToken() || ''
    ).user_id;
    apiService.patchUserFolder(folder_name, id, userId);

    const folder = { folder_name: folder_name };

    setState((oldVals) => ({
      ...oldVals,
      userFolders: state.userFolders.map((fldr) => {
        return fldr.id !== id ? fldr : { ...fldr, ...folder };
      }),
    }));
  };

  const handleUpdateTeam = (teamname: any, desc: any, id: any) => {
    const body = { id: id, team_name: teamname, description: desc };
    const userId = jwtDecode<MyToken>(
      TokenService.getAuthToken() || ''
    ).user_id;
    apiService.patchUserTeam(body, userId);

    const team = { team_name: teamname, description: desc };

    setState((oldVals) => ({
      ...oldVals,
      userTeams: state.userTeams.map((tm) => {
        return tm.id !== id ? tm : { ...tm, ...team };
      }),
    }));
  };

  const handleUpdateSet = (
    id: any,
    nickname: any,
    species: any,
    gender: any,
    shiny: any,
    item: any,
    ability: any,
    level: any,
    happiness: any,
    nature: any,
    hp_ev: any,
    atk_ev: any,
    def_ev: any,
    spa_ev: any,
    spd_ev: any,
    spe_ev: any,
    hp_iv: any,
    atk_iv: any,
    def_iv: any,
    spa_iv: any,
    spd_iv: any,
    spe_iv: any,
    move_one: any,
    move_two: any,
    move_three: any,
    move_four: any
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
    setState((oldVals) => ({
      ...oldVals,
      userSets: state.userSets.map((s) => {
        return s.id !== id ? s : { ...s, ...set };
      }),
    }));
  };

  const handleUpdateSetImport = (id: any) => {
    const contents = state.newSetImport.value;
    const parsed = showdownParse(contents)[0];
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

    setState((oldVals) => ({
      ...oldVals,
      userSets: state.userSets.map((s) => {
        return s.id !== id ? s : { ...s, ...set };
      }),
      newSetImport: { value: '', touched: false },
    }));
  };

  const handleDeleteFolder = () => {
    const folder_id = Number(state.currentClickedFolder.id);
    apiService.deleteUserFolder(folder_id);

    const newFolders = state.userFolders.filter(
      (folder) => Number(folder.id) !== Number(folder_id)
    );
    setState((oldVals) => ({
      ...oldVals,
      userFolders: newFolders,
      currentClickedFolder: { value: '', id: '', touched: false },
    }));
  };

  const handleDeleteTeam = (team_id: any) => {
    apiService.deleteUserTeam(Number(team_id));

    const newUserTeams = state.userTeams.filter(
      (team) => Number(team.id) !== Number(team_id)
    );
    const newPublicTeams = state.publicTeams.filter(
      (team) => Number(team.id) !== Number(team_id)
    );
    setState((oldVals) => ({
      ...oldVals,
      publicTeams: newPublicTeams,
      userTeams: newUserTeams,
      currentClickedTeam: { value: '', id: '', touched: false },
    }));
  };

  const handleDeleteSet = (team_id: any, set_id: any) => {
    apiService.deleteUserSet(Number(team_id), Number(set_id));

    const newUserSets = state.userSets.filter(
      (set) => Number(set.id) !== Number(set_id)
    );
    const newPublicSets = state.publicSets.filter(
      (set) => Number(set.id) !== Number(set_id)
    );
    setState((oldVals) => ({
      ...oldVals,
      publicSets: newPublicSets,
      userSets: newUserSets,
    }));
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    const search = state.search.value || 'all';
    const sort = state.sort.value || 'newest';
    const page = state.page.value;
    const query = `?page=${page}&sort=${sort}&species=${search.toLowerCase()}`;
    apiService.getTenTeamsSearch(query).then((teams) => {
      setState((oldVals) => ({ ...oldVals, publicTeams: teams }));
      setState((oldVals) => ({ ...oldVals, publicSets: [] }));
      teams.forEach((team: any) => {
        apiService.getSetsForOneTeam(team.id).then((sets) => {
          setState((oldVals) => ({
            ...oldVals,
            publicSets: [...state.publicSets, ...sets],
          }));
        });
      });
    });
  };

  const handleFilter = () => {
    const filter = state.filter.value || 'all';
    const filtersort = state.filtersort.value || 'newest';
    const query = `?sort=${filtersort}&species=${filter.toLowerCase()}`;
    if (TokenService.getAuthToken()) {
      const user_id = jwtDecode<MyToken>(
        TokenService.getAuthToken() || ''
      ).user_id;
      apiService.getUserFoldersFilter(user_id, query).then((data) => {
        setState((oldVals) => ({ ...oldVals, userFolders: data }));
      });
      apiService.getUserTeamsFilter(user_id, query).then((data) => {
        setState((oldVals) => ({ ...oldVals, userTeams: data }));
      });
    }
  };

  const value: any = {
    userFolders: state.userFolders,
    userTeams: state.userTeams,
    userSets: state.userSets,
    publicTeams: state.publicTeams,
    publicSets: state.publicSets,
    folderAddClicked: state.folderAddClicked,
    currentClickedFolder: state.currentClickedFolder,
    newFolderName: state.newFolderName,
    teamAddClicked: state.teamAddClicked,
    currentClickedTeam: state.currentClickedTeam,
    newTeamName: state.newTeamName,
    desc: state.desc,
    newTeamImport: state.newTeamImport,
    newFolderImport: state.newFolderImport,
    newSetImport: state.newSetImport,
    search: state.search,
    sort: state.sort,
    filter: state.filter,
    filtersort: state.filtersort,
    page: state.page,
    setNewFolderName: setNewFolderName,
    handleFolderAddClickExpand: handleFolderAddClickExpand,
    handlePostNewFolder: handlePostNewFolder,
    validateNewFolderName: validateNewFolderName,
    validateCurrentFolderClicked: validateCurrentFolderClicked,
    handleCurrentFolderClicked: handleCurrentFolderClicked,
    handleEditFolder: handleEditFolder,
    handleDeleteFolder: handleDeleteFolder,
    setNewFolderContents: setNewFolderContents,
    validateNewFolderImport: validateNewFolderImport,
    setNewTeamName: setNewTeamName,
    setNewTeamContents: setNewTeamContents,
    handleTeamAddClickExpand: handleTeamAddClickExpand,
    handlePostNewTeam: handlePostNewTeam,
    validateNewTeamName: validateNewTeamName,
    validateNewTeamImport: validateNewTeamImport,
    handleUpdateTeam: handleUpdateTeam,
    handleDeleteTeam: handleDeleteTeam,
    handleDeleteSet: handleDeleteSet,
    handleUpdateSet: handleUpdateSet,
    setNewSetContents: setNewSetContents,
    setDesc: setDesc,
    validateDesc: validateDesc,
    validateNewSetImport: validateNewSetImport,
    handleUpdateSetImport: handleUpdateSetImport,
    handlePostNewPokemon: handlePostNewPokemon,
    clearUserState: clearUserState,
    getUserState: getUserState,
    setSearch: setSearch,
    setSort: setSort,
    validateSearch: validateSearch,
    handleSearch: handleSearch,
    setFilter: setFilter,
    setFilterSort: setFilterSort,
    validateFilter: validateFilter,
    handleFilter: handleFilter,
    handlePageUp: handlePageUp,
    handlePageDown: handlePageDown,
    addPublicSets: addPublicSets,
    clearPublicSets: clearPublicSets,
  };

  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
};
