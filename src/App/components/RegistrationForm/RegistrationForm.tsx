import React, { useState, FormEvent, FunctionComponent } from 'react';
import { faHandPointLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '../../@types';
import AuthApiService from '../../services/auth-api-service';
import {
  validateVerifyPassword,
  validatePassword,
} from '../../utils/validations';
import Button from '../Button';
import Form from '../Form';
import Input from '../Input';
import styles from './RegistrationForm.module.scss';

type RegistrationFormProps = {
  /** folder that is being shared */
  onRegistrationSuccess?: () => void;
};

const RegistrationForm: FunctionComponent<RegistrationFormProps> = ({
  onRegistrationSuccess = () => null,
}) => {
  const navigate = useNavigate();
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
      setError('Your Passwords Do Not Match!');
      return;
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
    <Form className={styles['registration-form']} onSubmit={handleSubmit}>
      <div role='alert'>
        {error ? (
          <p className={styles['error']}>{error}</p>
        ) : (
          <p className={styles['register-intro']}>
            Please create a unique username, and a password that is 8 characters
            and contains an uppercase, lowercase, number and a special
            character.
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
        htmlFor='RegistrationForm__user_name'
        label='Username &#42;'
        labelClass={styles['width-override']}
        placeholder='Username'
        name='user_name'
        type='text'
        required
        id='RegistrationForm__user_name'
      />
      <Input
        containerClass={styles['password']}
        inputHasError={false}
        onChangeCallback={(e) =>
          setPassword({ value: e.target.value, touched: true })
        }
        value={password.value}
        inputClass={styles['width-override']}
        htmlFor='RegistrationForm__password'
        label='Password &#42;'
        labelClass={styles['width-override']}
        placeholder='Password'
        name='password'
        type='password'
        required
        id='RegistrationForm__password'
      />
      <Input
        containerClass={styles['verifyPassword']}
        inputHasError={false}
        onChangeCallback={(e) =>
          setVerifyPassword({ value: e.target.value, touched: true })
        }
        value={verifyPassword.value}
        inputClass={styles['width-override']}
        htmlFor='RegistrationForm__verifyPassword'
        label='Verify Password &#42;'
        labelClass={styles['width-override']}
        placeholder='Verify Password'
        name='verifyPassword'
        type='password'
        required
        id='RegistrationForm__verifyPassword'
      />
      <span className={styles['required-text']}>&#42; Required</span>
      <div className={styles['button-container']}>
        <Button
          buttonClass={styles['register-button']}
          type='submit'
          disabled={
            !username.value ||
            !!validatePassword(password) ||
            !!validateVerifyPassword(password, verifyPassword)
          }
        >
          Register <FontAwesomeIcon icon={faUserPlus} />
        </Button>
        <Button
          buttonClass={styles['go-back-button']}
          onClickCallback={() => {
            navigate(-1);
          }}
        >
          Go Back <FontAwesomeIcon icon={faHandPointLeft} />
        </Button>
      </div>
    </Form>
  );
};

export default RegistrationForm;
