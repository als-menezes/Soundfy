import React, { Component } from 'react';
import Header from '../Components/Header';

class Search extends Component {
  state = {
    searchInput: '',
  };

  render() {
    const { searchInput } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            placeholder="nome da banda ou artista"
            data-testid="search-artist-input"
            value={ searchInput }
            onChange={ ({ target }) => this.setState({ searchInput: target.value }) }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ searchInput.length < 2 ? true : null }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
