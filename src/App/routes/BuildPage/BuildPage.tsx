import React, { FunctionComponent } from 'react';
import AddTeamSection from '../../components/AddTeamSection/AddTeamSection';
import FolderList from '../../components/FoldersList/FoldersList';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation';
import TeamList from '../../components/TeamList';

const BuildPage: FunctionComponent = (): JSX.Element => {
  return (
    <>
      <Navigation isPublic={false} />
      <main>
        <header role="banner">
          <FolderList />
        </header>
        <AddTeamSection />
        <TeamList isPublic={false} />
        <Footer />
      </main>
    </>
  );
};

export default BuildPage;
