import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class Login extends Component {
  state = {
    username: '',
    isLoading: false,
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { username } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: username });
    history.push('/search');
  };

  render() {
    const { username, isLoading } = this.state;
    const MIN_LTGH = 3;
    return (
      <div data-testid="page-login">
        <form>
          <input
            data-testid="login-name-input"
            type="text"
            name="username"
            value={ username }
            onChange={ ({ target }) => this.setState({ username: target.value }) }
          />
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ username.length < MIN_LTGH ? true : null }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
          { isLoading ? <Loading /> : false }
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  match: PropTypes.objectOf(
    PropTypes.string,
  ),
}.isRequired;

export default Login;
