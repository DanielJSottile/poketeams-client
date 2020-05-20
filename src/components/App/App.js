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
      .then(data => {
        this.setState({publicTeams: data})
      })

        // some way to add likes to the public teams???

    apiService.getSetsforTenTeams() // hopefully get Public Sets of those 10 teams
      .then(data => {
        this.setState({publicSets: data})
      })
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

  // User Teams

  validateNewTeamName = () => {
    let team_name = this.state.newTeamName.value;
    if (!team_name) {
      return `Please provide a team name!`
    }
  };

  validateNewTeamImport = () => {
    let flag;
    let team_import = this.state.newTeamImport.value;
    // you do not have to provide a team_import, but if you do...
    // showdownParse(team_export) gives an array...

    // ** WE SHOULD ALSO ADD A LEGALITY FUNCTION THAT CHECKS IF THERES IS AT LEAST 1 MOVE! ** (if we have time)

    showdownParse(team_import).forEach(set => {
      if (!legality.isLegalSpecies(set.species)) {
        flag = `There is an illegal species in your set.  Please fix this to be in the proper format! 
        (Hint: It could be extra white space at the end because of Showdown's Exporter)`
      }
    })
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
        (Hint: It could be extra white space at the end because of Showdown's Exporter)`
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

  handlePostNewPokemon = () => {
    
  }

  handlePostNewFolder = () => {
    const folder_name = this.state.newFolderName.value;
    apiService.postUserFolder(jwtDecode(TokenService.getAuthToken()).id) // postUserFolder not made yet!
    // do the rest!
  }

  handlePostNewTeam = () => {
    const team_name = this.state.newTeamName.value;
    const contents = this.state.newTeamImport.value;
    const parsed = showdownParse(contents);
    apiService.postUserTeam(jwtDecode(TokenService.getAuthToken()).id) // postNewTeam not made yet!
    // do the rest!
  }

  handleUpdateTeam = (teamname, desc, id) => {
    const team_name = teamname;
    const description = desc;
    const team_id = Number(id)
    apiService.patchUpdateTeam() // patchTeam not made yet
  }

  handleDeleteTeam = (team_id, user_id) => { // deleteTeam not made yet

  }

  handleUpdateSet= (
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
      team_id
  ) => {
    const set_body = {

    }
    apiService.patchUpdateSet() // patchSet not made yet
  }

  handleUpdateSetImport = () => {
    const contents = this.state.newSetImport.value;
    const parsed = showdownParse(contents);
    apiService.patchUpdateSet(jwtDecode(TokenService.getAuthToken()).id) // patchSet not made yet
    // do the rest!
  }

  handleDeleteSet = (team_id, user_id) => { // deleteSet not made yet

  }

  handleSearch = () => {
    const search = this.state.search.value;
    const sort = this.state.sort.value;
    const page = this.state.page.value;
    const query = `?page=${page}&sort=${sort}&species=${search.toLowerCase()}`
    apiService.getTenTeamsSearch(query)
      .then(data => {
        this.setState({publicTeams: data})
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
        handleCurrentFolderClicked: this.handleCurrentFolderClicked,
        // user team functions
        setNewTeamName: this.setNewTeamName,
        setNewTeamContents: this.setNewTeamContents,
        handleTeamAddClickExpand: this.handleTeamAddClickExpand,
        handlePostNewTeam: this.handlePostNewTeam,
        validateNewTeamName: this.validateNewTeamName,
        validateNewTeamImport: this.validateNewTeamImport,
        handleCurrentTeamClicked: this.handleCurrentTeamClicked,
        handleTeamToggle: this.handleTeamToggle,
        handleUpdateTeam: this.handleUpdateTeam,
        handleDeleteTeam: this.handleDeleteTeam,
        // user set functions
        handleSetToggle: this.handleSetToggle,
        handleDeleteSet: this.handleDeleteSet,
        handleUpdateSet: this.handleUpdateSet,
        setNewSetContents: this.setNewSetContents,
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




