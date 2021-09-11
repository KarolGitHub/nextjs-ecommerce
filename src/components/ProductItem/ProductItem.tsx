import React from 'react';
import Link from 'next/link';

import { currencySymbol } from '../../utils/sharedVariables';
import { useGlobalState } from '../../context/GlobalState';
import { addToCart } from '../../store/Actions';

type Props = {
  product: ProductData;
};

const ProductItem: React.FC<Props> = ({ product }) => {
  const { state, dispatch } = useGlobalState();
  const { cart } = state;

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product }, cart));

    const cartCount = document.getElementById('cart-count') as any;
    cartCount.style.animation = 'scale 0.3s ease-in';
    setTimeout(function () {
      cartCount.style.animation = '';
    }, 300);
  };

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img
        src={product.imageUrl}
        className="card-img-top"
        alt={product.title}
      />

      <div className="card-body">
        <h5 className="card-title text-capitalize">{product.title}</h5>

        <div className="row justify-content-between mx-0 flex-nowrap">
          <h6 className="text-danger w-auto p-0">{`${
            currencySymbol[product.currency]
          }${product.price}`}</h6>

          {!!product.quantity ? (
            <h6 className="text-danger w-auto p-0">
              In Stock: {product.quantity}
            </h6>
          ) : (
            <h6 className="text-danger w-auto p-0">Out of Stock</h6>
          )}
        </div>

        <p className="card-text">{product.description}</p>

        <div className="row justify-content-between mx-0">
          <Link href={`/product/${product._id}`}>
            <a className="btn btn-info" style={{ marginRight: '5px', flex: 1 }}>
              View
            </a>
          </Link>

          <button
            className="btn btn-success"
            style={{ marginLeft: '5px', flex: 1 }}
            onClick={addToCartHandler}
            disabled={!product.quantity}>
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
