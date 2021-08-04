import Head from 'next/head';
import { BasicLayout, Seo } from '../components';

const Products = (): JSX.Element => {
  return (
    <BasicLayout className="products">
      <Head>
        <Seo />
      </Head>
    </BasicLayout>
  );
};

export default Products;
