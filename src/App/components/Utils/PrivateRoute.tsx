// import React, { LazyExoticComponent, FunctionComponent } from 'react';
// import { StaticContext } from 'react-router';
// import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
// import TokenService from '../../services/token-service';

// export interface PrivateRouteProps {
//   element: LazyExoticComponent<
//     FunctionComponent<
//       RouteComponentProps<
//         { [x: string]: string | undefined },
//         StaticContext,
//         unknown
//       >
//     >
//   >;
//   path: string;
// }

// const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
//   element,
//   ...props
// }): JSX.Element => {
//   const Component = element;
//   return (
//     <Route
//       {...props}
//       render={(componentProps) =>
//         TokenService.hasAuthToken() ? (
//           <Component {...componentProps} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/landing',
//               state: { from: componentProps.location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;

import React, { FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';
import TokenService from '../../services/token-service';

const PrivateOnlyRoute: FunctionComponent<any> = ({
  children,
}): JSX.Element => {
  return TokenService.hasAuthToken() ? (
    <Navigate to='/landing' replace />
  ) : (
    children
  );
};

export default PrivateOnlyRoute;
