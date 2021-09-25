import Link from 'next/link';
import React from 'react';

import { decreaseItemAmount, increaseItemAmount } from '../../store/Actions';
import { currencySymbol } from '../../utils/shared';

type Props = {
  item: ProductData;
  dispatch: Dispatch;
  cart: ProductData[];
};

const CartItem: React.FC<Props> = ({ item, dispatch, cart }) => {
  return (
    <tr className="row card mb-3">
      <td className="d-flex sm:flex-nowrap">
        <div className="mx-2" style={{ minWidth: '40px', maxWidth: '100px' }}>
          <img
            src={item.imageUrl}
            alt={item.imageUrl}
            className="img-thumbnail"
          />
        </div>

        <div className="w-100">
          <div
            className="d-flex justify-content-between align-items-center gap-2"
            style={{ minWidth: '200px', maxWidth: '300px' }}>
            <div>
              <h5 className="text-capitalize text-secondary">
                <Link href={`/product/${item._id}`}>
                  <a>{item.title}</a>
                </Link>
              </h5>
              <h6 className="text-danger">{`${currencySymbol[item.currency]}${(
                item.amount * item.price
              ).toFixed(2)}`}</h6>
              {item.quantity > 0 ? (
                <p className="mb-1 text-danger">In Stock: {item.quantity}</p>
              ) : (
                <p className="mb-1 text-danger">Out of Stock</p>
              )}

              <div
                className="input-group flex-nowrap"
                style={{ maxWidth: '170px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={item.amount < 2}
                  onClick={() => dispatch(decreaseItemAmount(cart, item._id))}>
                  <i className="fas fa-minus" />
                </button>

                <span
                  className="form-control text-center"
                  style={{ width: '100px' }}>
                  {item.amount}
                </span>

                <button
                  type="button"
                  className="btn btn-secondary ml-3"
                  disabled={item.amount == item.quantity}
                  onClick={() => dispatch(increaseItemAmount(cart, item._id))}>
                  <i className="fas fa-plus" />
                </button>
              </div>
            </div>

            <button
              className="pointer-event mx-2"
              onClick={() =>
                dispatch({
                  type: 'ADD_MODAL',
                  payload: { data: cart, id: item._id, title: item.title },
                })
              }>
              <i
                className="far fa-trash-alt text-danger"
                aria-hidden
                style={{ fontSize: '18px' }}
                data-bs-toggle="modal"
                data-bs-target="#Modal"
              />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default CartItem;
