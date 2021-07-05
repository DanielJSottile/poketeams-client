import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Input from '../Input/Input';
import AuthApiService from '../../services/auth-api-service';
import styles from './RegistrationForm.module.scss';

// Interfaces

export interface Provider {
  error: string | null;
}

// Component

const RegistrationForm = (props: any) => {
  // Set State

  const [state, setState] = useState<Provider>({ error: null });

  // Set State Input Functions

  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    const { user_name, password, verifyPassword } = ev.target;

    if (password.value !== verifyPassword.value) {
      return setState({ error: 'Your Passwords Do Not Match!' });
    }

    setState({ error: null });

    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value,
    })
      .then((user) => {
        user_name.value = '';
        password.value = '';
        props.onRegistrationSuccess();
      })
      .catch((res) => {
        setState((oldVals) => ({ ...oldVals, error: res.error }));
      });
  };

  // Final Render

  return (
    <form className={styles['RegistrationForm']} onSubmit={handleSubmit}>
      <div role="alert">
        {state.error ? (
          <p className={styles['error shake-horizontal']}>{state.error}</p>
        ) : (
          <p className={styles['register-intro']}>
            Please create a unique username, and a password that is 8 characters
            and contains an uppercase, lowercase, number and a special char.
          </p>
        )}
      </div>
      <div className={styles['user_name']}>
        <label htmlFor="RegistrationForm__user_name">User name &#42;</label>
        <Input
          inputHasError={false}
          name="user_name"
          type="text"
          required
          id="RegistrationForm__user_name"
        />
      </div>
      <div className={styles['password']}>
        <label htmlFor="RegistrationForm__password">Password &#42;</label>
        <Input
          inputHasError={false}
          name="password"
          type="password"
          required
          id="RegistrationForm__password"
        />
      </div>
      <div className={styles['verifyPassword']}>
        <label htmlFor="RegistrationForm__verifyPassword">
          Verify Password &#42;
        </label>
        <Input
          inputHasError={false}
          name="verifyPassword"
          type="password"
          required
          id="RegistrationForm__verifyPassword"
        />
      </div>
      <div className={styles['go-back-links']}>
        <Button type="submit">Register</Button>
        <Link className={styles['go-back']} to={'/landing'}>
          Go Back
        </Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
