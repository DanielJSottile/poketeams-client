import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from '@testing-library/react';
import Set from './Set-Edit';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import UserContext from '../../contexts/UserContext';
import App from '../App/App';

describe('<SetEdit/>', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <UserContext.Provider value ={{
        // main database
        // userdata
        userFolders: [],
        userTeams: [],
        userSets: [],
        //public data
        publicTeams: [],
        publicSets: [],
        //set states
        // folder set state
        folderAddClicked: '',
        currentClickedFolder: '',
        newFolderName: '',
        // team set state
        teamAddClicked: '',
        currentClickedTeam: '',
        newTeamName: '',
        desc: '',
        newTeamImport: '',
        teamExpandToggle: '',
        // set Set state
        setExpandToggle: '',
        newSetImport: '',
        // set search
        search: '',
        sort: '',
        filter: '',
        filtersort: '',
        page: '',
        // functions
        // user folder functions
        setNewFolderName: App.setNewFolderName,
        handleFolderAddClickExpand: App.handleFolderAddClickExpand,
        handlePostNewFolder: App.handlePostNewFolder,
        validateNewFolderName: App.validateNewFolderName,
        validateCurrentFolderClicked: App.validateCurrentFolderClicked,
        handleCurrentFolderClicked: App.handleCurrentFolderClicked,
        handleEditFolder: App.handleEditFolder,
        handleDeleteFolder: App.handleDeleteFolder,
        // user team functions
        setNewTeamName: App.setNewTeamName,
        setNewTeamContents: App.setNewTeamContents,
        handleTeamAddClickExpand: App.handleTeamAddClickExpand,
        handlePostNewTeam: App.handlePostNewTeam,
        validateNewTeamName: App.validateNewTeamName,
        validateNewTeamImport: App.validateNewTeamImport,
        handleCurrentTeamClicked: App.handleCurrentTeamClicked,
        handleUpdateTeam: App.handleUpdateTeam,
        handleDeleteTeam: App.handleDeleteTeam,
        // user set functions
        handleDeleteSet: App.handleDeleteSet,
        handleUpdateSet: App.handleUpdateSet,
        setNewSetContents: App.setNewSetContents,
        setDesc: App.setDesc,
        validateDesc: App.validateDesc,
        validateNewSetImport: App.validateNewSetImport,
        handleUpdateSetImport: App.handleUpdateSetImport,
        handlePostNewPokemon: App.handlePostNewPokemon,
        clearUserState: App.clearUserState,
        getUserState: App.getUserState,
        // search functions
        setSearch: App.setSearch,
        setSort: App.setSort,
        validateSearch: App.validateSearch,
        handleSearch: App.handleSearch,
        setFilter: App.setFilter,
        setFilterSort: App.setFilterSort,
        validateFilter: App.validateFilter,
        handleFilter: App.handleFilter,
        handlePageUp: App.handlePageUp,
        handlePageDown: App.handlePageDown,
        // share functions
        addPublicSets: App.addPublicSets,
        clearPublicSets: App.clearPublicSets
        
      }}>
        <Set set={{
          id: 2,
          team_name: "Darkness",
          description: "A team using Mega Darkrai",
          date_created: "Sun May 17 2020 13:55:49 GMT-0400 (Eastern Daylight Time)",
          date_modified: "",
          user_id: 1,
          user_name: "test",
          folder_id: 2,
          folder_name: "Infinite Showcase - OU",
          nickname: "",
          species: "Darkrai",
          gender: "Darkrai",
          item: "Darkraite",
          ability: "Bad Dreams",
          level: "100",
          shiny: true,
          happiness: "255",
          nature: "Timid",
          hp_ev: "",
          atk_ev: "",
          def_ev: "",
          spa_ev: "252",
          spd_ev: "4",
          spe_ev: "252",
          hp_iv: "31",
          atk_iv: "31",
          def_iv: "31",
          spa_iv: "31",
          spd_iv: "31",
          spe_iv: "31",
          move_one: "Perdition's Pyre",
          move_two: "Dark Void",
          move_three: "Nasty Plot",
          move_four: "Dark Pulse",
          team_id: 1
        }}/>
      </UserContext.Provider>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});