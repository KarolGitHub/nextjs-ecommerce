import Link from 'next/link';

import { PaypalButton } from '..';
import { updateItem } from '../../store/Actions';
import { patchData } from '../../utils/fetchData';
import { currencySymbol } from '../../utils/shared';

type Props = {
  data: OrderData[];
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
};

const OrderDetails: React.FC<Props> = ({ data, state, dispatch }) => {
  const { auth, orders } = state;

  const handleDelivered = (order: OrderData) => {
    dispatch({ type: 'NOTIFY', payload: { loading: true } });

    patchData(`order/delivery/${order._id}`, null, auth.token).then((res) => {
      if (res.err) {
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
      }

      const { paid, dateOfPayment, method, delivered } = res.result;

      dispatch(
        updateItem('ADD_ORDERS', orders, order._id, {
          ...order,
          paid,
          dateOfPayment,
          method,
          delivered,
        })
      );

      return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
    });
  };

  return (
    <>
      {data?.map((order: OrderData) => (
        <div
          key={order._id}
          style={{ margin: '20px auto' }}
          className="row justify-content-around">
          <div className="text-uppercase my-3" style={{ maxWidth: '600px' }}>
            <h2 className="text-break">Order {order._id}</h2>

            <div className="mt-4 text-secondary">
              <h3>Shipping</h3>
              <p>Name: {order.user.name}</p>
              <p>Email: {order.user.email}</p>
              <p>Address: {order.address}</p>
              <p>Phone number: {order.phoneNumber}</p>

              <div
                className={`alert ${
                  order.delivered ? 'alert-success' : 'alert-danger'
                } d-flex justify-content-between align-items-center`}
                role="alert">
                {order.delivered
                  ? `Deliverd on ${order.updatedAt}`
                  : 'Not Delivered'}
                {auth.user.role === 'admin' && !order.delivered && (
                  <button
                    className="btn btn-dark text-uppercase"
                    onClick={() => handleDelivered(order)}>
                    Mark as delivered
                  </button>
                )}
              </div>

              <h3>Payment</h3>
              {order.method && (
                <h6>
                  Method: <em>{order.method}</em>
                </h6>
              )}

              {order.paymentId && (
                <p>
                  PaymentId: <em>{order.paymentId}</em>
                </p>
              )}

              <div
                className={`alert ${
                  order.paid ? 'alert-success' : 'alert-danger'
                } d-flex justify-content-between align-items-center`}
                role="alert">
                {order.paid ? `Paid on ${order.dateOfPayment}` : 'Not Paid'}
              </div>

              <div>
                <h3>Order Items</h3>
                {order.cart.map((item) => (
                  <div
                    className="d-flex flex-nowrap border-bottom mx-0 p-2 justify-content-between align-items-center"
                    key={item._id}
                    style={{ maxWidth: '550px' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.imageUrl}
                      width="50px"
                      height="45px"
                      style={{ objectFit: 'initial' }}
                    />

                    <h5 className="flex-fill text-secondary px-3 m-0">
                      <Link href={`/product/${item._id}`}>
                        <a>{item.title}</a>
                      </Link>
                    </h5>

                    <span className="text-info m-0">
                      {item.amount} × {currencySymbol[item.currency]}
                      {item.price} = {currencySymbol[item.currency]}
                      {(item.price * item.amount).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {!order.paid && auth.user.role !== 'admin' && (
            <div className="p-4 text-center">
              <h2 className="mb-4 text-uppercase">
                Total: €{order.totalPrice.toFixed(2)}
              </h2>
              <PaypalButton order={order} />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default OrderDetails;
