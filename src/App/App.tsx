import React, { Fragment, lazy, Suspense, FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import ErrorPage from './components/ErrorPage/ErrorPage';
import PrivateRoute from './components/Utils/PrivateRoute';
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute';
import LazyLoader from './components/Loaders/LazyLoader/LazyLoader';

const BuildPage = lazy(() => import('./routes/BuildPage/BuildPage'));
const HomePage = lazy(() => import('./routes/HomePage/HomePage'));
const LandingPage = lazy(() => import('./routes/LandingPage/LandingPage'));
const NotFoundPage = lazy(() => import('./routes/NotFoundPage/NotFoundPage'));
const ShareSetPage = lazy(() => import('./routes/ShareSetPage/ShareSetPage'));
const ShareTeamPage = lazy(
  () => import('./routes/ShareTeamPage/ShareTeamPage')
);
const ShareFolderPage = lazy(
  () => import('./routes/ShareFolderPage/ShareFolderPage')
);
const RegistrationPage = lazy(
  () => import('./routes/RegistrationPage/RegistrationPage')
);

const App: FunctionComponent = () => {
  return (
    <Fragment>
      <main>
        <ErrorPage>
          <Suspense
            fallback={
              <div>
                <LazyLoader />
              </div>
            }
          >
            <Switch>
              <Route exact path={'/'} component={HomePage} />
              <Route exact path={'/share/:team_id'} component={ShareTeamPage} />
              <Route
                exact
                path={'/share/:team_id/:set_id'}
                component={ShareSetPage}
              />
              <Route
                exact
                path={'/share/user/folder/:folder_id'}
                component={ShareFolderPage}
              />
              <PublicOnlyRoute path={'/landing'} component={LandingPage} />
              <PublicOnlyRoute
                path={'/register'}
                component={RegistrationPage}
              />
              <PrivateRoute path={'/build'} component={BuildPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
        </ErrorPage>
      </main>
    </Fragment>
  );
};

export default App;
