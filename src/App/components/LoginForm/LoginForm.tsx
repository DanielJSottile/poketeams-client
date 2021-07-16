import React, {
  useContext,
  useState,
  FormEvent,
  FunctionComponent,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import Input from '../Input';
import Button from '../Button';
import TokenService from '../../services/token-service';
import GeneralContext from '../../contexts/GeneralContext';
import AuthApiService from '../../services/auth-api-service';
import styles from './LoginForm.module.scss';

type LoginFormProps = {
  /** onLoginSuccess Function */
  onLoginSuccess: () => void;
};

const LoginForm: FunctionComponent<LoginFormProps> = ({ onLoginSuccess }) => {
  const { getUserState } = useContext(GeneralContext);
  const [error, setError] = useState(null);
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmitJwtAuth = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setError(null);

    AuthApiService.postLogin({
      user_name: userName,
      password: password,
    })
      .then((res) => {
        setUsername('');
        setPassword('');
        TokenService.saveAuthToken(res.authToken);
        getUserState();
        onLoginSuccess();
      })
      .catch((res) => {
        setError(res.error);
      });
  };

  return (
    <form className={styles['signup-form']} onSubmit={handleSubmitJwtAuth}>
      <div role="alert">
        {error && (
          <p className={styles['error-login shake-horizontal']}>{error}</p>
        )}
      </div>
      <Input
        inputHasError={false}
        htmlFor="user_name"
        label="Username"
        placeholder="Username"
        autoComplete="username"
        type="text"
        name="user_name"
        id="user_name"
        onChangeCallback={(e) => {
          setUsername(e.target.value);
        }}
        value={userName}
      />
      <Input
        inputHasError={false}
        htmlFor="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        name="password"
        id="password"
        onChangeCallback={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      <Button type="submit">
        Log In <FontAwesomeIcon icon={faSignInAlt} />
      </Button>
    </form>
  );
};

export default LoginForm;
