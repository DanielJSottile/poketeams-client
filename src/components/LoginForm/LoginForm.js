import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import AuthApiService from '../../services/auth-api-service';

export default class LoginForm extends Component {

  static contextType = UserContext;

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
      this.context.getUserState()
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
          <label htmlFor="user_name">Username</label>
          <input placeholder="Username" autoComplete="username" type="text" name="user_name" id="user_name" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" autoComplete="current-password" name="password" id="password" />
        </div>
        <button type="submit">Log In <i className="fas fa-sign-in-alt"></i></button>
        <p>Not A Member? </p>
        <Link to='/register'>Register Here:</Link>
      </form>
    );
  };
};

