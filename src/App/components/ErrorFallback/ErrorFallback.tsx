import React from 'react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FallbackProps } from 'react-error-boundary';
import { Link } from 'react-router-dom';

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps): JSX.Element => {
  return (
    <main className="error-page">
      <h3>{error.message}</h3>
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
