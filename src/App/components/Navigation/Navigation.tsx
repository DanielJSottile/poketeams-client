import React, { useContext, FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faSignInAlt,
  faHome,
  faHammer,
} from '@fortawesome/free-solid-svg-icons';
import PokeTeamsIcon from '../../Images/PokeTeams.png';
import Image from '../Image';
import SearchBar from '../SearchBar';
import UserContext from '../../contexts/UserContext';
import styles from './Navigation.module.scss';

type NavigationProps = {
  /** determines whether to render public or private navbar
   * This will be determined by isLoggedIn from UserContext at the highest page level
   */
  isPublic: boolean;
};

const Navigation: FunctionComponent<NavigationProps> = ({ isPublic }) => {
  const { handleLogoutClick, isLoggedIn, user } = useContext(UserContext);

  const renderLogInOut = () => {
    return (
      <NavLink
        onClick={isLoggedIn ? handleLogoutClick : () => null}
        to="/landing"
      >
        {isLoggedIn ? 'Logout' : 'Log In'}{' '}
        <FontAwesomeIcon icon={isLoggedIn ? faSignOutAlt : faSignInAlt} />
      </NavLink>
    );
  };

  const renderUserWelcome = () => {
    if (isLoggedIn) {
      return <h2>{`Welcome, ${user}!`}</h2>;
    } else {
      return <h2>{`Click the Login Button to Log In!`}</h2>;
    }
  };

  return (
    <div>
      <nav role="navigation">
        <div className={styles['user-welcome']}>{renderUserWelcome()}</div>
        <div className={styles['navigation-body']}>
          <div className={styles['logo-with-text']}>
            <Image
              src={PokeTeamsIcon}
              alt="PokeTeams Logo"
              imageClass={styles['logo-title']}
            />
            <h2>{isPublic ? 'Home' : 'Build'}</h2>
          </div>
          <div className={styles['navbar']}>
            <div className={styles['mobile-button']}>
              <NavLink to="/">
                <FontAwesomeIcon icon={faHome} /> Home
              </NavLink>
              <NavLink to="/build">
                <FontAwesomeIcon icon={faHammer} /> Build!
              </NavLink>
              {renderLogInOut()}
            </div>
            <div className={styles['search-cont']}>
              <SearchBar isPublic={isPublic} />
            </div>
            <div className={styles['user_things']}>{renderLogInOut()}</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
