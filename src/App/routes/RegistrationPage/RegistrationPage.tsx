import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { History } from 'history';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import Footer from '../../components/Footer/Footer';
import styles from './RegistrationPage.module.scss';

type RegistrationProps = {
  history: History;
};

const RegistrationPage: FunctionComponent<RegistrationProps> = ({
  history,
}): JSX.Element => {
  const handleRegistrationSuccess = () => {
    history.push('/landing');
  };

  return (
    <>
      <section>
        <div className={styles['landing-title']}></div>
        <h2 className={styles['heading-text']}>Create Your Account!</h2>
        <div className={styles['registration-form-container']}>
          <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
        </div>
      </section>
      <section>
        <div className={styles['perks']}>
          <h3>Perks of Signing Up:</h3>
          <ul>
            <li>Save Your Teams Permanently!</li>
            <li>Edit Your Teams To Your Hearts Content!</li>
            <li>Keep Track of Your Favorites!</li>
            <li>Share Your New Teams Immediately!</li>
          </ul>
        </div>
      </section>
      <section>
        <div className={styles['terms-of-service']}>
          <span>By creating an account, you agree to the</span>
          <Link className={styles['no-styling']} to={'/terms-and-conditions'}>
            Terms And Conditions
          </Link>
          <span>
            . For more information about PokéTeam's privacy practices, see the
            PokéTeams
          </span>
          <Link className={styles['no-styling']} to={'/privacy-policy'}>
            Privacy Policy.
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default RegistrationPage;
