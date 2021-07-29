import React, { FunctionComponent } from 'react';
import Navigation from '../../components/Navigation';
import TeamList from '../../components/TeamList';
import Footer from '../../components/Footer/Footer';
import styles from './HomePage.module.scss';

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
