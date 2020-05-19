import React, { Component, Fragment } from 'react';
import Navigation from '../../components/Naviagation/Navigation';
import TeamsButtonListEdit from '../../components/TeamsButtonList-Edit/TeamsButtonList-Edit';
import TeamListEdit from '../../components/TeamList-Edit/TeamList-Edit';
import FolderList from '../../components/FoldersList/FoldersList';
import Footer from '../../components/Footer/Footer';
import jwtDecode from 'jwt-decode';
import TokenService from '../../services/token-service';

export default class BuildPage extends Component {

  // set context here

  componentDidMount(){
    const user_id = jwtDecode(TokenService.getAuthToken()).id
    // do our api calls with that id
      //this.context.populateUserFolders() -> this is in our app
  }

  render() {
    return (
      <Fragment>
        <Navigation
        title={"PokeTeam - Build!"}/>
        <main>
          <header role="banner">
            <FolderList/>
          </header>
          <TeamsButtonListEdit/>
          <TeamListEdit/>
          <Footer/>
        </main>
      </Fragment>
    );
  };
};
