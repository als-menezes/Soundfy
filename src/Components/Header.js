import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    user: '',
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.setState(
      async () => {
        const user = await getUser();
        this.setState({ user: user.name, isLoading: false });
      },
    );
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading ? <Loading /> : null}
        <h2 data-testid="header-user-name">{ user }</h2>
        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  match: PropTypes.objectOf(
    PropTypes.string,
  ),
}.isRequired;

export default Header;
