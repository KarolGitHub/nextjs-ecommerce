import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { BasicLayout, ProductItem, Seo } from '../components';
import { getData } from '../utils/fetchData';

type Props = {
  products: ProductData[];
};

const Home: React.FC<Props> = (props) => {
  const [products, setProducts] = useState(props.products);

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  return (
    <BasicLayout className="home">
      <Head>
        <Seo />
      </Head>
      <div className="products">
        {!products.length ? (
          <h2>No Products</h2>
        ) : (
          products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        )}
      </div>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await getData('product');
  return {
    props: {
      products: response.products,
    },
  };
};

export default Home;
