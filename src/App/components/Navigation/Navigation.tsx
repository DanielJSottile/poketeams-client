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

  const renderLogout = () => {
    return (
      <div className={styles['navigation-logged-in']}>
        <NavLink onClick={handleLogoutClick} to="/landing">
          Logout <FontAwesomeIcon icon={faSignOutAlt} />
        </NavLink>
      </div>
    );
  };

  const renderLogin = () => {
    return (
      <div className={styles['navigation-logged-out']}>
        <NavLink to="/landing">
          Log In <FontAwesomeIcon icon={faSignInAlt} />
        </NavLink>
      </div>
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
              {isLoggedIn ? renderLogout() : renderLogin()}
            </div>
            <div className={styles['search-cont']}>
              <SearchBar isPublic={isPublic} />
            </div>
            <div className={styles['user_things']}>
              {isLoggedIn ? renderLogout() : renderLogin()}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
