import React, { FunctionComponent } from 'react';
import Navigation from '../../components/Navigation';
import TeamListPublic from '../../components/TeamList-Public/TeamList-Public';
import Footer from '../../components/Footer/Footer';

const HomePage: FunctionComponent = (): JSX.Element => {
  return (
    <>
      <Navigation isPublic />
      <main>
        <header role="banner">
          <h2>Results:</h2>
        </header>
        <TeamListPublic />
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
