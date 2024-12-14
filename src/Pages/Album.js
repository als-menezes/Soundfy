import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

class Album extends Component {
  state = {
    album: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const trackList = response.filter((song) => song.trackId);
    this.setState({
      album: trackList,
    });
  }

  render() {
    const { album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">{album[0]?.artistName}</h3>
        <h3 data-testid="album-name">{album[0]?.collectionName}</h3>
        {album.map((song, index) => (
          <MusicCard
            key={ index }
            { ...song }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(
    PropTypes.string,
  ),
}.isRequired;

export default Album;
