import React, { FunctionComponent } from 'react';
import Navigation from '../../components/Navigation';
import AddTeamSection from '../../components/AddTeamSection/AddTeamSection';
import TeamListEdit from '../../components/TeamList-Edit/TeamList-Edit';
import FolderList from '../../components/FoldersList/FoldersList';
import Footer from '../../components/Footer/Footer';

const BuildPage: FunctionComponent = (): JSX.Element => {
  return (
    <>
      <Navigation isPublic={false} />
      <main>
        <header role="banner">
          <FolderList />
        </header>
        <AddTeamSection />
        <TeamListEdit />
        <Footer />
      </main>
    </>
  );
};

export default BuildPage;
