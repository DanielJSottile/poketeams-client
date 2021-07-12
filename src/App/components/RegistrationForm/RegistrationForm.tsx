import React, { useState, FormEvent, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Input from '../Input/Input';
import AuthApiService from '../../services/auth-api-service';
import styles from './RegistrationForm.module.scss';

type Props = {
  /** folder that is being shared */
  onRegistrationSuccess?: () => void;
};

const RegistrationForm: FunctionComponent<Props> = ({
  onRegistrationSuccess = () => null,
}) => {
  const [error, setError] = useState('');

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { user_name, password, verifyPassword } =
      ev.target as HTMLFormElement;

    if (password.value !== verifyPassword.value) {
      return setError('Your Passwords Do Not Match!');
    }
    setError('');
    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value,
    })
      .then(() => {
        user_name.value = '';
        password.value = '';
        onRegistrationSuccess();
      })
      .catch((res) => {
        setError(res.error);
      });
  };

  return (
    <form className={styles['RegistrationForm']} onSubmit={handleSubmit}>
      <div role="alert">
        {error ? (
          <p className={styles['error shake-horizontal']}>{error}</p>
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
