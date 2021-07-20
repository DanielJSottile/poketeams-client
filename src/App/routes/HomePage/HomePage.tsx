import React, { FunctionComponent } from 'react';
import Navigation from '../../components/Navigation';
import TeamList from '../../components/TeamList';
import Footer from '../../components/Footer/Footer';

const HomePage: FunctionComponent = (): JSX.Element => {
  return (
    <>
      <Navigation isPublic />
      <main>
        <header role="banner">
          <h2>Results:</h2>
        </header>
        <TeamList isPublic />
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
