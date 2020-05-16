import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import BuildPage from '../../routes/BuildPage/BuildPage';
import HomePage from '../../routes/HomePage/HomePage';
import LandingPage from '../../routes/LandingPage/LandingPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import ShareSetPage from '../../routes/ShareSetPage/ShareSetPage';
import ShareTeamPage from '../../routes/ShareTeamPage/ShareTeamPage';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import './App.css';

export default class App extends Component {
  state = {
    
  };
  
  render() {
    return (
      <div className='App'>
        <main>
          <Switch>
            <Route
              exact path = {'/'}
              component = {HomePage}/>
            <Route
              exact path = {'/share/:team'}
              component = {ShareTeamPage}/>
            <Route
              exact path = {'/share/:team/:set'}
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
      </div>
    );
  };
};




