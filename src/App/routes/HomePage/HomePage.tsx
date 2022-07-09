import React, { FunctionComponent } from 'react';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation';
import TeamList from '../../components/TeamList';

const HomePage: FunctionComponent = (): JSX.Element => {
  return (
    <div>
      <Navigation isPublic />
      <main>
        <TeamList isPublic />
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;
