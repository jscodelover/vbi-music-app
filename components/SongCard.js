import PropTypes from 'prop-types';

function SongCard({
  song,
  albumName,
  deleteSongs,
  isPlaylist = false,
  handleAdd,
  alreadyAdded,
}) {
  return (
    <section className="song-card">
      <img className="song-img" src={song.thumbnailUrl} alt="song image" />
      <div className="song-detail">
        <div className="font-medium">{song.title}</div>
        <div className="font-small">Album Name: {albumName}</div>
        <div className="font-small">Song Singer</div>
      </div>
      <div className="song-action-btn">
        <p className="font-medium">3:24s</p>
        {isPlaylist &&
          (!alreadyAdded ? (
            <button className="primary-btn" onClick={handleAdd}>
              Add to Playlist
            </button>
          ) : (
            <p className="font-medium theme-red">Already Exist</p>
          ))}
        {deleteSongs && (
          <button onClick={() => deleteSongs(song.id)}>
            <img src="/images/delete-icon.svg" alt="delete-icon" />
          </button>
        )}
      </div>
    </section>
  );
}

export default SongCard;

SongCard.propTypes = {
  song: PropTypes.object,
  albumName: PropTypes.string,
  deleteSongs: PropTypes.func,
  isPlaylist: PropTypes.bool,
  handleAdd: PropTypes.func,
};
