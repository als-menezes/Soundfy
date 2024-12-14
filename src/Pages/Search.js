import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../Components/Loading';

class Search extends Component {
  state = {
    searchInput: '',
    isLoading: false,
    searchResults: [],
    artist: '',
  };

  handleSearchButton = async () => {
    const { searchInput } = this.state;
    this.setState({
      artist: searchInput,
      searchInput: '',
      isLoading: true });
    const results = await searchAlbumsAPI(searchInput);
    this.setState({ searchResults: results, isLoading: false });
  };

  render() {
    const { searchInput, isLoading, searchResults, artist } = this.state;
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

          { isLoading
            ? <Loading />
            : (
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={ searchInput.length < 2 ? true : null }
                onClick={ this.handleSearchButton }
              >
                Pesquisar
              </button>
            ) }
        </form>
        {searchResults && searchResults.length > 0
          ? (
            <>
              <h1>{`Resultado de álbuns de: ${artist}`}</h1>
              {searchResults.map((band, index) => (
                <Link
                  key={ index }
                  to={ `/album/${band.collectionId}` }
                  data-testid={ `link-to-album-${band.collectionId}` }
                >
                  <img src={ band.artworkUrl100 } alt={ band.collectionName } />
                  <h2>{band.collectionName}</h2>
                  <h3>{band.artistName}</h3>

                </Link>
              ))}
            </>
          )
          : <h1>Nenhum álbum foi encontrado</h1>}
      </div>
    );
  }
}

export default Search;
