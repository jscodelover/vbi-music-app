import Head from '../components/HeadEl';
import Link from 'next/link';

const FourOhFour = () => (
  <>
    <Head title="404 - Not Found" metaDescription="Page not found" />
    <section className="container">
      <article className="fourohfour-container">
        <div className="fourohfour-code">
          <h1>404</h1>
        </div>
        <div className="fourohfour-msg">
          <h4>Something&apos;s missing...</h4>
          <p>Page not found</p>
          <span>
            &lt;{' '}
            <Link href="/">
              <a>Go back</a>
            </Link>
          </span>
        </div>
      </article>
    </section>
  </>
);

export default FourOhFour;
