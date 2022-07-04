import React, { FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';
import TokenService from '../../services/token-service';

const PublicOnlyRoute: FunctionComponent<any> = ({ children }): JSX.Element => {
  return TokenService.hasAuthToken() ? <Navigate to='/' /> : children;
};

export default PublicOnlyRoute;
