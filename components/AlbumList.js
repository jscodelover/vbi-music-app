import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SongCard from './SongCard';
import Loader from './Loader';

function AlbumList({
  albums,
  isPlaylist,
  handleAddSong,
  playlistName,
  songsInPlayList = [],
}) {
  const [selectedAlbumId, handleAlbumId] = useState('');
  const [songsData, handleAlbumDetils] = useState({});
  const [loading, handleLoading] = useState(true);

  useEffect(() => {
    async function getAlbumDetails(albumId) {
      handleLoading(true);
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/photos/${albumId}`,
      );
      const data = await res.json();
      handleLoading(false);
      handleAlbumDetils((state) => ({ ...state, [albumId]: data }));
    }
    if (selectedAlbumId && !songsData[selectedAlbumId]) {
      getAlbumDetails(selectedAlbumId);
    }
  }, [selectedAlbumId]);

  function handleAdd() {
    handleAddSong(songsData[selectedAlbumId]);
  }

  return (
    <>
      {isPlaylist ? (
        <h1>Add songs to the {playlistName} playlist</h1>
      ) : (
        <h1 className="album-heading">Albums</h1>
      )}
      <article className="album-container">
        {albums.length &&
          albums.map((album) => (
            <Fragment key={album.id}>
              <section
                className={`album ${
                  album.id === selectedAlbumId ? 'active-album' : ''
                }`}
              >
                <div className="title">{album.title}</div>
                <a
                  className="clickable"
                  onClick={() => handleAlbumId(album.id)}
                />
              </section>
              {album.id === selectedAlbumId && (
                <section className="album-details">
                  <button
                    className="close-btn"
                    onClick={() => handleAlbumId('')}
                  >
                    <img src="/images/close-icon.svg" alt="close-icon" />
                  </button>
                  <h2>
                    Songs list for <em>{album.title}</em> Album
                  </h2>
                  {loading ? (
                    <Loader />
                  ) : songsData[selectedAlbumId] ? (
                    <div className="song-card-container">
                      <SongCard
                        isPlaylist={isPlaylist}
                        song={songsData[selectedAlbumId]}
                        alreadyAdded={songsInPlayList.find(
                          ({ id }) => songsData[selectedAlbumId].id === id,
                        )}
                        handleAdd={handleAdd}
                        albumName={album.title}
                      />
                    </div>
                  ) : (
                    <div>Empty Album!!</div>
                  )}
                </section>
              )}
            </Fragment>
          ))}
      </article>
    </>
  );
}

export default AlbumList;

AlbumList.propTypes = {
  albums: PropTypes.array.isRequired,
  playlist: PropTypes.bool,
  handleAddSong: PropTypes.func,
  playlistName: PropTypes.string,
  songsInPlayList: PropTypes.array,
};
