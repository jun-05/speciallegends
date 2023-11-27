import { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '@/components/common/Layout';
import Head from 'next/head';
import { LanguageProvider } from '@/context/LanguageContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Special Legends</title>
      </Head>
      <LanguageProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LanguageProvider>
    </>
  );
}

export default MyApp;
