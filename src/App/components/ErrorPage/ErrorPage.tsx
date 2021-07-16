import React, { Component, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default class ErrorPage extends Component {
  state = { error: null };

  static getDerivedStateFormError(error: string): string {
    return error;
  }

  render(): ReactNode {
    if (this.state.error) {
      return (
        <main className="error-page">
          <h1>{this.state.error}</h1>
          <h1>Something seems to have gone wrong!</h1>
          <p>Try refreshing the page or returning to HOME</p>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
        </main>
      );
    }
    //otherwise render the children
    return this.props.children;
  }
}
