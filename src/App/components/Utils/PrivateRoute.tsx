import React, {
  LazyExoticComponent,
  FunctionComponent,
  useContext,
} from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
import UserContext from '../../contexts/UserContext';

export interface PrivateRouteProps {
  component: LazyExoticComponent<
    FunctionComponent<
      RouteComponentProps<
        { [x: string]: string | undefined },
        StaticContext,
        unknown
      >
    >
  >;
  path: string;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  component,
  ...props
}): JSX.Element => {
  const { isLoggedIn } = useContext(UserContext);
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) =>
        isLoggedIn ? (
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
