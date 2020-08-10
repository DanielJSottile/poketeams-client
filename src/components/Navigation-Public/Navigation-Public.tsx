import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar-Public/SearchBar-Public';
import GeneralContext from '../../contexts/GeneralContext';
import jwtDecode from 'jwt-decode';
import TokenService from '../../services/token-service';
import './Navigation-Public.css';

interface MyToken {
  sub: any;
  // whatever else is in the JWT.
}

const NavigationPublic = (props: any) => {
  const GenCon = useContext(GeneralContext);

  const handleLogoutClick = () => {
    TokenService.clearAuthToken();
    GenCon.clearUserState();
  };

  const renderLogout = () => {
    return (
      <div className='navigation-logged-in'>
      <Link
        onClick={handleLogoutClick}
        to='/landing'>
        Logout <i className="fas fa-sign-out-alt"></i>
        </Link>
      </div>
    );
  };

  const renderLogin = () => {
    return (
      <div className='navigation-logged-out'>
      <Link
        to='/landing'>
        Log In <i className="fas fa-sign-in-alt"></i>
      </Link>
      </div>
    );
  };

  const renderUserWelcome = () => {
    let user = '';

    if (TokenService.getAuthToken()){
      user = jwtDecode<MyToken>(TokenService.getAuthToken() || '').sub
      return (
        <h2>{`Welcome, ${user}!`}</h2>
      )
    } else {
      return (
        <h2>{`Click the Login Button to Log In!`}</h2>
      )
    }
  }

    return (
      <div>
        <nav role="navigation">
          <div className="user-welcome">
          {renderUserWelcome()}
          </div>
          <div className="home-title"></div>
          <div className="navbar">
            <div className="button_things">
              <Link to='/'><i className="fas fa-home"></i>Home</Link>
              <Link to='/build'><i className="fas fa-hammer"></i>Build!</Link>
            </div>
            <div className="mobile-button">
              <Link to='/'><i className="fas fa-home"></i>Home</Link>
              <Link to='/build'><i className="fas fa-hammer"></i>Build!</Link>
              {TokenService.hasAuthToken() ? renderLogout() : renderLogin()}
            </div>
            <div className="search-cont">
              <SearchBar/>
            </div>
            <div className="user_things">
              {TokenService.hasAuthToken() ? renderLogout() : renderLogin()}
            </div>
          </div>
        </nav>
      </div>
    );
}

export default NavigationPublic;


