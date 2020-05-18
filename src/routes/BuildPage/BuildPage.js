import React, { Component, Fragment } from 'react';
import Navigation from '../../components/Naviagation/Navigation';
import TeamsButtonListEdit from '../../components/TeamsButtonList-Edit/TeamsButtonList-Edit';
import TeamListEdit from '../../components/TeamList-Edit/TeamList-Edit';
import FolderList from '../../components/FoldersList/FoldersList';
import Footer from '../../components/Footer/Footer';

export default class BuildPage extends Component {
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
