import { useEffect, useRef } from 'react';
import { useGlobalState } from '../../context/GlobalState';
import { postData } from '../../utils/fetchData';

const PaypalButton = ({ order }) => {
  const refPaypalBtn = useRef();

  const { state, dispatch } = useGlobalState();
  const { auth } = state;

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
            postData(`order`, { ...order }, auth.token).then((res) => {
              if (res.err) {
                return dispatch({
                  type: 'NOTIFY',
                  payload: { error: res.err },
                });
              }

              dispatch({ type: 'ADD_TO_CART', payload: [] });

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
