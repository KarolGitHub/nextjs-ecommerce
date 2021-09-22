import { useEffect, useRef } from 'react';
import { useGlobalState } from '../../context/GlobalState';
import { patchData } from '../../utils/fetchData';
import { updateItem } from '../../store/Actions';

const PaypalButton = ({ order }) => {
  const refPaypalBtn = useRef();

  const { state, dispatch } = useGlobalState();
  const { auth, orders } = state;

  useEffect(() => {
    paypal
      .Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: order.totalPrice + '',
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          dispatch({ type: 'NOTIFY', payload: { loading: true } });

          return actions.order.capture().then(function (details) {
            patchData(
              `order/payment/${order._id}`,
              {
                paymentId: details.payer.payer_id,
              },
              auth.token
            ).then((res) => {
              if (res.err)
                return dispatch({
                  type: 'NOTIFY',
                  payload: { error: res.err },
                });

              dispatch(
                updateItem('ADD_ORDERS', orders, order._id, {
                  ...order,
                  paid: true,
                  dateOfPayment: details.create_time,
                  paymentId: details.payer.payer_id,
                  method: 'Paypal',
                })
              );

              return dispatch({
                type: 'NOTIFY',
                payload: { success: res.msg },
              });
            });
          });
        },
      })
      .render(refPaypalBtn.current);
  }, [order]);

  return <div ref={refPaypalBtn}></div>;
};

export default PaypalButton;
