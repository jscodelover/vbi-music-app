import Head from 'next/head';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Navbar from '../components/Navbar';
import '../styles/globals.scss';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://fonts.googleapis.com/css?family=Archivo+Black&display=swap"
        rel="stylesheet"
      ></link>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar />
    <Component {...pageProps} />
  </>
);

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};
