import React, { Component, Fragment } from 'react';
import Navigation from '../../components/Naviagation/Navigation';
import TeamsButtonList from '../../components/TeamsButtonList/TeamsButtonList';
import TeamList from '../../components/TeamList/TeamList';
import Footer from '../../components/Footer/Footer';

export default class BuildPage extends Component {
  render() {
    return (
      <Fragment>
        <Navigation
        title={"PokeTeam - Build!"}/>
        <main>
          <header role="banner">
            <h1>Results:</h1>
          </header>
          <TeamsButtonList/>
          <TeamList/>
          <Footer/>
        </main>
      </Fragment>
    );
  };
};
