import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    isLoading: false,
    isChecked: false,
  };

  componentDidMount() {
    this.favoriteMusic();
  }

  handleChange() {
    const { track, removeFavList } = this.props;
    const { check } = this.state;
    this.setState({ isLoading: true }, async () => {
      if (check) {
        await addSong(track);
      } else {
        await removeSong(track);
        if (removeFavList) removeFavList(track.trackId);
        this.setState({ isLoading: false });
      }
    });
  }

  onCheckedChange = ({ target }) => {
    const { checked } = target;
    this.setState(
      { check: checked },
      this.handleChange,
    );
  };

  favoriteMusic = async () => {
    const { track } = this.props;
    const favorite = await getFavoriteSongs();
    this.setState({
      isChecked: favorite.some((fav) => fav.trackName === track.trackName),
    });
  };

  render() {
    const { track } = this.props;
    const { isLoading, isChecked } = this.state;
    return (
      <div>
        {isLoading ? <Loading /> : (
          <>
            <h2>{track.trackName}</h2>
            <audio data-testid="audio-component" src={ track.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o trackemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ track.trackId }>
              <p>Favorita</p>
              <input
                data-testid={ `checkbox-music-${track.trackId}` }
                type="checkbox"
                id={ track.trackId }
                onChange={ this.onCheckedChange }
                checked={ isChecked }
              />
            </label>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
