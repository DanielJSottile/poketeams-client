import React, { FunctionComponent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Image from '../../components/Image/Image';
import LoginForm from '../../components/LoginForm/LoginForm';
import AnimateOnScroll from '../../components/Utils/AnimateOnScroll';
import styles from './LandingPage.module.scss';

interface LocationState {
  from: {
    pathname: string;
  };
}

const LandingPage: FunctionComponent = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginSucess = (): void => {
    const { from } = (location.state as LocationState) || {
      from: { pathname: '/' },
    };

    navigate(from);
  };

  return (
    <>
      <header role='banner' className={styles['header']}>
        <div className={styles['landing-title']}></div>
        <h2 className={styles['header-text']}>store. organize. edit. share.</h2>
      </header>
      <section>
        <header>
          <h3 className={styles['hook']}>Gotta Store 'em All!</h3>
        </header>
        <div>
          <span>
            Please Mind the Mess! We are working on updating the site both
            internally and design wise, so things may be horribly broken for a
            while.
          </span>
          <span>
            New - 8-18-2021: Gigantamax field has been added! For specific
            Pokemon that can be Gigantamaxed, the field exists to be edited in
            the Build section.
          </span>
        </div>
        <div className={styles['login-div']}>
          <LoginForm onLoginSuccess={handleLoginSucess} />
          <div>
            <p>Not A Member? </p>
            <Link className={styles['register-entry']} to='/register'>
              Register Here:
            </Link>
          </div>
          <div>
            <p>Or...</p>
            <Link className={styles['public-entry']} to='/'>
              Find Teams Here!
            </Link>
          </div>
        </div>
      </section>

      <section>
        <AnimateOnScroll animateIn={styles['fade-in']} animateOnce={true}>
          <header>
            <h3>Store your teams like never before!</h3>
          </header>
          <Image
            imageClass={styles['landingimg']}
            src='https://imgur.com/9wYBaMQ.png'
            alt='organize page'
          />
          <p>
            PokeTeams goes above and beyond the average pastebin in order for
            you to import, save, and organize your teams from Pokemon Showdown
            into a secure database. Never lose a team again! Say goodbye to
            Pastebin's forever!
          </p>
        </AnimateOnScroll>
      </section>

      <section>
        <AnimateOnScroll animateIn={styles['fade-in']} animateOnce={true}>
          <header>
            <h3>Upload, Edit, and Maintain your teams!</h3>
          </header>
          <Image
            imageClass={styles['landingimg']}
            src='https://imgur.com/HR1yjKA.png'
            alt='edit set'
          />
          <p>
            Once you've uploaded your teams, you'll be able to edit them by hand
            or by importing individual sets! The possibilities are endless!
          </p>
        </AnimateOnScroll>
      </section>

      <section>
        <AnimateOnScroll animateIn={styles['fade-in']} animateOnce={true}>
          <header>
            <h3>Search By Numerous Parameters!</h3>
          </header>
          <Image
            imageClass={styles['landingimg']}
            src='https://imgur.com/JwMxPdp.png'
            alt='search'
          />
          <p>
            PokeTeams lets you search the database by specific Pokemon species,
            alphabetical order and date created. In the future, you'll be able
            to search for specific teams and by popularity!
          </p>
        </AnimateOnScroll>
      </section>

      <section>
        <AnimateOnScroll animateIn={styles['fade-in']} animateOnce={true}>
          <header>
            <h3>Share Your Teams and Pokemon!</h3>
          </header>
          <Image
            imageClass={styles['landingimg']}
            src='https://imgur.com/JWIgCyL.png'
            alt='export'
          />
          <p>
            Most importantly, you can share both full teams and Pokemon sets
            with anyone! Create awesome teams and Pokemon and let the world know
            about your creations!
          </p>
        </AnimateOnScroll>
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;
