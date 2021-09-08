import React from 'react';
import Head from 'next/head';

import { BasicLayout } from '../components';

const Products: React.FC = () => {
  return (
    <BasicLayout className="products-page">
      <Head>
        <title>Products Page</title>
      </Head>
    </BasicLayout>
  );
};

export default Products;
