import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { BasicLayout, CartItem } from '../components';
import { useGlobalState } from '../context/GlobalState';
import { getData, postData } from '../utils/fetchData';

const Cart: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const { auth, cart, orders } = state;

  const [totalPrice, setTotalPrice] = useState(0);

  const [shippingData, setShippingData] = useState<{
    address: string;
    phoneNumber: string;
  }>({ address: '', phoneNumber: '' });

  const [callback, setCallback] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (() => {
      const sum = cart.reduce((prev, item) => {
        return prev + item.price * item.amount;
      }, 0);

      setTotalPrice(sum);
    })();
  }, [cart]);

  useEffect(() => {
    const localStorageCart = JSON.parse(
      localStorage.getItem('nextjs-ecommerce-cart') || ''
    );
    if (localStorageCart.length) {
      const newCartArray: Partial<ProductData>[] = [];
      (async () => {
        for (const item of localStorageCart) {
          const result = await getData(`product/${item._id}`);
          const { _id, title, imageUrl, price, quantity, sold, currency } =
            result.product;
          if (quantity) {
            newCartArray.push({
              _id,
              title,
              imageUrl,
              price,
              quantity,
              sold,
              currency,
              amount: item.amount > quantity ? quantity : item.amount,
            });
          }
        }

        dispatch({ type: 'ADD_TO_CART', payload: newCartArray });
      })();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback]);

  const paymentHandler = async () => {
    if (!shippingData.address || !shippingData.phoneNumber) {
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'Please add your address and phone number' },
      });
    }

    const newCart = [];
    for (const item of cart) {
      const res = await getData(`product/${item._id}`);
      if (res.product.quantity - item.amount >= 0) {
        newCart.push(item);
      }
    }

    if (newCart.length < cart.length) {
      setCallback((prevState) => !prevState);
      return dispatch({
        type: 'NOTIFY',
        payload: {
          error: 'The product is out of stock or the quantity is insufficient',
        },
      });
    }

    dispatch({ type: 'NOTIFY', payload: { loading: true } });

    postData('order', { ...shippingData, cart, totalPrice }, auth.token).then(
      (res) => {
        if (res.err) {
          return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
        }

        dispatch({ type: 'ADD_TO_CART', payload: [] });

        const newOrder = {
          ...res.newOrder,
          user: auth.user,
        };
        dispatch({ type: 'ADD_ORDERS', payload: [...orders, newOrder] });
        dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
        router.push(`/order/${res.newOrder._id}`);
      }
    );
  };

  return (
    <BasicLayout className="cart-page">
      <Head>
        <title>Cart Page</title>
      </Head>
      {cart.length > 0 ? (
        <div className="row mx-auto">
          <div className="col-md-8 text-secondary table-responsive my-3 overflow-auto  p-0">
            <h2 className="text-uppercase">Shopping Cart</h2>

            <table className="table my-3" style={{ maxWidth: '400px' }}>
              <tbody>
                {cart.map((item, index) => (
                  <CartItem
                    key={`${item._id}${index}`}
                    item={item}
                    dispatch={dispatch}
                    cart={cart}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-md-4 my-3 text-right text-uppercase text-secondary">
            <form>
              <h2>Shipping</h2>

              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                className="form-control mb-2"
                value={shippingData.address}
                onChange={(e) =>
                  setShippingData((prevState) => ({
                    ...prevState,
                    address: e.target.value,
                  }))
                }
              />

              <label htmlFor="phone-number">Phone number</label>
              <input
                type="number"
                name="phone-number"
                id="phone-number"
                className="form-control mb-2"
                value={shippingData.phoneNumber}
                onChange={(e) =>
                  setShippingData((prevState) => ({
                    ...prevState,
                    phoneNumber: e.target.value,
                  }))
                }
              />
            </form>

            <h3>
              Total:{' '}
              <span className="text-danger">€{totalPrice.toFixed(2)}</span>
            </h3>

            <Link href={auth?.user ? '#!' : '/signin'}>
              <a className="btn btn-dark my-2" onClick={paymentHandler}>
                Proceed with payment
              </a>
            </Link>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center text-center vh-100">
          <img
            style={{ width: '150px' }}
            src="shopping-cart.svg"
            alt="empty shopping cart"
          />
          <h3>Your shopping cart is empty</h3>
          <span>
            Once you have added items to your cart, you can check out from here.
          </span>
          <Link href="/">
            <a className="btn btn-info mt-3 w-50" style={{ maxWidth: '500px' }}>
              View products
            </a>
          </Link>
        </div>
      )}
    </BasicLayout>
  );
};

export default Cart;
