import { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  // return (
  //   <Layout>
  //     <Component {...pageProps} />
  //   </Layout>
  // );
  return <Component {...pageProps} />;
}

export default MyApp;
