import React from 'react';
import Head from 'next/head';

import { BasicLayout, Seo } from '../components';

const Home: React.FC = () => {
  return (
    <BasicLayout className="home">
      <Head>
        <Seo />
      </Head>
    </BasicLayout>
  );
};

export default Home;
