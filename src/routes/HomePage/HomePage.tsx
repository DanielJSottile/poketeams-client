import React, { Fragment, lazy } from 'react';
import './HomePage.scss';

// Code Splitting

const NavigationPublic = lazy(
  () => import('../../components/Navigation-Public/Navigation-Public')
);
const TeamListPublic = lazy(
  () => import('../../components/TeamList-Public/TeamList-Public')
);
const Footer = lazy(() => import('../../components/Footer/Footer'));

// Component

const HomePage = (props: any): JSX.Element => {
  // Final Render

  return (
    <Fragment>
      <NavigationPublic />
      <main>
        <header role="banner">
          <h2>Results:</h2>
        </header>
        <TeamListPublic />
        <Footer />
      </main>
    </Fragment>
  );
};

export default HomePage;
