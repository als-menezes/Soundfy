import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';

class Favorites extends Component {
  state = {
    isLoading: false,
    favList: [],
  };

  componentDidMount() {
    this.setState({ isLoading: true }, async () => {
      const data = await getFavoriteSongs();
      this.setState({
        favList: data,
        isLoading: false,
      });
    });
  }

  removeFavList = (id) => {
    this.setState((prevState) => ({
      favList: prevState.favList.filter((fav) => fav.trackId !== id),
    }));
  };

  render() {
    const { isLoading, favList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading ? <Loading /> : (
          <div data-testid="page-favorites">
            <Header />
            <h2>Favorites</h2>
            <div>
              {favList
                .map((fav, index) => (
                  <MusicCard
                    key={ index }
                    track={ fav }
                    removeFavList={ this.removeFavList }
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Favorites.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default Favorites;
