import React, { Component } from 'react';
import Header from '../Components/Header';

class Album extends Component {
  state = { };

  render() {
    return (
      <div data-testid="page-album">
        <Header />
      </div>
    );
  }
}

export default Album;
