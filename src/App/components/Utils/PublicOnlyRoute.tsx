import React, { LazyExoticComponent, FunctionComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../../services/token-service';

export interface PublicOnlyRouteProps {
  /** JSX Component */
  component: LazyExoticComponent<FunctionComponent<any>>;
  path: string;
}

const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({
  component,
  ...props
}): JSX.Element => {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) =>
        TokenService.hasAuthToken() ? (
          <Redirect to={'/'} />
        ) : (
          <Component {...componentProps} />
        )
      }
    />
  );
};

export default PublicOnlyRoute;
