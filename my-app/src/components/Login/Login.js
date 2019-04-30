import React from 'react';
import Container from './Login.styles';

import ApiUrl from './../Api/Api';


class Login extends React.Component {

  /**
   * On input submit
   */

  handleFormSubmit = event => {
    event.preventDefault();
    this.login(event.target.username.value, event.target.password.value);
  }

  /**
   * Submit user credentials 
   */

  async login(username, password) {
    try {
      const response = await fetch(
        `${ApiUrl}/login`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const user = await response.json();
      localStorage.setItem('user', JSON.stringify(user));
      this.props.loggedIn();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Render component
   */

  render() {
    return (
      <Container className="user-login">
        <form action="" onSubmit={this.handleFormSubmit}>
          <label htmlFor="username">Login</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <input type="submit" value="Submit" />
        </form>
        <p><code>{`test accounts: 
          {
            john@john,
            jack@jack,
            june@june,
            jade@jade,
            jane@jane
          }`}
        </code>
        </p>
      </Container>
    )
  }
}

export default Login;