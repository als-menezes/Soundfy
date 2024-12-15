import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class Profile extends Component {
  state = {
    user: {},
    isLoading: false,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      user,
    });
  }

  render() {
    const { isLoading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          isLoading ? <Loading /> : (
            <>
              <img data-testid="profile-image" alt="perfil" src={ user.image } />
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p>{user.description}</p>
              <Link to="/profile/edit">Editar perfil</Link>
            </>
          )
        }
      </div>
    );
  }
}

export default Profile;
