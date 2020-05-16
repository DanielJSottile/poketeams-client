import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSucess: () => {}
  };

  state = {error: null}

  handleSubmitJwtAuth = ev => {
    ev.preventDefault();
    this.setState({error: null});
    const { user_name, password } = ev.target

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
    .then(res => {
      user_name.value = ''
      password.value = ''
      TokenService.saveAuthToken(res.authToken)
      this.props.onLoginSuccess()
    })
    .catch(res => {
      this.setState({error: res.error})
    })
  }

  render() {
    const { error } = this.state;

    return (
      <form className="signup-form"
      onSubmit={this.handleSubmitJwtAuth}
      >
        <div role='alert'>{error && <p className='red'>{error}</p>}</div>
        <div>
          <label htmlFor="username">Username</label>
          <input placeholder="Username" type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button type="submit">Log In</button>
      </form>
    );
  };
};

