import React, { Component } from 'react';
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
      </header>
    );
  }
}

export default Header;
