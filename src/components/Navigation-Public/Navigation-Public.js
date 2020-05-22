import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar-Public/SearchBar-Public';
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

  render() {
    return (
      <div>
        <nav role="navigation">
          <h1>{`${this.props.title}`}</h1>
          <div className="navbar">
            <div className="button_things">
              <Link to='/'><i className="fas fa-home"></i>Home</Link>
              <Link to='/build'><i class="fas fa-hammer"></i>Build!</Link>
            </div>
            <div className="mobile-button">
              <Link to='/'><i className="fas fa-home"></i>Home</Link>
              <Link to='/build'><i className="fas fa-hammer"></i>Build!</Link>
              {TokenService.hasAuthToken() ? this.renderLogout() : this.renderLogin()}
            </div>
            <div>
              <SearchBar/>
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


