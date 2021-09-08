import React from 'react';
import Head from 'next/head';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';

import { getData } from '../../utils/fetchData';
import { BasicLayout } from '../../components';
import { currencySymbol } from '../../utils/sharedVariables';
import { useGlobalState } from '../../context/GlobalState';
import { addToCart } from '../../store/Actions';

type Props = {
  product: ProductData;
};

const DetailProduct: React.FC<Props> = (props) => {
  const [product] = useState(props.product);
  const [imgIndex, setImgIndex] = useState(0);

  const { state, dispatch } = useGlobalState();
  const { cart } = state;

  const isImgActive = (index: number) => (imgIndex === index ? 'active' : '');
  const imgStyles = [
    { filter: 'sepia(30%)' },
    { filter: 'saturate(60%)' },
    { filter: 'contrast(200%)' },
    { filter: 'grayscale(100%)' },
    { filter: 'hue-rotate(185deg)' },
  ];
  const imgArray = [...new Array(5)].map(() => product.imageUrl);

  const router = useRouter();

  const [amount, setAmount] = useState(1);

  const changeAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAmount(+e.target.value);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, amount: amount }, cart));
    return router.push('/cart');
  };

  return (
    <BasicLayout className="product-page">
      <Head>
        <title>{product.title}</title>
      </Head>

      <div className="row">
        <div className="col-md-6">
          <img
            src={product.imageUrl}
            alt={product.imageUrl}
            className="d-block img-thumbnail rounded mt-4 w-100"
            style={{ height: '350px', ...imgStyles[imgIndex] }}
          />

          <div className="row mx-0" style={{ cursor: 'pointer' }}>
            {imgArray.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={imgUrl}
                className={`img-thumbnail rounded ${isImgActive(index)}`}
                style={{ height: '80px', width: '20%', ...imgStyles[index] }}
                onClick={() => setImgIndex(index)}
              />
            ))}
          </div>
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

          <div className="input-group flex-nowrap" style={{ width: '200px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              disabled={amount < 2}
              onClick={() => setAmount(amount - 1)}>
              <i className="fas fa-minus" />
            </button>

            <input
              type="number"
              min={1}
              max={product.quantity}
              className="form-control text-center"
              style={{ width: '100px' }}
              value={amount}
              onChange={changeAmountHandler}
            />

            <button
              type="button"
              className="btn btn-secondary ml-3"
              disabled={amount == product.quantity}
              onClick={() => setAmount(amount + 1)}>
              <i className="fas fa-plus" />
            </button>
          </div>

          <button
            type="button"
            className="btn btn-dark d-block my-3 px-5"
            disabled={!product.quantity}
            onClick={addToCartHandler}>
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
