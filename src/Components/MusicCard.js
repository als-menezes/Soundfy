import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    isLoading: false,
    isChecked: false,
  };

  handleCheck = ({ target: { checked } }) => {
    if (checked) {
      this.setState({ isChecked: checked }, this.handleChange);
    }
  };

  handleChange(checked) {
    this.setState({ isLoading: true }, async () => {
      await addSong(checked);
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isChecked } = this.state;
    return (
      <div>
        {isLoading ? <Loading /> : (
          <>
            <h2>{trackName}</h2>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ trackId }>
              <p>Favorita</p>
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                id={ trackId }
                onChange={ this.handleCheck }
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
