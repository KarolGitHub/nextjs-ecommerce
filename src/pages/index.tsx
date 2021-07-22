import Head from 'next/head';

import { BasicLayout, Seo } from '../components';

const Home = (): JSX.Element => {
  return (
    <BasicLayout>
      <Head>
        <Seo />
      </Head>
    </BasicLayout>
  );
};

export default Home;
