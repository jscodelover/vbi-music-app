import Head from 'next/head';
import PropTypes from 'prop-types';

const HeadEl = ({ title = 'Welcome', metaDescription = 'Welcome Page' }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={metaDescription} />
  </Head>
);

export default HeadEl;

HeadEl.propTypes = {
  title: PropTypes.string,
  metaDescription: PropTypes.string,
};
