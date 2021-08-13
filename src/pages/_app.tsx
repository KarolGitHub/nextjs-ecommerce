import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { NotifyProvider } from '../context/Notify';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <NotifyProvider>
      <Component {...pageProps} />
    </NotifyProvider>
  );
}
export default MyApp;
