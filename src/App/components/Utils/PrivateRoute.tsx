import React, { LazyExoticComponent, FunctionComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../../services/token-service';

export interface PrivateRouteProps {
  component: LazyExoticComponent<FunctionComponent<any>>;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component,
  ...props
}): JSX.Element => {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) =>
        TokenService.hasAuthToken() ? (
          <Component {...componentProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/landing',
              state: { from: componentProps.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
