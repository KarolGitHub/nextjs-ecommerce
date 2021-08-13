import React from 'react';
import Head from 'next/head';

import { BasicLayout, Seo } from '../components';

const Products: React.FC = () => {
  return (
    <BasicLayout className="products">
      <Head>
        <Seo />
      </Head>
    </BasicLayout>
  );
};

export default Products;
