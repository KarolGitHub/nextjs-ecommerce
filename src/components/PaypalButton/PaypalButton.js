import { useEffect, useRef } from 'react';

const PaypalButton = ({ order }) => {
  const refPaypalBtn = useRef();
  const { totalPrice, shippingData } = order;

  useEffect(() => {
    paypal
      .Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalPrice,
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        },
      })
      .render(refPaypalBtn.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={refPaypalBtn}></div>;
};

export default PaypalButton;
