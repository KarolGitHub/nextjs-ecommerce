import Head from 'next/head';

import { BasicLayout, Seo } from '../components';

const Cart = (): JSX.Element => {
  return (
    <BasicLayout>
      <Head>
        <Seo title="Cart" />
        <h1>Cart</h1>
      </Head>
    </BasicLayout>
  );
};

export default Cart;
