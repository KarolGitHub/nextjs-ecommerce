import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { GlobalStateProvider } from '../context/GlobalState';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <GlobalStateProvider>
      <Component {...pageProps} />
    </GlobalStateProvider>
  );
}
export default MyApp;
