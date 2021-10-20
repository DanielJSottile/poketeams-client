import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps): JSX.Element => {
  return (
    <main className="error-page">
      <h1>{error.message}</h1>
      <h1>Something seems to have gone wrong!</h1>
      <button onClick={resetErrorBoundary}>
        Try clicking this button or returning to HOME
      </button>
      <p></p>
      <Link to="/">
        <FontAwesomeIcon icon={faHome} /> Home
      </Link>
    </main>
  );
};

export default ErrorFallback;
