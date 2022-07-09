import React, { FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';
import TokenService from '../../services/token-service';

type PrivateOnlyRouteProps = {
  /** Passed in Component to display  */
  Component: FunctionComponent;
};

const PrivateOnlyRoute: FunctionComponent<PrivateOnlyRouteProps> = ({
  Component,
}): JSX.Element => {
  return TokenService.hasAuthToken() ? (
    <Component />
  ) : (
    <Navigate to='/landing' replace />
  );
};

export default PrivateOnlyRoute;
