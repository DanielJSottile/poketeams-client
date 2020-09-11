import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../../services/token-service';

export interface IProps {
  component: any;
  path: string;
}

export default function PrivateRoute({ component, ...props }: IProps) {
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
}
