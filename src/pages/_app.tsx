import { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '@/components/common/Layout';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

/**
 * Icons used in this project are provided by react-icons library.
 * react-icons includes several icon libraries and here are the ones used in this project:
 *
 * "Simple Icons" (si): https://simpleicons.org/
 * "Bootstrap Icons" (bs): https://icons.getbootstrap.com/
 * "Grommet-Icons" (gr): https://icons.grommet.io/
 * "Material Design Icons" (md): https://materialdesignicons.com/
 * "Feather" (fi): https://feathericons.com/
 *
 * Please visit the respective websites for more information about each icon and their usage policies.
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Special Legends: Smash Legends Statistics</title>
      </Head>
      <Analytics />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
