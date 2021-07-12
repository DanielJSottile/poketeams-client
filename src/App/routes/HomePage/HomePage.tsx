import React, { Fragment, FunctionComponent } from 'react';
import NavigationPublic from '../../components/Navigation-Public/Navigation-Public';
import TeamListPublic from '../../components/TeamList-Public/TeamList-Public';
import Footer from '../../components/Footer/Footer';

const HomePage: FunctionComponent = (): JSX.Element => {
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
