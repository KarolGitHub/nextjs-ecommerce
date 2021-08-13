import React from 'react';
import Head from 'next/head';

import { BasicLayout, Seo } from '../components';

const Cart: React.FC = () => {
  return (
    <BasicLayout className="cart">
      <Head>
        <Seo title="Cart" />
        <h1>Cart</h1>
      </Head>
    </BasicLayout>
  );
};

export default Cart;
