import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { parseCookies, setCookie } from 'nookies';
import Head from '../components/HeadEl';
import AlbumList from '../components/AlbumList';
import PlaylistForm from '../components/PlaylistForm';
import PlaylistCard from '../components/PlaylistCard';
import ListDetail from '../components/ListDetail';

const Playlist = ({ albums }) => {
  const [createPlaylist, handleCreate] = useState(false);
  const [playlists, handlePlaylists] = useState(initialValue());
  const [showPlaylist, handleShowPlaylist] = useState('');
  const [addSong, handleAdd] = useState('');
  const [error, handleError] = useState('');

  function initialValue() {
    const { playlistArray } = parseCookies();
    if (playlistArray) {
      return JSON.parse(playlistArray);
    }
    return {};
  }

  useEffect(() => {
    if (Object.keys(playlists)) {
      setCookie(null, 'playlistArray', JSON.stringify({ ...playlists }), {
        maxAge: 30 * 24 * 60 * 60,
      });
    }
  }, [playlists]);

  function handleSubmit(name) {
    if (
      name &&
      Object.keys(playlists).every(
        (listname) => listname.toLowerCase() !== name.toLowerCase(),
      )
    ) {
      error && handleError('');
      handlePlaylists((state) => ({
        ...state,
        [name]: { ids: [], createdAt: new Date() },
      }));
      handleCreate(false);
    } else {
      handleError(
        !name ? 'Required Field!!' : 'Playlist with this name already exist!!',
      );
    }
  }

  function removePlaylist(name) {
    const newPlaylist = { ...playlists };
    delete newPlaylist[name];
    handlePlaylists(newPlaylist);
  }

  function editPlaylist(data) {
    const playlist = { ...playlists[showPlaylist] };
    handlePlaylists((state) => ({
      ...state,
      [showPlaylist]: { ...playlist, ids: [...playlist.ids, data] },
    }));
  }

  function handleRemoveSong(songId) {
    const playlist = { ...playlists[showPlaylist] };
    handlePlaylists((state) => ({
      ...state,
      [showPlaylist]: {
        ...playlist,
        ids: playlist.ids.filter(({ id }) => id !== songId),
      },
    }));
  }

  function handleBack() {
    if (addSong) {
      handleAdd('');
    } else {
      handleShowPlaylist('');
    }
  }

  return (
    <main>
      <Head title="My Playlist" metaDescription="VBI music app - my playlist" />
      {addSong || showPlaylist ? (
        <div className={`back-btn ${addSong ? 'album-back-btn' : ''}`}>
          <button onClick={handleBack}>Go back to playlist</button>
        </div>
      ) : null}
      {addSong ? (
        <AlbumList
          isPlaylist
          albums={albums}
          songsInPlayList={playlists[showPlaylist].ids}
          handleAddSong={editPlaylist}
          playlistName={showPlaylist}
        />
      ) : (
        <>
          <div className="heading">
            <h1>{showPlaylist ? showPlaylist : 'My Playlist'}</h1>
            {!showPlaylist && (
              <button
                onClick={() => {
                  handleCreate(true);
                  handleError('');
                }}
              >
                + Create Playlist
              </button>
            )}
          </div>

          {createPlaylist && (
            <PlaylistForm
              error={error}
              handleClose={() => handleCreate(false)}
              handleSubmit={handleSubmit}
            />
          )}
          {showPlaylist ? (
            <ListDetail
              handleAdd={() => handleAdd(showPlaylist)}
              deleteSongs={handleRemoveSong}
              songs={playlists[showPlaylist].ids}
              albums={albums}
            />
          ) : (
            <section className="playlistCard-container">
              {Object.keys(playlists).map((label) => (
                <PlaylistCard
                  key={label}
                  name={label}
                  createdOn={playlists[label].createdAt}
                  handleDelete={() => removePlaylist(label)}
                  handleDetail={() => handleShowPlaylist(label)}
                />
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
};

export async function getStaticProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums`);
  const data = await res.json();
  return {
    props: { albums: data },
  };
}

export default Playlist;

Playlist.propTypes = {
  albums: PropTypes.array.isRequired,
};
