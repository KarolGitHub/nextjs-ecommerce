import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { BasicLayout, Filter, ProductItem } from '../components';
import { getData } from '../utils/fetchData';
import { uniqueKeyValues } from '../utils/shared';
import filterSearch from '../utils/filterSearch';
import { useGlobalState } from '../context/GlobalState';
import { useWindowSize } from '../hooks';

type Props = {
  products: ProductData[];
  result: number;
};

const Home: React.FC<Props> = (props) => {
  const [products, setProducts] = useState(props.products);
  const [categories, setCategories] = useState<Category[]>([]);

  const { dispatch } = useGlobalState();

  const [page, setPage] = useState(1);
  const router = useRouter();

  const { width } = useWindowSize();

  useEffect(() => {
    getData('product').then((res) => {
      if (res.err) {
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
      }
      const uniqueCategories = uniqueKeyValues(res.products, 'category').map(
        (category, index) => ({
          id: index + '',
          title: category,
        })
      );
      setCategories(uniqueCategories);
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  useEffect(() => {
    if (!Object.keys(router.query).length) {
      setPage(1);
    }
  }, [router.query]);

  const handleLoadmore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage((prevState) => ++prevState);
    filterSearch({ router, width, page: page + 1 });
  };

  useEffect(() => console.log(width));

  return (
    <BasicLayout className="home-page">
      <Head>
        <title>Home Page</title>
      </Head>

      <Filter categories={categories} width={width} />

      <div className="products">
        {products.length ? (
          products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        ) : (
          <h2 className="text-center">No Products</h2>
        )}
      </div>

      {props.result ? (
        <button
          className="btn btn-outline-info d-block mx-auto mb-4"
          onClick={handleLoadmore}>
          Load more
        </button>
      ) : (
        ''
      )}
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { page = 1, category = 'all', sort = '', search = 'all', limit = 8 },
}) => {
  const res = await getData(
    `product?limit=${
      +page * +limit
    }&category=${category}&sort=${sort}&title=${search}`
  );

  return {
    props: {
      products: res.products,
      result: res.result,
    },
  };
};

export default Home;
