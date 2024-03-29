import React, {
  useContext,
  useState,
  FormEvent,
  FunctionComponent,
} from 'react';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GeneralContext from '../../contexts/GeneralContext';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import Button from '../Button';
import Form from '../Form';
import Input from '../Input';
import { customSuccessToast, customErrorToast } from '../Utils/CustomToasts';
import styles from './LoginForm.module.scss';

type LoginFormProps = {
  /** onLoginSuccess Function */
  onLoginSuccess: () => void;
};

const LoginForm: FunctionComponent<LoginFormProps> = ({ onLoginSuccess }) => {
  const { getUserState } = useContext(GeneralContext);
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmitJwtAuth = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    AuthApiService.postLogin({
      user_name: userName,
      password: password,
    })
      .then((res) => {
        customSuccessToast(`Login Successful: Welcome!! ${userName}`);
        setUsername('');
        setPassword('');
        TokenService.saveAuthToken(res.authToken);
        getUserState();
        onLoginSuccess();
      })
      .catch((res) => {
        customErrorToast(`Login Failed: ${res.error}!!`);
      });
  };

  return (
    <Form className={styles['signup-form']} onSubmit={handleSubmitJwtAuth}>
      <Input
        inputHasError={false}
        htmlFor='user_name'
        label='Username'
        placeholder='Username'
        autoComplete='username'
        type='text'
        name='user_name'
        id='user_name'
        onChangeCallback={(e) => {
          setUsername(e.target.value);
        }}
        value={userName}
      />
      <Input
        inputHasError={false}
        htmlFor='password'
        label='Password'
        placeholder='Password'
        type='password'
        autoComplete='current-password'
        name='password'
        id='password'
        onChangeCallback={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      <Button type='submit' buttonClass={styles['login-button']}>
        Log In <FontAwesomeIcon icon={faSignInAlt} />
      </Button>
    </Form>
  );
};

export default LoginForm;
