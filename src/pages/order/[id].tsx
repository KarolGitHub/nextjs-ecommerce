import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useGlobalState } from '../../context/GlobalState';
import { BasicLayout, OrderDetails } from '../../components';

const Order: React.FC = () => {
  const { state } = useGlobalState();
  const { orders, auth } = state;

  const router = useRouter();

  const [data, setData] = useState<OrderData[]>([]);

  useEffect(
    () => {
      const newArr = orders.filter(
        (order: OrderData) => order._id === router.query.id
      );
      setData(newArr);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [orders]
  );

  if (!auth?.user) {
    return null;
  }
  return (
    <BasicLayout className="order-page">
      <Head>
        <title>Detail Orders</title>
      </Head>

      <OrderDetails data={data} state={state} />
    </BasicLayout>
  );
};

export default Order;
