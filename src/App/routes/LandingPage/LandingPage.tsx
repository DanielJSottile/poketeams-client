import React, { Fragment, FunctionComponent } from 'react';
import { StaticContext } from 'react-router';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Location, History, LocationDescriptorObject } from 'history';
import Image from '../../components/Image/Image';
import Footer from '../../components/Footer/Footer';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LandingPage.module.scss';

type RouteState = {
  location: Location;
  history: History;
  from: LocationDescriptorObject<RouteState>;
};

const LandingPage: FunctionComponent<
  RouteComponentProps<
    { [x: string]: string | undefined },
    StaticContext,
    RouteState
  >
> = ({ location, history }): JSX.Element => {
  const handleLoginSucess = (): void => {
    const destination: LocationDescriptorObject<RouteState> =
      (location.state || {}).from || '/';
    history.push(destination);
  };

  return (
    <Fragment>
      <header role="banner">
        <div className={styles['landing-title']}></div>
        <h2>store. organize. edit. share.</h2>
      </header>
      <section>
        <header>
          <h3 className={styles['hook']}>Gotta Store 'em All!</h3>
        </header>
        <div className={styles['login-div']}>
          <LoginForm onLoginSuccess={handleLoginSucess} />
          <p>Not A Member? </p>
          <Link className={styles['register-entry']} to="/register">
            Register Here:
          </Link>
          <h2 className={styles['landing-sub-subheader']}>Or...</h2>
          <Link className={styles['public-entry']} to="/">
            Find Teams Here!
          </Link>
        </div>
      </section>
      <section>
        <header>
          <h3>Store your teams like never before!</h3>
        </header>
        <Image
          imageClass={styles['landingimg']}
          src="https://imgur.com/9wYBaMQ.png"
          alt="organize page"
        />
        <p>
          PokeTeams goes above and beyond the average pastebin in order for you
          to import, save, and organize your teams from Pokemon Showdown into a
          secure database. Never lose a team again! Say goodbye to Pastebin's
          forever!
        </p>
      </section>
      <section>
        <header>
          <h3>Upload, Edit, and Maintain your teams!</h3>
        </header>
        <Image
          imageClass={styles['landingimg']}
          src="https://imgur.com/HR1yjKA.png"
          alt="edit set"
        />
        <p>
          Once you've uploaded your teams, you'll be able to edit them by hand
          or by importing individual sets! The possibilities are endless!
        </p>
      </section>
      <section>
        <header>
          <h3>Search By Numerous Parameters!</h3>
        </header>
        <Image
          imageClass={styles['landingimg']}
          src="https://imgur.com/JwMxPdp.png"
          alt="search"
        />
        <p>
          PokeTeams lets you search the database by specific Pokemon species,
          alphabetical order and date created. In the future, you'll be able to
          search for specific teams and by popularity!
        </p>
      </section>
      <section>
        <header>
          <h3>Share Your Teams and Pokemon!</h3>
        </header>
        <Image
          imageClass={styles['landingimg']}
          src="https://imgur.com/JWIgCyL.png"
          alt="export"
        />
        <p>
          Most importantly, you can share both full teams and Pokemon sets with
          anyone! Create awesome teams and Pokemon and let the world know about
          your creations!
        </p>
      </section>
      <Footer />
    </Fragment>
  );
};

export default LandingPage;
