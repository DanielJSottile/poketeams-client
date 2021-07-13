import React, { LazyExoticComponent, FunctionComponent } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
import TokenService from '../../services/token-service';

export interface PrivateRouteProps {
  component: LazyExoticComponent<
    FunctionComponent<RouteComponentProps<{}, StaticContext, unknown>>
  >;
  path: string;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
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
