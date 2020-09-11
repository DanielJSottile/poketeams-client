import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LandingPage.css';

const LandingPage = (props: any): JSX.Element => {
  const handleLoginSucess = (): void => {
    const { location, history } = props;
    const destination = (location.state || {}).from || '/';
    history.push(destination);
  };

  return (
    // make this JSX into a component!
    <Fragment>
      <header role="banner">
        <div className="landing-title"></div>
        <h2>store. organize. edit. share.</h2>
      </header>
      <section>
        <header>
          <h3 className="hook">Gotta Store 'em All!</h3>
        </header>
        <div className="login-div">
          <LoginForm onLoginSuccess={handleLoginSucess} />
          <p>Not A Member? </p>
          <Link className="register-entry" to="/register">
            Register Here:
          </Link>
          <h2 className="landing-sub-subheader">Or...</h2>
          <Link className="public-entry" to="/">
            Find Teams Here!
          </Link>
        </div>
      </section>
      <section>
        <header>
          <h3>Store your teams like never before!</h3>
        </header>
        <img
          className="landingimg"
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
        <img
          className="landingimg"
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
        <img
          className="landingimg"
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
        <img
          className="landingimg"
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
