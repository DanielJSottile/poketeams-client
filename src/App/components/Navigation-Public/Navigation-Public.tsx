import React, { useContext, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar-Public/SearchBar-Public';
import GeneralContext from '../../contexts/GeneralContext';
import jwtDecode from 'jwt-decode';
import TokenService from '../../services/token-service';
import styles from './Navigation-Public.module.scss';

interface MyToken {
  sub: string;
}

const NavigationPublic: FunctionComponent = () => {
  const { clearUserState } = useContext(GeneralContext);

  const handleLogoutClick = () => {
    TokenService.clearAuthToken();
    clearUserState();
  };

  const renderLogout = () => {
    return (
      <div className={styles['navigation-logged-in']}>
        <Link onClick={handleLogoutClick} to="/landing">
          Logout <i className="fas fa-sign-out-alt"></i>
        </Link>
      </div>
    );
  };

  const renderLogin = () => {
    return (
      <div className={styles['navigation-logged-out']}>
        <Link to="/landing">
          Log In <i className="fas fa-sign-in-alt"></i>
        </Link>
      </div>
    );
  };

  const renderUserWelcome = () => {
    let user = '';

    if (TokenService.getAuthToken()) {
      user = jwtDecode<MyToken>(TokenService.getAuthToken() || '').sub;
      return <h2>{`Welcome, ${user}!`}</h2>;
    } else {
      return <h2>{`Click the Login Button to Log In!`}</h2>;
    }
  };

  return (
    <div>
      <nav role="navigation">
        <div className={styles['user-welcome']}>{renderUserWelcome()}</div>
        <div className={styles['home-title']}></div>
        <div className={styles['navbar']}>
          <div className={styles['button_things']}>
            <Link to="/">
              <i className="fas fa-home"></i>Home
            </Link>
            <Link to="/build">
              <i className={styles['fas fa-hammer']}></i>Build!
            </Link>
          </div>
          <div className={styles['mobile-button']}>
            <Link to="/">
              <i className="fas fa-home"></i>Home
            </Link>
            <Link to="/build">
              <i className="fas fa-hammer"></i>Build!
            </Link>
            {TokenService.hasAuthToken() ? renderLogout() : renderLogin()}
          </div>
          <div className={styles['search-cont']}>
            <SearchBar />
          </div>
          <div className={styles['user_things']}>
            {TokenService.hasAuthToken() ? renderLogout() : renderLogin()}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationPublic;
