import React, { Fragment, FunctionComponent } from 'react';
import NavigationBuild from '../../components/Navigation-Build/Navigation-Build';
import AddTeamSection from '../../components/AddTeamSection/AddTeamSection';
import TeamListEdit from '../../components/TeamList-Edit/TeamList-Edit';
import FolderList from '../../components/FoldersList/FoldersList';
import Footer from '../../components/Footer/Footer';

const BuildPage: FunctionComponent = (): JSX.Element => {
  return (
    <Fragment>
      <NavigationBuild />
      <main>
        <header role="banner">
          <FolderList />
        </header>
        <AddTeamSection />
        <TeamListEdit />
        <Footer />
      </main>
    </Fragment>
  );
};

export default BuildPage;
