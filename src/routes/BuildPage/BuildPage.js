import React, { Fragment } from 'react';
import NavigationBuild from '../../components/Navigation-Build/Navigation-Build';
import TeamsButtonListEdit from '../../components/TeamsButtonList-Edit/TeamsButtonList-Edit';
import TeamListEdit from '../../components/TeamList-Edit/TeamList-Edit';
import FolderList from '../../components/FoldersList/FoldersList';
import Footer from '../../components/Footer/Footer';

const BuildPage = (props) => {

    return (
      <Fragment>
        <NavigationBuild
        title={"PokéTeams - Build!"}/>
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

export default BuildPage;
