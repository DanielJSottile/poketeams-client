import React, { Fragment, lazy } from 'react';
import './BuildPage.scss';

// Code Splitting

const NavigationBuild = lazy(
  () => import('../../components/Navigation-Build/Navigation-Build')
);
const AddTeamSection = lazy(
  () => import('../../components/AddTeamSection/AddTeamSection')
);
const TeamListEdit = lazy(
  () => import('../../components/TeamList-Edit/TeamList-Edit')
);
const FolderList = lazy(
  () => import('../../components/FoldersList/FoldersList')
);
const Footer = lazy(() => import('../../components/Footer/Footer'));

// Component

const BuildPage = (props: any): JSX.Element => {
  // Final Render

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
