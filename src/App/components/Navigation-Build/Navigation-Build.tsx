import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchBarBuild from '../SearchBar-Build/SearchBar-Build';
import GeneralContext from '../../contexts/GeneralContext';
import TokenService from '../../services/token-service';
import jwtDecode from 'jwt-decode';
import styles from './Navigation-Build.module.scss';

interface MyToken {
  sub: any;
  user_id: any;
}

const NavigationBuild: React.FC = () => {
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
    let user: any = '';

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
        <div className={styles['build-title']}></div>
        <div className={styles['navbar']}>
          <div className={styles['button_things']}>
            <Link to="/">
              <i className="fas fa-home"></i> Home
            </Link>
            <Link to="/build">
              <i className="fas fa-hammer"></i> Build!
            </Link>
          </div>
          <div className={styles['mobile-button']}>
            <Link to="/">
              <i className="fas fa-home"></i> Home
            </Link>
            <Link to="/build">
              <i className="fas fa-hammer"></i> Build!
            </Link>
            {TokenService.hasAuthToken() ? renderLogout() : renderLogin()}
          </div>
          <div className={styles['search-cont']}>
            <SearchBarBuild />
          </div>
          <div className={styles['user_things']}>
            {TokenService.hasAuthToken() ? renderLogout() : renderLogin()}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBuild;
