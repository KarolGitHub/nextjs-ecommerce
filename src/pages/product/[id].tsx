import React from 'react';
import Head from 'next/head';
import { useState } from 'react';

import { getData } from '../../utils/fetchData';
import { BasicLayout } from '../../components';
import { GetServerSideProps } from 'next';
import { currencySymbol } from '../../utils/sharedVariables';
import { useGlobalState } from '../../context/GlobalState';
import { addToCart } from '../../store/Actions';

type Props = {
  product: ProductData;
};

const DetailProduct: React.FC<Props> = (props) => {
  const [product] = useState(props.product);

  const { state, dispatch } = useGlobalState();
  const { cart } = state;

  return (
    <BasicLayout className="home">
      <Head>
        <title>{product.title}</title>
      </Head>
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="d-block img-thumbnail rounded mt-4 w-100"
          />
        </div>
        <div className="col-md-6 mt-3">
          <h2 className="text-uppercase">{product.title}</h2>
          <h5 className="text-danger">{`${currencySymbol[product.currency]}${
            product.price
          }`}</h5>
          <div className="row mx-0 d-flex justify-content-between">
            {!!product.quantity ? (
              <h6 className="text-danger w-auto p-0">
                In Stock: {product.quantity}
              </h6>
            ) : (
              <h6 className="text-danger w-auto p-0">Out of Stock</h6>
            )}
            <h6 className="text-danger w-auto p-0">Sold: {product.sold}</h6>
          </div>
          <div className="my-2 w-auto">{product.description}</div>
          <button
            type="button"
            className="btn btn-dark d-block my-3 px-5"
            onClick={() => dispatch(addToCart(product, cart))}
            disabled={!product.quantity}>
            Buy
          </button>
        </div>
      </div>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await getData(`product/${context.params?.id}`);

  return {
    props: {
      product: response.product,
    },
  };
};

export default DetailProduct;
