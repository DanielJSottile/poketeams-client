import React, { Fragment } from 'react';
import NavigationPublic from '../../components/Navigation-Public/Navigation-Public';
import TeamsButtonListPublic from '../../components/TeamsButtonList-Public/TeamsButtonList-Public';
import TeamListPublic from '../../components/TeamList-Public/TeamList-Public';
import Footer from '../../components/Footer/Footer';

const HomePage = (props) => {

    return (
      <Fragment>
        <NavigationPublic
        title={"PokéTeams - Home"}/>
        <main>
          <header role="banner">
            <h2>Results:</h2>
          </header>
          <TeamsButtonListPublic/>
          <TeamListPublic/>
          <Footer/>
        </main>
      </Fragment>
    );
};

export default HomePage;
