import React, { LazyExoticComponent, FunctionComponent } from 'react';
import { StaticContext } from 'react-router';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import TokenService from '../../services/token-service';

export interface PublicOnlyRouteProps {
  /** JSX Component */
  component: LazyExoticComponent<
    FunctionComponent<
      RouteComponentProps<
        { [x: string]: string | undefined },
        StaticContext,
        any
      >
    >
  >;
  path: string;
}

const PublicOnlyRoute: FunctionComponent<PublicOnlyRouteProps> = ({
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
