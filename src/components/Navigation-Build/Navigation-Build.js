import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBarBuild from '../SearchBar-Build/SearchBar-Build';
import UserContext from '../../contexts/UserContext';
import TokenService from '../../services/token-service';
import jwtDecode from 'jwt-decode';

export default class Navigation extends Component {

  static contextType = UserContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.context.clearUserState();
  };

  renderLogout() {
    return (
      <div className='navigation-logged-in'>
      <Link
        onClick={this.handleLogoutClick}
        to='/'>
        Logout <i className="fas fa-sign-out-alt"></i>
        </Link>
      </div>
    );
  };

  renderLogin() {
    return (
      <div className='navigation-logged-out'>
      <Link
        to='/landing'>
        Log In <i className="fas fa-sign-in-alt"></i>
      </Link>
      </div>
    );
  };

  renderUserWelcome() {
    let user = '';

    if (TokenService.getAuthToken()){
      user = jwtDecode(TokenService.getAuthToken()).sub
      return (
        <h2>{`Welcome, ${user}!`}</h2>
      )
    } else {
      return (
        <h2>{`Click the Login Button to Log In!`}</h2>
      )
    }
  }

  render() {

    return (
      <div>
        <nav role="navigation">
          <div className="user-welcome">
            {this.renderUserWelcome()}
          </div>
          <h1>{<img src="https://cdn.bulbagarden.net/upload/0/09/Dream_Park_Ball_Sprite.png" alt="parkball"/>}{`${this.props.title}`}</h1>
          <div className="navbar">
            <div className="button_things">
              <Link to='/'><i className="fas fa-home"></i> Home</Link>
              <Link to='/build'><i className="fas fa-hammer"></i> Build!</Link>
            </div>
            <div className="mobile-button">
              <Link to='/'><i className="fas fa-home"></i> Home</Link>
              <Link to='/build'><i className="fas fa-hammer"></i> Build!</Link>
              {TokenService.hasAuthToken() ? this.renderLogout() : this.renderLogin()}
            </div>
            <div>
              <SearchBarBuild/>
            </div>
            <div className="user_things">
              {TokenService.hasAuthToken() ? this.renderLogout() : this.renderLogin()}
            </div>
          </div>
        </nav>
      </div>
    );
  };
};


