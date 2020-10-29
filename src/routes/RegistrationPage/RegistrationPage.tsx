import React, { Fragment } from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import Footer from '../../components/Footer/Footer';
import './RegistrationPage.scss';

// Component

const RegistrationPage = (props: any): JSX.Element => {
  // Handle Registration Success

  const handleRegistrationSuccess = (user: any) => {
    const { history } = props;
    history.push('/landing');
  };

  // Final Render

  return (
    <Fragment>
      <section>
        <div className="landing-title"></div>
        <h2>Create Your Account!</h2>
        <div className="registration-form-container">
          <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
        </div>
      </section>
      <section>
        <div className="perks">
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
        <p className="terms-of-service">
          By creating an account, you agree to the *Terms of Service. For more
          information about PokéTeam's privacy practices, see the PokéTeams
          *Privacy Statement.
        </p>

        <p className="notice">
          *Not Yet Implemented. Sorry! Just know we're working on keeping your
          data secure!
        </p>
      </section>
      <Footer />
    </Fragment>
  );
};

export default RegistrationPage;
