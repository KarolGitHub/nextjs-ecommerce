import React, { useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { BasicLayout, Filter, ProductItem } from '../components';
import { getData } from '../utils/fetchData';
import { fetchProductsLimit, uniqueKeyValues } from '../utils/shared';
import filterSearch from '../utils/filterSearch';
import { useGlobalState } from '../context/GlobalState';
import { useWindowSize } from '../hooks';

type Props = {
  products: ProductData[];
  result: number;
  page: number;
  limit: number;
};

const Home: React.FC<Props> = (props) => {
  const [products, setProducts] = useState(props.products);
  const [categories, setCategories] = useState<Category[]>([]);

  const { dispatch } = useGlobalState();

  const loadMoreRef = useRef(null);
  const router = useRouter();

  const { width } = useWindowSize();
  const limit = fetchProductsLimit(width);

  const loadMoreHandler = () => {
    filterSearch({ router, limit, page: +props.page + 1 });
  };

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
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.01,
    };

    const observerHandler: IntersectionObserverCallback = (entities) => {
      const target = entities[0];
      if (target.isIntersecting) {
        filterSearch({ router, limit, page: +props.page + 1 });
      }
    };

    const observer = new IntersectionObserver(observerHandler, options);
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [limit, props.page, router]);

  return (
    <BasicLayout className="home-page">
      <Head>
        <title>Home Page</title>
      </Head>

      <Filter categories={categories} limit={limit} />

      {props.result ? (
        <div className="products">
          {products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <Image
            src="/no-products.svg"
            alt="No Products found"
            width="100"
            height="100"
          />
          <h2 className="text-center">No products found</h2>
        </div>
      )}
      {props.result >= +props.page * +props.limit ? (
        <button
          className="btn btn-outline-info d-block mx-auto mb-4"
          ref={loadMoreRef}
          onClick={loadMoreHandler}>
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
      page: page,
      limit: limit,
    },
  };
};

export default Home;
