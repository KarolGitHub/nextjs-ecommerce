import React from 'react';
import Head from 'next/head';

import { BasicLayout } from '../components';
import { useGlobalState } from '../context/GlobalState';

const Cart: React.FC = () => {
  const { state } = useGlobalState();
  const { cart } = state;

  return (
    <BasicLayout className="cart">
      <Head>
        <title>Cart Page</title>
      </Head>
      {cart.length ? <h1>Cart</h1> : <h1>Your cart is empty</h1>}
    </BasicLayout>
  );
};

export default Cart;
