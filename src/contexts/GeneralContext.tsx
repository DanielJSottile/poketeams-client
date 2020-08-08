import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import TokenService from '../services/token-service';
import jwtDecode from 'jwt-decode';
import showdownParse from '../functions/parse';
import legality from '../functions/legality';

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

export interface Provider {
  userFolders?: Array<any>,
  userTeams?: Array<any>,
  userSets?: Array<any>,
  publicTeams?: Array<any>,
  publicSets?: Array<any>,
  //folders-user
  folderAddClicked?: boolean,
  currentClickedFolder?: StringIDInput,
  newFolderName?: StringInput,
  //teams-user
  teamAddClicked?: boolean,
  currentClickedTeam?: StringIDInput,
  newTeamName?: StringInput,
  desc?: StringInput,
  newTeamImport?: StringInput,
  //sets-teams-user
  newSetImport?: StringInput,
  // search
  search?: StringInput,
  sort?: StringInput,
  filter?: StringInput,
  filtersort?: StringInput,
  page?: PageVal,
  teamExpandToggle?: boolean,
  setExpandToggle?: boolean,
}

interface MyToken {
sub: any;
user_id: any;
// whatever else is in the JWT.
}

const GeneralContext = React.createContext({
  userFolders: [],
  userTeams: [],
  userSets: [],
  publicTeams: [],
  publicSets: [],
  //folders-user
  folderAddClicked: false,
  currentClickedFolder: {value: '', id: '', touched: false},
  newFolderName: {value: '', touched: false},
  //teams-user
  teamAddClicked: false,
  currentClickedTeam: {value: '', id: '', touched: false},
  newTeamName: {value: '', touched: false},
  desc: {value: '', touched: false},
  newTeamImport: {value: '', touched: false},
  //sets-teams-user
  newSetImport: {value: '', touched: false},
  // search
  search: {value: '', touched: false},
  sort: {value: '', touched: false},
  filter: {value: '', touched: false},
  filtersort: {value: '', touched: false},
  page: {value: 1},

  setNewFolderName: (string: string): void => {},
  handleFolderAddClickExpand: () => {},
  handlePostNewFolder: () => {},
  validateNewFolderName: (): any => {},
  validateCurrentFolderClicked: () => {},
  handleCurrentFolderClicked: (string: string, id: string): void => {}, // should be number for id?
  handleEditFolder: () => {},
  handleDeleteFolder: () => {},
  // user team functions
  setNewTeamName: (name: string): any => {},
  setNewTeamContents: (contents: string): any => {},
  handleTeamAddClickExpand: () => {},
  handlePostNewTeam: () => {},
  validateNewTeamName: (): any => {},
  validateNewTeamImport: (): any => {},
  handleCurrentTeamClicked: (name: string, id: number): any => {},
  handleUpdateTeam: (name: string, desc: string, id: number): any => {},
  handleDeleteTeam: (id: number): any => {},
  // user set functions
  handleDeleteSet: (team_id: number, set_id: number): any => {},
  handleUpdateSet: (
    id: number,
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
    move_four: string,
  ) => {},
  setNewSetContents: (value: string): any => {},
  setDesc: (desc: string): any => {},
  validateDesc: (): any => {},
  validateNewSetImport: (): any => {},
  handleUpdateSetImport: (value: number): any => {},
  handlePostNewPokemon: (id: number): any => {},
  clearUserState: () => {},
  getUserState: () => {},
  // search functions
  setSearch: (string: string): void => {},
  setSort: (string: string): void => {},
  validateSearch: () => {},
  handleSearch: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {},
  setFilter: (string: string): void => {},
  setFilterSort: (string: string): void => {},
  validateFilter: () => {},
  handleFilter: () => {},
  handlePageUp: () => {},
  handlePageDown: () => {},
  // share functions
  addPublicSets: () => {},
  clearPublicSets: () => {},
});

export default GeneralContext;

export function GeneralProvider(props: any) {
  const [state, setState] = useState<Provider>();

  useEffect(() => {
    if (TokenService.getAuthToken()){ // if user is logged in
      const user_id = jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id

      apiService.getUserFolders(user_id) // Get Public Teams First
      .then(data => {
        setState(oldVals => ({...oldVals, userFolders: data}));
      });

      apiService.getUserTeams(user_id) // Get Public Teams First
      .then(data => {
        setState(oldVals => ({...oldVals, userTeams: data}));
      });

      apiService.getUserSets(user_id) // Get Public Teams First
      .then(data => {
        setState(oldVals => ({...oldVals, userSets: data}));
      });
    };

    const search = state?.search?.value || 'all';
    const sort = state?.sort?.value || 'newest';
    const page = state?.page?.value;
    const query = `?page=${page}&sort=${sort}&species=${search.toLowerCase()}`
    apiService.getTenTeamsSearch(query)
      .then((teams: any) => {
        setState(oldVals => ({...oldVals, publicTeams: teams}));
        setState(oldVals => ({...oldVals, publicSets: []})); // lets clear the publicSets because we are reseeding them! with our search
        let newSets: any[] = []; // before we were setting the public sets in setState...this was causing a bug.
        teams.forEach((team: any) => { // now we need to get the sets for those 10 teams and put them in state.
          apiService.getSetsForOneTeam(team.id)
            .then(sets => {
              newSets = [...newSets, ...sets]
              setState(oldVals => ({...oldVals, publicSets: newSets}));
            });
        });
      });
    }, 
  [
    state
  ]
  );

  // State Input Update Functions 

  // User Folders

  const setNewFolderName = (newFolderName: string) => {
    setState(oldVals => ({...oldVals, newFolderName: {value: newFolderName, touched: true}}));
  };

  const handleFolderAddClickExpand = () => {
    setState(oldVals => ({...oldVals, folderAddClicked: !state?.folderAddClicked}));
  };

  const handleCurrentFolderClicked = (name: string, folder_id: string) => {
    setState(oldVals => ({...oldVals, currentClickedFolder: {value: name, id: folder_id, touched: true}}));
  };

  // User Teams

  const setNewTeamName = (newTeamName: string) => {
    setState(oldVals => ({...oldVals, newTeamName: {value: newTeamName, touched: true}}));
  };

  const setDesc = (desc: string) => {
    setState(oldVals => ({...oldVals, desc: {value: desc, touched: true}}));
  };

  const setNewTeamContents = (newTeamImport: string) => {
    setState(oldVals => ({...oldVals, newTeamImport: {value: newTeamImport, touched: true}}));
  }

  const handleTeamAddClickExpand = () => {
    setState(oldVals => ({...oldVals, teamAddClicked: !state?.teamAddClicked}));
  };

  const handleCurrentTeamClicked = (name: string, team_id: string) => {
    setState(oldVals => ({...oldVals, currentClickedTeam: {value: name, id: team_id, touched: true}}));
  };

  // User Sets-Teams

  const setNewSetContents = (newSetImport: string) => {
    setState(oldVals => ({...oldVals, newSetImport: {value: newSetImport, touched: true}}));
  }

  // search 

  const setSearch = (searchval: string) => {
    setState(oldVals => ({...oldVals, search: {value: searchval, touched: true}}));
  }

  const setSort = (sortval: string) => {
    setState(oldVals => ({...oldVals, sort: {value: sortval, touched: true}}));
  }

  const setFilter = (filter: string) => {
    setState(oldVals => ({...oldVals, filter: {value: filter, touched: true}}));
  }

  const setFilterSort = (filtersort: string) => {
    setState(oldVals => ({...oldVals, filtersort: {value: filtersort, touched: true}}));
  }

  const handlePageUp = () => {
    setState(oldVals => ({...oldVals, page: {value: (state?.page?.value! + 1)}}));

    const search = state?.search?.value || 'all';
    const sort = state?.sort?.value || 'newest';
    const page = state?.page?.value! + 1;
    const query = `?page=${page}&sort=${sort}&species=${search.toLowerCase()}`
    apiService.getTenTeamsSearch(query)
      .then(teams => {
        setState(oldVals => ({...oldVals, publicTeams: teams}));
        setState(oldVals => ({...oldVals, publicSets: []})); // lets clear the publicSets because we are reseeding them! with our search
        teams.forEach((team: any) => { // now we need to get the sets for those 10 teams and put them in state.
          apiService.getSetsForOneTeam(team.id)
            .then(sets => {
              setState(oldVals => ({...oldVals, publicSets: [...state?.publicSets, ...sets]}));
            });
        });
      });
  }

  const handlePageDown = () => {
    if(state?.page?.value! > 1){
      setState(oldVals => ({...oldVals, page: {value: (state?.page?.value! - 1)}}));
    
    const search = state?.search?.value || 'all';
    const sort = state?.sort?.value || 'newest';
    const page = state?.page?.value! - 1;
    const query = `?page=${page}&sort=${sort}&species=${search.toLowerCase()}`
    apiService.getTenTeamsSearch(query)
      .then(teams => {
        setState(oldVals => ({...oldVals, publicTeams: teams}));
        setState(oldVals => ({...oldVals, publicSets: []})); // lets clear the publicSets because we are reseeding them! with our search
        teams.forEach((team: any) => { // now we need to get the sets for those 10 teams and put them in state.
          apiService.getSetsForOneTeam(team.id)
            .then(sets => {
              setState(oldVals => ({...oldVals, publicSets: [...state?.publicSets, ...sets]}));
            });
        });
      });
    }
  }

  // these two functions help clear when logins are made so that the user doesn't see other user data.

  const clearUserState = () => {
    setState(oldVals => ({...oldVals, userFolders: [], userTeams: [], userSets: []}));
  }

  const clearPublicSets = () => {
    setState(oldVals => ({...oldVals, publicSets: []}));
  }

  const getUserState = () => {
    if (TokenService.getAuthToken()){ // if user is logged in
      const user_id = jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id

      apiService.getUserFolders(user_id) // Get Public Teams First
      .then(data => {
        setState(oldVals => ({...oldVals, userFolders: data}));
      });

      apiService.getUserTeams(user_id) // Get Public Teams First
      .then(data => {
        setState(oldVals => ({...oldVals, userTeams: data}));
      });

      apiService.getUserSets(user_id) // Get Public Teams First
      .then(data => {
        setState(oldVals => ({...oldVals, userSets: data}));
      });
    };
  }

  const addPublicSets = (sets: any) => {
    // we no longer have to make this a Set object because we do that check in 
    // the Team-Public.js.  Should also add that wizardry to the Team-Edit version.
    setState(oldVals => ({...oldVals, publicSets: [...state?.publicSets, ...sets]}));
  }

  // Validate State Functions

  // User Folders

  const validateNewFolderName = (): any => {
    let folder_name = state?.newFolderName?.value;
    if (!folder_name) {
      return `Please provide a folder name!`
    }
  };

  const validateCurrentFolderClicked = (): any => {
    let folder = state?.currentClickedFolder?.id;
    if (!folder) {
      return `You'll need to click on a folder in order to add a team!`
    }
  };

  // User Teams

  const validateNewTeamName = (): any => {
    let team_name = state?.newTeamName?.value;
    if (!team_name) {
      return `Please provide a team name!`
    }
  };

  const validateDesc = (): any => {
    let description = state?.desc?.value;
    if (typeof(description) !== 'string') {
      return `This should never come up, it is superflous`
    }
  };

  const validateNewTeamImport = () => {
    let flag;
    let team_import = state?.newTeamImport?.value;
    // you do not have to provide a team_import, but if you do...
    // showdownParse(team_export) gives an array...
    if(team_import){
    showdownParse(team_import).forEach((set: any )=> {
      if (!legality.isLegalSpecies(set.species)) {
        flag = `There is an illegal species in your set.  Please fix this to be in the proper format! 
        (Hint: It could be extra white space at the end because of Showdown's Exporter)
        (Hint: There could be a typo in your species name!)`
      }
    })
  }
    return flag;
  };

  const validateNewSetImport = () => {
    let flag;
    let set_import = state?.newSetImport?.value
    // you do not have to provide a set_import, but if you do...
    // showdownParse(set_export) gives an array...even just for 1
    // with that in mind, let's check that it's only length of 1

    if (showdownParse(set_import).length > 1) {
      flag = `You can only import 1 set here.`
    }
    showdownParse(set_import).forEach((set: any)=> {
      if (!legality.isLegalSpecies(set.species)) {
        flag = `There is an illegal species in your set.  Please fix this to be in the proper format! 
        (Hint: It could be extra white space at the end because of Showdown's Exporter)
        (Hint: There could be a typo in your species name!)`
      }
    })
    return flag;
  };

  // search

  const validateSearch = (): any => {
    let search = state?.search?.value;
    search = search?.toString().trim();
    if(!legality.isLegalSpecies(search)){
      return `Must be an 'existing' Pokemon species or form styled via '[species]-[form]'!`
    }
  }

  const validateFilter = (): any => {
    let filter = state?.filter?.value;
    filter = filter?.toString().trim();
    if(!legality.isLegalSpecies(filter)){
      return `Must be an 'existing' Pokemon species or form styled via '[species]-[form]'!`
    }
  }

  
  // Event Handlers/API Calls

  const handlePostNewFolder = () => {
    const folder_name = state?.newFolderName?.value;
    apiService.postUserFolder(folder_name || '', jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id)
      .then((folder) => setState(oldVals => ({...oldVals, userFolders: [...state?.userFolders, folder], folderAddClicked: false})));
  }

  const handlePostNewPokemon = (
    team_id: number,
    nickname: string,
    species: string = 'Pikachu',
    gender: string,
    item: string,
    ability: string,
    level: number = 100,
    shiny: boolean = false,
    happiness: number = 255,
    nature: string = 'Adamant',
    hp_ev: number = 0,
    atk_ev: number = 0,
    def_ev: number = 0,
    spa_ev: number = 0,
    spd_ev: number = 0,
    spe_ev: number = 0,
    hp_iv: number = 31,
    atk_iv: number = 31,
    def_iv: number = 31,
    spa_iv: number = 31,
    spd_iv: number = 31,
    spe_iv: number = 31,
    move_one: string = 'Tackle',
    move_two: string,
    move_three: string,
    move_four: string,
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
    }

    apiService.postUserSet(set_body, jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id)
      .then((set) => setState(oldVals => ({...oldVals, userSets: [...state?.userSets, set]})));
  }

  const handlePostNewTeam = () => {
    const team_name = state?.newTeamName?.value;
    const desc = state?.desc?.value;
    const currentClickedFolder = state?.currentClickedFolder?.id
    const contents = state?.newTeamImport?.value;
    const body = {team_name, description: desc, folder_id: currentClickedFolder};

    // first, handle the new team

    apiService.postUserTeam(body, jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id)
      .then((team) => {
        // first we set the team, and due to a bug, we also need to add a few more fields to get it to temporarily show correctly.
        setState(oldVals => ({...oldVals, userTeams: [...state?.userTeams, {...team, folder_name: state?.currentClickedFolder?.value, user_id: jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id, user_name: jwtDecode<MyToken>(TokenService.getAuthToken() || '').sub}]}))
        // then we check if there were contents in the import team set
        if (contents){
          const parsed = showdownParse(contents);
    
          parsed.forEach((set: any) => {

            handlePostNewPokemon( 
              team.id,
              set.nickname,
              set.species,
              set.gender,
              set.item,
              set.ability,
              set.level,
              set.shiny,
              set.happiness,
              set.nature,
              set.hp_ev,
              set.atk_ev,
              set.def_ev,
              set.spa_ev,
              set.spd_ev,
              set.spe_ev,
              set.hp_iv,
              set.atk_iv,
              set.def_iv,
              set.spa_iv,
              set.spd_iv,
              set.spe_iv,
              set.move_one,
              set.move_two,
              set.move_three,
              set.move_four,
              );
          });
        };
      });
      // then we close the expanded view
      setState(oldVals => ({
        ...oldVals,
        teamAddClicked: !state?.teamAddClicked,
        newTeamName: {value: '', touched: false},
        desc: {value: '', touched: false},
        newTeamImport: {value: '', touched: false}
      }));
  };

  // PATCH/UPDATE

  const handleEditFolder = () => {
    const folder_name = state?.newFolderName?.value;
    const id = state?.currentClickedFolder?.id;
    const userId = jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id
    apiService.patchUserFolder(folder_name || '', Number(id), userId)
    
    const folder = {folder_name: folder_name};
    
    setState(oldVals => ({
      ...oldVals,
      userFolders: state?.userFolders?.map(fldr => {
        return (fldr.id !== id) ? fldr : {...fldr, ...folder}})
    }));
   
  };

  const handleUpdateTeam = (teamname: string, desc: string, id: any) => {
    const body = {id: id, team_name: teamname, description: desc}
    const userId = jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id
    apiService.patchUserTeam(body, userId)

    const team = {team_name: teamname, description: desc}

    setState(oldVals => ({
      ...oldVals,
      userTeams: state?.userTeams?.map(tm => {
        return (tm.id !== id) ? tm : {...tm, ...team} })
    }));
  };

  const handleUpdateSet= (
    id: number,
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
    move_four: string,
  ) => {
    const body = {
      id,
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
    }

    const userId = jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id
    apiService.patchUserSet(body, userId)

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
    }
    setState(oldVals => ({
      ...oldVals,
      userSets: state?.userSets?.map(s => {
        return (s.id !== id) ? s : {...s, ...set} })
    }));
  }

  const handleUpdateSetImport = (id: string) => {
    const contents = state?.newSetImport?.value;
    const parsed = showdownParse(contents)[0];
    const userId = jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id

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
    }
    apiService.patchUserSet(body, userId)

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

    setState(oldVals => ({
      ...oldVals,
      userSets: state?.userSets?.map(s => {
        return (s.id !== id) ? s : {...s, ...set}}),
      newSetImport: {value: '', touched: false}
    }));
  }

  // DELETE

  const handleDeleteFolder = () => {
    const folder_id = Number(state?.currentClickedFolder?.id);
    apiService.deleteUserFolder(folder_id)
   
    const newFolders = state?.userFolders?.filter(folder => Number(folder.id) !== Number(folder_id))
    setState(oldVals => ({...oldVals, userFolders: newFolders, currentClickedFolder: {value: '', id: '', touched: false}}));
   
  };

  const handleDeleteTeam = (team_id: number) => {
    apiService.deleteUserTeam(team_id)
   
    const newUserTeams = state?.userTeams?.filter(team => Number(team.id) !== Number(team_id))
    const newPublicTeams = state?.publicTeams?.filter(team => Number(team.id) !== Number(team_id))
    setState(oldVals => ({...oldVals, publicTeams: newPublicTeams, userTeams: newUserTeams, currentClickedTeam: {value: '', id: '', touched: false}}));
  };

  const handleDeleteSet = (team_id: number, set_id: number) => { 
    apiService.deleteUserSet(team_id, set_id)
   
    const newUserSets = state?.userSets?.filter(set => Number(set.id) !== Number(set_id))
    const newPublicSets = state?.publicSets?.filter(set => Number(set.id) !== Number(set_id))
    setState(oldVals => ({...oldVals, publicSets: newPublicSets, userSets: newUserSets}));
  }

  // SEARCH STUFF

  const handleSearch = (e: any) => {
    e.preventDefault()
    const search = state?.search?.value || 'all';
    const sort = state?.sort?.value || 'newest';
    const page = state?.page?.value;
    const query = `?page=${page}&sort=${sort}&species=${search.toLowerCase()}`
    apiService.getTenTeamsSearch(query)
      .then(teams => {
        setState(oldVals => ({...oldVals, publicTeams: teams}))
        setState(oldVals => ({...oldVals, publicSets: []})) // lets clear the publicSets because we are reseeding them! with our search
        teams.forEach((team: any) => { // now we need to get the sets for those 10 teams and put them in state.
          apiService.getSetsForOneTeam(team.id)
            .then(sets => {
              setState(oldVals => ({...oldVals, publicSets: [...state?.publicSets, ...sets]}))
            });
        });
      });
  };

  const handleFilter = () => {
    const filter = state?.filter?.value || 'all';
    const filtersort = state?.filtersort?.value || 'newest';
    // lets do an api call for this, JUST because we fucking can, plus linking data back up is impossible with my current knowledge
    const query = `?sort=${filtersort}&species=${filter.toLowerCase()}`
    if (TokenService.getAuthToken()){ // if user is logged in
      const user_id = jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id
      apiService.getUserFoldersFilter(user_id, query)
      .then(data => {
        setState(oldVals => ({...oldVals, userFolders: data}))
      });
    apiService.getUserTeamsFilter(user_id, query)
      .then(data => {
        setState(oldVals => ({...oldVals, userTeams: data}))
      });
    // we did have an api call, but we actually want all the sets for a team,
    // so we keep the previous ones.  I think that works.  On the plus side, I
    // now have the capability of searching for single sets by species.
    }
  }

    const value: any = {
      // main database
        // userdata
        userFolders: state?.userFolders,
        userTeams: state?.userTeams,
        userSets: state?.userSets,
        //public data
        publicTeams: state?.publicTeams,
        publicSets: state?.publicSets,
        //set states
        // folder set state
        folderAddClicked: state?.folderAddClicked,
        currentClickedFolder: state?.currentClickedFolder,
        newFolderName: state?.newFolderName,
        // team set state
        teamAddClicked: state?.teamAddClicked,
        currentClickedTeam: state?.currentClickedTeam,
        newTeamName: state?.newTeamName,
        desc: state?.desc,
        newTeamImport: state?.newTeamImport,
        teamExpandToggle: state?.teamExpandToggle, // adding this to Provider in case it's actually used
        // set Set state
        setExpandToggle: state?.setExpandToggle, // adding this to Provider in case it's actually used
        newSetImport: state?.newSetImport,
        // set search
        search: state?.search,
        sort: state?.sort,
        filter: state?.filter,
        filtersort: state?.filtersort,
        page: state?.page,
        // functions
        // user folder functions
        setNewFolderName: setNewFolderName,
        handleFolderAddClickExpand: handleFolderAddClickExpand,
        handlePostNewFolder: handlePostNewFolder,
        validateNewFolderName: validateNewFolderName,
        validateCurrentFolderClicked: validateCurrentFolderClicked,
        handleCurrentFolderClicked: handleCurrentFolderClicked,
        handleEditFolder: handleEditFolder,
        handleDeleteFolder: handleDeleteFolder,
        // user team functions
        setNewTeamName: setNewTeamName,
        setNewTeamContents: setNewTeamContents,
        handleTeamAddClickExpand: handleTeamAddClickExpand,
        handlePostNewTeam: handlePostNewTeam,
        validateNewTeamName: validateNewTeamName,
        validateNewTeamImport: validateNewTeamImport,
        handleCurrentTeamClicked: handleCurrentTeamClicked,
        handleUpdateTeam: handleUpdateTeam,
        handleDeleteTeam: handleDeleteTeam,
        // user set functions
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
        // search functions
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
        // share functions
        addPublicSets: addPublicSets,
        clearPublicSets: clearPublicSets 
    }

    return (
      <GeneralContext.Provider value = {value}>
        {props.children}
      </GeneralContext.Provider>
    )
  }
