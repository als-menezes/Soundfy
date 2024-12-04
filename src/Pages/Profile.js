import React, { Component } from 'react';
import Header from '../Components/Header';

class Profile extends Component {
  state = { };

  render() {
    return (
      <div data-testid="page-profile">
        <Header />
      </div>
    );
  }
}

export default Profile;
