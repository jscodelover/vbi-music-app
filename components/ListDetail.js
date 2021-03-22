import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SongCard from './SongCard';

function ListDetail({ handleAdd, deleteSongs, songs, albums }) {
  const [songsList, handleSongs] = useState([...songs]);

  useEffect(() => {
    handleSongs(songs);
  }, [songs]);

  function getAlbumTitle(id) {
    return albums.find((album) => album.id === id).title;
  }
  function handleShuffle() {
    const updatedArray = [...songsList];

    let currentIndex = updatedArray.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = updatedArray[currentIndex];
      updatedArray[currentIndex] = updatedArray[randomIndex];
      updatedArray[randomIndex] = temporaryValue;
    }
    handleSongs(updatedArray);
  }
  return (
    <>
      <button
        className={`primary-btn shuffle-btn ${
          songsList.length > 1 ? '' : 'disable-btn'
        }`}
        onClick={handleShuffle}
      >
        Shuffle Play
      </button>

      <button className="primary-btn" onClick={handleAdd}>
        Add a Song
      </button>
      <div className="song-card-container">
        {songsList.length ? (
          songsList.map((song) => (
            <SongCard
              song={song}
              deleteSongs={deleteSongs}
              albumName={getAlbumTitle(song.id)}
            />
          ))
        ) : (
          <div>No songs!!</div>
        )}
      </div>
    </>
  );
}

export default ListDetail;

ListDetail.propTypes = {
  handleAdd: PropTypes.func.isRequired,
  deleteSongs: PropTypes.func.isRequired,
  songs: PropTypes.array.isRequired,
  albums: PropTypes.array.isRequired,
};
