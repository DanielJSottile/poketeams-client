import React, { lazy, Suspense, FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ErrorPage from './components/ErrorPage';
import PrivateRoute from './components/Utils/PrivateRoute';
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute';
import LazyLoader from './components/Loaders/LazyLoader';

const BuildPage = lazy(() => import('./routes/BuildPage'));
const HomePage = lazy(() => import('./routes/HomePage'));
const LandingPage = lazy(() => import('./routes/LandingPage'));
const NotFoundPage = lazy(() => import('./routes/NotFoundPage'));
const ShareSetPage = lazy(() => import('./routes/ShareSetPage'));
const ShareTeamPage = lazy(() => import('./routes/ShareTeamPage'));
const ShareFolderPage = lazy(() => import('./routes/ShareFolderPage'));
const RegistrationPage = lazy(() => import('./routes/RegistrationPage'));
const PrivacyPolicy = lazy(() => import('./routes/PrivacyPolicy'));

const App: FunctionComponent = () => {
  return (
    <>
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
              <PublicOnlyRoute
                path={'/privacy-policy'}
                component={PrivacyPolicy}
              />
              <PrivateRoute path={'/build'} component={BuildPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
        </ErrorPage>
        <Toaster />
      </main>
    </>
  );
};

export default App;
