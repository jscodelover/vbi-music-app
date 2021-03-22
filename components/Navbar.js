import ActiveLink from './ActiveLink';

function Navbar() {
  return (
    <section className="nav-container">
      <div className="app-name">vbi-music.io</div>
      <nav className="nav-list-container">
        <ul className="nav-list">
          <li>
            <ActiveLink href="/" activeClassName="active">
              <a title="Go to All Songs">All Songs</a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink href="/playlist" activeClassName="active">
              <a title="Go to Playlist">Playlist</a>
            </ActiveLink>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Navbar;
