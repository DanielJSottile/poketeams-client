import React, { FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';
import TokenService from '../../services/token-service';

type PrivateOnlyRouteProps = {
  /** determines whether to render public or private navbar */
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
