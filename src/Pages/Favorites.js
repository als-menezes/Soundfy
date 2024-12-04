import React, { Component } from 'react';
import Header from '../Components/Header';

class Favorites extends Component {
  state = { };

  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
      </div>
    );
  }
}

export default Favorites;
