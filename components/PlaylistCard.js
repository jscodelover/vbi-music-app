import PropTypes from 'prop-types';
import { format } from 'date-fns';

function PlaylistCard({ name, createdOn, handleDetail, handleDelete }) {
  return (
    <section className="playlistCard">
      <div>{name}</div>
      <div className="created-date">
        Created on: {format(new Date(createdOn), `dd/MM/yyyy`)}
      </div>
      <button onClick={handleDelete} className="click-btn">
        <img src="/images/delete-icon.svg" alt="delete-icon" />
      </button>
      <a className="clickable" onClick={handleDetail} />
    </section>
  );
}

export default PlaylistCard;

PlaylistCard.propTypes = {
  name: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
