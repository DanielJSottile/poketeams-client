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
      <Input
        containerClass={styles['user_name']}
        inputHasError={false}
        htmlFor="RegistrationForm__user_name"
        label="User name &#42;"
        name="user_name"
        type="text"
        required
        id="RegistrationForm__user_name"
      />
      <Input
        containerClass={styles['password']}
        inputHasError={false}
        htmlFor="RegistrationForm__password"
        label="Password &#42;"
        name="password"
        type="password"
        required
        id="RegistrationForm__password"
      />
      <Input
        containerClass={styles['verifyPassword']}
        inputHasError={false}
        htmlFor="RegistrationForm__verifyPassword"
        label="Verify Password &#42;"
        name="verifyPassword"
        type="password"
        required
        id="RegistrationForm__verifyPassword"
      />
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
