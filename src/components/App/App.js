import React, { Component, Fragment } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import BuildPage from '../../routes/BuildPage/BuildPage';
import HomePage from '../../routes/HomePage/HomePage';
import LandingPage from '../../routes/LandingPage/LandingPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import ShareSetPage from '../../routes/ShareSetPage/ShareSetPage';
import ShareTeamPage from '../../routes/ShareTeamPage/ShareTeamPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import RegistrationForm from '../RegistrationForm/RegistrationForm';

export default class App extends Component {
  
  render() {
    return (
        <Fragment>
          <main>
          <BrowserRouter>
          <ErrorPage>
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
              <PublicOnlyRoute
                path = {'/register'}
                component = {RegistrationForm}/>
              <PrivateRoute
                path={'/build'}
                component={BuildPage}/>
              <Route
                component={NotFoundPage}
              />
            </Switch>
            </ErrorPage>
          </BrowserRouter>
          </main>
        </Fragment>
    );
  };
};




