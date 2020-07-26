import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from '@testing-library/react';
import Team from './Team-Public';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import UserContext from '../../contexts/UserContext';
import App from '../App/App';

describe('<TeamPublic/>', () => {
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
        <Team team={
          {
            id: 1,
            team_name: "Test",
            description: "Test",
            date_created: "Thu May 21 2020 14:11:23 GMT-0400 (Eastern Daylight Time)",
            date_modified: "",
            user_id: 1,
            user_name: "test",
            folder_id: 1,
            folder_name: "test"
          }
        }/>
      </UserContext.Provider>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});