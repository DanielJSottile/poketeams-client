import React, { FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';
import TokenService from '../../services/token-service';

type PublicOnlyRouteProps = {
  /** determines whether to render public or private navbar */
  Component: FunctionComponent;
};

const PublicOnlyRoute: FunctionComponent<PublicOnlyRouteProps> = ({
  Component,
}): JSX.Element => {
  return TokenService.hasAuthToken() ? <Navigate to='/' /> : <Component />;
};

export default PublicOnlyRoute;
