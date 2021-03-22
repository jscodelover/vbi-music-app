import PropTypes from 'prop-types';
import fetch from 'node-fetch';
import Head from '../components/HeadEl';
import AlbumList from '../components/AlbumList';

const Home = ({ albums }) => (
  <>
    <Head
      title="All Songs"
      metaDescription="VBI music app - songs from all the albums"
    />
    <main>
      <AlbumList albums={albums} />
    </main>
  </>
);

export async function getStaticProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums`);
  const data = await res.json();
  return {
    props: { albums: data },
  };
}

export default Home;

Home.propTypes = {
  albums: PropTypes.array.isRequired,
};
