import React, { Component, Fragment } from 'react';
import {Route, Switch} from 'react-router-dom';
import BuildPage from '../../routes/BuildPage/BuildPage';
import HomePage from '../../routes/HomePage/HomePage';
import LandingPage from '../../routes/LandingPage/LandingPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import ShareSetPage from '../../routes/ShareSetPage/ShareSetPage';
import ShareTeamPage from '../../routes/ShareTeamPage/ShareTeamPage';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import UserContext from '../../contexts/UserContext';
import './App.css';


export default class App extends Component {
  state = {
    canEdit: false
  };

  // State Input Update Functions -> these may go in their own components 

  // Validate State Functions -> these may go in their own components

  // Event Handlers/API Calls -> these may go in their own components
  
  render() {
    return (
      <UserContext.Provider value = {{
        
      }}>
        <Fragment>
          <main>
            <Switch>
              <Route
                exact path = {'/'}
                component = {HomePage}/>
              <Route
                exact path = {'/share/:team_id'}
                component = {ShareTeamPage}/>
              <Route
                exact path = {'/share/:team_id/:set_id'}
                component = {ShareSetPage}/>
              <PublicOnlyRoute
                path = {'/landing'}
                component = {LandingPage}/>
              <PrivateRoute
                path={'/build'}
                component={BuildPage}/>
              <Route
                component={NotFoundPage}
              />
            </Switch>
          </main>
        </Fragment>
      </UserContext.Provider>
    );
  };
};




