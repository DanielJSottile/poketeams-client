import React, { Component, Fragment } from 'react';
import {Route, Switch} from 'react-router-dom';
import BuildPage from '../../routes/BuildPage/BuildPage';
import HomePage from '../../routes/HomePage/HomePage';
import LandingPage from '../../routes/LandingPage/LandingPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import ShareSetPage from '../../routes/ShareSetPage/ShareSetPage';
import ShareTeamPage from '../../routes/ShareTeamPage/ShareTeamPage';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import apiService from '../../services/apiService';
import jwtDecode from 'jwt-decode';
import showdownParse from '../../functions/parse';
import legality from '../../functions/legality';

export default class App extends Component {
  state = {  // temporary store until we work with api calls
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
    page: {value: 1, touched: false}
  }; 

  componentDidMount() {

    if (TokenService.getAuthToken()){ // if user is logged in
      const user_id = jwtDecode(TokenService.getAuthToken()).user_id

      apiService.getUserFolders(user_id) // Get Public Teams First
      .then(data => {
        this.setState({userFolders: data})
      })

      apiService.getUserTeams(user_id) // Get Public Teams First
      .then(data => {
        this.setState({userTeams: data})
        
      })

      apiService.getUserSets(user_id) // Get Public Teams First
      .then(data => {
        this.setState({userSets: data})
      })
    };
  
    // Then get the public teams

    apiService.getTenTeamsDefault() // Get Public Teams First
      .then(teams => {
        this.setState({publicTeams: teams})
        teams.forEach(team => { // now we need to get the sets for those 10 teams and put them in state.
          apiService.getSetsForOneTeam(team.id)
            .then(sets => {
              this.setState({publicSets: [...this.state.publicSets, ...sets]})
            })
        })
      })

        // some way to add likes to the public teams???
  }

  // State Input Update Functions 

  // User Folders

  setNewFolderName = newFolderName => {
    this.setState({newFolderName: {value: newFolderName, touched: true}});
  };

  handleFolderAddClickExpand = () => {
    this.setState({folderAddClicked: !this.state.folderAddClicked})
  };

  handleCurrentFolderClicked = (name, folder_id) => {
    this.setState({currentClickedFolder: {value: name, id: folder_id, touched: true}})
  };

  // User Teams

  setNewTeamName = newTeamName => {
    this.setState({newTeamName: {value: newTeamName, touched: true}});
  };

  setDesc = desc => {
    this.setState({desc: {value: desc, touched: true}});
  };

  setNewTeamContents = newTeamImport => {
    this.setState({newTeamImport: {value: newTeamImport, touched: true}});
  }

  handleTeamAddClickExpand = () => {
    this.setState({teamAddClicked: !this.state.teamAddClicked})
  };

  handleCurrentTeamClicked = (name, team_id) => {
    this.setState({currentClickedTeam: {value: name, id: team_id, touched: true}})
  };

  // User Sets-Teams

  setNewSetContents = newSetImport => {
    this.setState({newSetImport: {value: newSetImport, touched: true}});
  }

  // search 

  setSearch = searchval => {
    this.setState({search: {value: searchval, touched: true}});
  }

  setSort = sortval => {
    this.setState({sort: {value: sortval, touched: true}});
  }

  setFilter = filter => {
    this.setState({filter: {value: filter, touched: true}})
  }

  setFilterSort = filtersort => {
    this.setState({filtersort: {value: filtersort, touched: true}})
  }
  
  // Validate State Functions

  // User Folders

  validateNewFolderName = () => {
    let folder_name = this.state.newFolderName.value;
    if (!folder_name) {
      return `Please provide a folder name!`
    }
  };

  validateCurrentFolderClicked = () => {
    let folder = this.state.currentClickedFolder.id;
    if (!folder) {
      return `You'll need to click on a folder in order to add a team!`
    }
  };

  // User Teams

  validateNewTeamName = () => {
    let team_name = this.state.newTeamName.value;
    if (!team_name) {
      return `Please provide a team name!`
    }
  };

  validateDesc = () => {
    let description = this.state.desc.value;
    if (typeof(description) !== 'string') {
      return `This should never come up, it is superflous`
    }
  };

  validateNewTeamImport = () => {
    let flag;
    let team_import = this.state.newTeamImport.value;
    // you do not have to provide a team_import, but if you do...
    // showdownParse(team_export) gives an array...

    // ** WE SHOULD ALSO ADD A LEGALITY FUNCTION THAT CHECKS IF THERES IS AT LEAST 1 MOVE! ** (if we have time)
    if(team_import){
    showdownParse(team_import).forEach(set => {
      if (!legality.isLegalSpecies(set.species)) {
        flag = `There is an illegal species in your set.  Please fix this to be in the proper format! 
        (Hint: It could be extra white space at the end because of Showdown's Exporter)
        (Hint: There could be a typo in your species name!)`
      }
    })
  }
    return flag;
  };

  validateNewSetImport = () => {
    let flag;
    let set_import = this.state.newSetImport.value
    // you do not have to provide a set_import, but if you do...
    // showdownParse(set_export) gives an array...even just for 1
    // with that in mind, let's check that it's only length of 1

    if (showdownParse(set_import).length > 1) {
      flag = `You can only import 1 set here.`
    }
    // ** WE SHOULD ALSO ADD A LEGALITY FUNCTION THAT CHECKS IF THERES IS AT LEAST 1 MOVE! ** (if we have time)

    showdownParse(set_import).forEach(set => {
      if (!legality.isLegalSpecies(set.species)) {
        flag = `There is an illegal species in your set.  Please fix this to be in the proper format! 
        (Hint: It could be extra white space at the end because of Showdown's Exporter)
        (Hint: There could be a typo in your species name!)`
      }
    })
    return flag;
  };

  // search

  validateSearch = () => {
    let search = this.state.search.value;
    search = search.toString().trim();
    if(!legality.isLegalSpecies(search)){
      return `Must be an 'existing' Pokemon species or form styled via '[species]-[form]'!`
    }
  }

  validateFilter = () => {
    let filter = this.state.filter.value;
    filter = filter.toString().trim();
    if(!legality.isLegalSpecies(filter)){
      return `Must be an 'existing' Pokemon species or form styled via '[species]-[form]'!`
    }
  }
  // Event Handlers/API Calls -> NOT MADE YET!

  handlePostNewFolder = () => {
    const folder_name = this.state.newFolderName.value;
    apiService.postUserFolder(folder_name, jwtDecode(TokenService.getAuthToken()).user_id)
      .then((folder) => this.setState({userFolders: [...this.state.userFolders, folder]}));
  }

  handlePostNewPokemon = ( // will use this function for team post as well
    team_id,
    nickname,
    species = 'Pikachu',
    gender,
    item,
    ability,
    level = 100,
    shiny = false,
    happiness = 255,
    nature = 'Adamant',
    hp_ev = 0,
    atk_ev = 0,
    def_ev = 0,
    spa_ev = 0,
    spd_ev = 0,
    spe_ev = 0,
    hp_iv = 31,
    atk_iv = 31,
    def_iv = 31,
    spa_iv = 31,
    spd_iv = 31,
    spe_iv = 31,
    move_one = 'Tackle',
    move_two,
    move_three,
    move_four,
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

    apiService.postUserSet(set_body, jwtDecode(TokenService.getAuthToken()).user_id)
      .then((set) => this.setState({userSets: [...this.state.userSets, set]}));
  }

  handlePostNewTeam = () => {
    const team_name = this.state.newTeamName.value;
    const desc = this.state.desc.value;
    const currentClickedFolder = this.state.currentClickedFolder.id
    const contents = this.state.newTeamImport.value;
    const body = {team_name, description: desc, folder_id: currentClickedFolder};

    // first, handle the new team

    apiService.postUserTeam(body, jwtDecode(TokenService.getAuthToken()).user_id)
      .then((team) => {
        // first we set the team
        this.setState({userTeams: [...this.state.userTeams, team]})
        // then we check if there were contents in the import team set
        if (contents){
          const parsed = showdownParse(contents);
    
          parsed.forEach(set => {

            this.handlePostNewPokemon( 
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
  };

  // PATCH/UPDATE

  handleEditFolder = () => {
    const folder_name = this.state.newFolderName.value;
    const id = this.state.currentClickedFolder.id;
    const userId = jwtDecode(TokenService.getAuthToken()).user_id
    apiService.patchUserFolder(folder_name, id, userId)
    
    const folder = {folder_name: folder_name};
    
    this.setState({
      userFolders: this.state.userFolders.map(fldr => {
        return (fldr.id !== id) ? fldr : {...fldr, ...folder}})
    });
   
  };

  handleUpdateTeam = (teamname, desc, id) => {
    const body = {id: id, team_name: teamname, description: desc}
    const userId = jwtDecode(TokenService.getAuthToken()).user_id
    apiService.patchUserTeam(body, userId)

    const team = {team_name: teamname, description: desc}

    this.setState({
      userTeams: this.state.userTeams.map(tm => {
        return (tm.id !== id) ? tm : {...tm, ...team} })
    });
  };

  handleUpdateSet= (
    id,
    nickname,
    species,
    gender,
    shiny,
    item,
    ability,
    level,
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
    }

    const userId = jwtDecode(TokenService.getAuthToken()).user_id
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
    this.setState({
      userSets: this.state.userSets.map(s => {
        return (s.id !== id) ? s : {...s, ...set} })
    });
  }

  handleUpdateSetImport = (id) => {
    const contents = this.state.newSetImport.value;
    const parsed = showdownParse(contents)[0];
    const userId = jwtDecode(TokenService.getAuthToken()).user_id

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

    this.setState({
      userSets: this.state.userSets.map(s => {
        return (s.id !== id) ? s : {...s, ...set} })
    });
  }

  // DELETE

  handleDeleteFolder = () => {
    const folder_id = Number(this.state.currentClickedFolder.id);
    apiService.deleteUserFolder(folder_id)
   
    const newFolders = this.state.userFolders.filter(folder => Number(folder.id) !== Number(folder_id))
    this.setState({userFolders: newFolders});
   
  };

  handleDeleteTeam = (team_id) => {
    apiService.deleteUserTeam(Number(team_id))
   
    const newUserTeams = this.state.userTeams.filter(team => Number(team.id) !== Number(team_id))
    const newPublicTeams = this.state.publicTeams.filter(team => Number(team.id) !== Number(team_id))
    this.setState({publicTeams: newPublicTeams, userTeams: newUserTeams});
  };

  handleDeleteSet = (team_id, set_id) => { // deleteSet not made yet
    apiService.deleteUserSet(Number(team_id), Number(set_id))
   
    const newUserSets = this.state.userSets.filter(set => Number(set.id) !== Number(set_id))
    const newPublicSets = this.state.publicSets.filter(set => Number(set.id) !== Number(set_id))
    this.setState({publicSets: newPublicSets, userSets: newUserSets});
  }

  // SEARCH STUFF

  handleSearch = () => {
    const search = this.state.search.value;
    const sort = this.state.sort.value;
    const page = this.state.page.value;
    const query = `?page=${page}&sort=${sort}&species=${search.toLowerCase()}`
    apiService.getTenTeamsSearch(query)
      .then(teams => {
        this.setState({publicTeams: teams})
        this.setState({publicSets: []}) // lets clear the publicSets because we are reseeding them! with our search
        teams.forEach(team => { // now we need to get the sets for those 10 teams and put them in state.
          apiService.getSetsForOneTeam(team.id)
            .then(sets => {
              this.setState({publicSets: [...this.state.publicSets, ...sets]})
            })
        })
      })
  }

  handleFilter = () => {
    const filter = this.state.filter.value;
    const filtersort = this.state.filtersort.value;
    // lets do an api call for this, JUST because we fucking can, plus linking data back up is impossible with my current knowledge
    const query = `?sort=${filtersort}&species=${filter.toLowerCase()}`
    if (TokenService.getAuthToken()){ // if user is logged in
      const user_id = jwtDecode(TokenService.getAuthToken()).user_id
      apiService.getUserFoldersFilter(user_id, query)
      .then(data => {
        this.setState({userFolders: data})
      });
    apiService.getUserTeamsFilter(user_id, query)
      .then(data => {
        this.setState({userTeams: data})
      });
    // we did have an api call, but we actually want all the sets for a team,
    // so we keep the previous ones.  I think that works.  On the plus side, I
    // now have the capability of searching for single sets by species.
    }
  }

  // RENDER
  
  render() {
    return (
      <UserContext.Provider value = {{
        // main database
        // userdata
        userFolders: this.state.userFolders,
        userTeams: this.state.userTeams,
        userSets: this.state.userSets,
        //public data
        publicTeams: this.state.publicTeams,
        publicSets: this.state.publicSets,
        //set states
        // folder set state
        folderAddClicked: this.state.folderAddClicked,
        currentClickedFolder: this.state.currentClickedFolder,
        newFolderName: this.state.newFolderName,
        // team set state
        teamAddClicked: this.state.teamAddClicked,
        currentClickedTeam: this.state.currentClickedTeam,
        newTeamName: this.state.newTeamName,
        desc: this.state.desc,
        newTeamImport: this.state.newTeamImport,
        teamExpandToggle: this.state.teamExpandToggle,
        // set Set state
        setExpandToggle: this.state.setExpandToggle,
        newSetImport: this.state.newSetImport,
        // set search
        search: this.state.search,
        sort: this.state.sort,
        filter: this.state.filter,
        filtersort: this.state.filtersort,
        // functions
        // user folder functions
        setNewFolderName: this.setNewFolderName,
        handleFolderAddClickExpand: this.handleFolderAddClickExpand,
        handlePostNewFolder: this.handlePostNewFolder,
        validateNewFolderName: this.validateNewFolderName,
        validateCurrentFolderClicked: this.validateCurrentFolderClicked,
        handleCurrentFolderClicked: this.handleCurrentFolderClicked,
        handleEditFolder: this.handleEditFolder,
        handleDeleteFolder: this.handleDeleteFolder,
        // user team functions
        setNewTeamName: this.setNewTeamName,
        setNewTeamContents: this.setNewTeamContents,
        handleTeamAddClickExpand: this.handleTeamAddClickExpand,
        handlePostNewTeam: this.handlePostNewTeam,
        validateNewTeamName: this.validateNewTeamName,
        validateNewTeamImport: this.validateNewTeamImport,
        handleCurrentTeamClicked: this.handleCurrentTeamClicked,
        handleUpdateTeam: this.handleUpdateTeam,
        handleDeleteTeam: this.handleDeleteTeam,
        // user set functions
        handleDeleteSet: this.handleDeleteSet,
        handleUpdateSet: this.handleUpdateSet,
        setNewSetContents: this.setNewSetContents,
        setDesc: this.setDesc,
        validateDesc: this.validateDesc,
        validateNewSetImport: this.validateNewSetImport,
        handleUpdateSetImport: this.handleUpdateSetImport,
        handlePostNewPokemon: this.handlePostNewPokemon,
        // search functions
        setSearch: this.setSearch,
        setSort: this.setSort,
        validateSearch: this.validateSearch,
        handleSearch: this.handleSearch,
        setFilter: this.setFilter,
        setFilterSort: this.setFilterSort,
        validateFilter: this.validateFilter,
        handleFilter: this.handleFilter
        
      }}>
        <Fragment>
          <main>
            <Switch>
              <Route
                exact path = {'/'}
                component = {HomePage}/>
              <Route
                exact path = {'/share/:team_id'}
                component = {ShareTeamPage}/>
              <Route
                exact path = {'/share/:team_id/:set_id'}
                component = {ShareSetPage}/>
              <PublicOnlyRoute
                path = {'/landing'}
                component = {LandingPage}/>
              <PrivateRoute
                path={'/build'}
                component={BuildPage}/>
              <Route
                component={NotFoundPage}
              />
            </Switch>
          </main>
        </Fragment>
      </UserContext.Provider>
    );
  };
};




