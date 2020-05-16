import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import TokenService from '../../services/token-service';

export default class Navigation extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  };

  renderLogout() {
    return (
      <div className='navigation-logged-in'>
      <Link
        onClick={this.handleLogoutClick}
        to='/'>
        Logout
        </Link>
      </div>
    );
  };

  renderLogin() {
    return (
      <div className='navigation-logged-out'>
      <Link
        to='/landing'>
        Log In
      </Link>
      </div>
    );
  };

  render() {
    return (
      <div>
        <nav role="navigation">
          <h1>{`${this.props.title}`}</h1>
          <div className="navbar">
            <div className="button_things">
              <Link to='/'>Home</Link>
              <Link to='/build'>Build!</Link>
            </div>
            <div class="mobile-button">
              <Link to='/'>Home</Link>
              <Link to='/build'>Build!</Link>
              {TokenService.hasAuthToken() ? this.renderLogout() : this.renderLogin()}
            </div>
            <SearchBar/>
            <div className="user_things">
              {TokenService.hasAuthToken() ? this.renderLogout() : this.renderLogin()}
            </div>
          </div>
        </nav>
      </div>
    );
  };
};


