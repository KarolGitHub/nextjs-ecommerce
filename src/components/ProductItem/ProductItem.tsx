import React from 'react';
import Link from 'next/link';

type Props = {
  product: ProductData;
};

const ProductItem: React.FC<Props> = ({ product }) => {
  const currencySymbol = {
    EUR: '€',
    GBP: '£',
    USD: '$',
    PLN: 'zł',
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
          <h6 className="text-danger w-auto">{`${
            currencySymbol[product.currency]
          }${product.price}`}</h6>
          {product.status === 'Available' ? (
            <h6 className="text-danger w-auto">In Stock: {product.quantity}</h6>
          ) : (
            <h6 className="text-danger w-auto">Out of stock</h6>
          )}
        </div>
        <p className="card-text">{product.description}</p>
        <div className="row justify-content-between mx-0">
          <Link href={`product/${product.id}`}>
            <a className="btn btn-info" style={{ marginRight: '5px', flex: 1 }}>
              View
            </a>
          </Link>
          <button
            className="btn btn-success"
            style={{ marginLeft: '5px', flex: 1 }}
            disabled={!product.quantity}>
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
