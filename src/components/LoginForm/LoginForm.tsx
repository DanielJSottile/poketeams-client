import React, { useContext, useState } from 'react';
import TokenService from '../../services/token-service';
import GeneralContext from '../../contexts/GeneralContext';
import AuthApiService from '../../services/auth-api-service';
import './LoginForm.scss';

// Component

const LoginForm = (props: any) => {

  // Set Context

  const GenCon = useContext(GeneralContext);

  // Set State

  const [state, setState] = useState({ error: null });

  // JWT Auth Functionality

  const handleSubmitJwtAuth = (ev: any) => {
    ev.preventDefault();
    setState((oldVals) => ({ ...oldVals, error: null }));
    const { user_name, password } = ev.target;

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then((res: any) => {
        user_name.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        GenCon.getUserState();
        props.onLoginSuccess();
      })
      .catch((res) => {
        setState((oldVals) => ({ ...oldVals, error: res.error }));
      });
  };

  // Final Render

  return (
    <form className="signup-form" onSubmit={handleSubmitJwtAuth}>
      <div role="alert">
        {state.error && (
          <p className="error-login shake-horizontal">{state.error}</p>
        )}
      </div>
      <div>
        <label htmlFor="user_name">Username</label>
        <input
          placeholder="Username"
          autoComplete="username"
          type="text"
          name="user_name"
          id="user_name"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          autoComplete="current-password"
          name="password"
          id="password"
        />
      </div>
      <button type="submit">
        Log In <i className="fas fa-sign-in-alt"></i>
      </button>
    </form>
  );
};

export default LoginForm;
