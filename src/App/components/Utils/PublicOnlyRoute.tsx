import React, {
  LazyExoticComponent,
  FunctionComponent,
  useContext,
} from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
import UserContext from '../../contexts/UserContext';

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
  const { isLoggedIn } = useContext(UserContext);
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) =>
        isLoggedIn ? <Redirect to={'/'} /> : <Component {...componentProps} />
      }
    />
  );
};

export default PublicOnlyRoute;
