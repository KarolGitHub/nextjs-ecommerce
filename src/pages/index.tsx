import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { BasicLayout, Filter, ProductItem } from '../components';
import { getData } from '../utils/fetchData';
import { uniqueKeyValues } from '../utils/shared';
import filterSearch from '../utils/filterSearch';
import { useGlobalState } from '../context/GlobalState';

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
    if (Object.keys(router.query).length === 0) setPage(1);
  }, [router.query]);

  const handleLoadmore = () => {
    setPage(page + 1);
    filterSearch({ router, page: page + 1 });
  };

  return (
    <BasicLayout className="home-page">
      <Head>
        <title>Home Page</title>
      </Head>

      <Filter categories={categories} />

      <div className="products">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        ) : (
          <h2>No Products</h2>
        )}
      </div>

      {props.result < page * 6 ? (
        ''
      ) : (
        <button
          className="btn btn-outline-info d-block mx-auto mb-4"
          onClick={handleLoadmore}>
          Load more
        </button>
      )}
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = query.page || 1;
  const category = query.category || 'all';
  const sort = query.sort || '';
  const search = query.search || 'all';

  const res = await getData(
    `product?limit=${
      +page * 6
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
