import React, { useState, FormEvent, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import Input from '../Input';
import AuthApiService from '../../services/auth-api-service';
import styles from './RegistrationForm.module.scss';
import { TextInput } from '../../@types';

type RegistrationFormProps = {
  /** folder that is being shared */
  onRegistrationSuccess?: () => void;
};

const RegistrationForm: FunctionComponent<RegistrationFormProps> = ({
  onRegistrationSuccess = () => null,
}) => {
  const [error, setError] = useState('');
  const [username, setUsername] = useState<TextInput>({
    value: '',
    touched: false,
  });
  const [password, setPassword] = useState<TextInput>({
    value: '',
    touched: false,
  });
  const [verifyPassword, setVerifyPassword] = useState<TextInput>({
    value: '',
    touched: false,
  });

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (password.value !== verifyPassword.value) {
      return setError('Your Passwords Do Not Match!');
    }
    setError('');
    AuthApiService.postUser({
      user_name: username.value,
      password: password.value,
    })
      .then(() => {
        setUsername({ value: '', touched: false });
        setPassword({ value: '', touched: false });
        setVerifyPassword({ value: '', touched: false });
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
        onChangeCallback={(e) =>
          setUsername({ value: e.target.value, touched: true })
        }
        value={username.value}
        inputClass={styles['width-override']}
        htmlFor="RegistrationForm__user_name"
        label="User name &#42;"
        labelClass={styles['width-override']}
        placeholder="Username"
        name="user_name"
        type="text"
        required
        id="RegistrationForm__user_name"
      />
      <Input
        containerClass={styles['password']}
        inputHasError={false}
        onChangeCallback={(e) =>
          setPassword({ value: e.target.value, touched: true })
        }
        value={password.value}
        inputClass={styles['width-override']}
        htmlFor="RegistrationForm__password"
        label="Password &#42;"
        labelClass={styles['width-override']}
        placeholder="Password"
        name="password"
        type="password"
        required
        id="RegistrationForm__password"
      />
      <Input
        containerClass={styles['verifyPassword']}
        inputHasError={false}
        onChangeCallback={(e) =>
          setVerifyPassword({ value: e.target.value, touched: true })
        }
        value={verifyPassword.value}
        inputClass={styles['width-override']}
        htmlFor="RegistrationForm__verifyPassword"
        label="Verify Password &#42;"
        labelClass={styles['width-override']}
        placeholder="Verify Password"
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
