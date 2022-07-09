import React, { lazy, Suspense, useEffect, FunctionComponent } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ErrorFallback from './components/ErrorFallback';
import LazyLoader from './components/Loaders/LazyLoader';
import PrivateRoute from './components/Utils/PrivateRoute';
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute';

const BuildPage = lazy(() => import('./routes/BuildPage'));
const HomePage = lazy(() => import('./routes/HomePage'));
const LandingPage = lazy(() => import('./routes/LandingPage'));
const NotFoundPage = lazy(() => import('./routes/NotFoundPage'));
const ShareSetPage = lazy(() => import('./routes/ShareSetPage'));
const ShareTeamPage = lazy(() => import('./routes/ShareTeamPage'));
const ShareFolderPage = lazy(() => import('./routes/ShareFolderPage'));
const RegistrationPage = lazy(() => import('./routes/RegistrationPage'));
const PrivacyPolicy = lazy(() => import('./routes/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./routes/TermsAndConditions'));

const App: FunctionComponent = () => {
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 1);
  }, [location]);

  const navigate = useNavigate();

  return (
    <>
      <main>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            navigate('/');
          }}
        >
          <Suspense
            fallback={
              <div>
                <LazyLoader />
              </div>
            }
          >
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='share'>
                <Route path=':team_id' element={<ShareTeamPage />}>
                  <Route path=':set_id' element={<ShareSetPage />} />
                </Route>
                <Route path='user'>
                  <Route path='folder'>
                    <Route path=':folder_id' element={<ShareFolderPage />} />
                  </Route>
                </Route>
              </Route>
              <Route path={'privacy-policy'} element={<PrivacyPolicy />} />
              <Route
                path={'terms-and-conditions'}
                element={<TermsAndConditions />}
              />
              <Route
                path='landing'
                element={<PublicOnlyRoute Component={LandingPage} />}
              />
              <Route
                path='register'
                element={<PublicOnlyRoute Component={RegistrationPage} />}
              />
              <Route
                path='build'
                element={<PrivateRoute Component={BuildPage} />}
              />

              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Toaster />
      </main>
    </>
  );
};

export default App;
