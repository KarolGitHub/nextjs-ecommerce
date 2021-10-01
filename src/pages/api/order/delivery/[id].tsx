import type { NextApiRequest, NextApiResponse } from 'next';

import { connectDB } from '../../../../utils';
import Orders from '../../../../models/orderModel';
import auth from '../../../../middleware/auth';

connectDB();

const delivery = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  switch (req.method) {
    case 'PATCH':
      await handler(req, res);
      break;
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const result = await auth(req, res);
    if (result.role !== 'admin') {
      return res.status(400).json({ err: 'Authentication is not valid.' });
    }

    const { id } = req.query;
    const order = await Orders.findOne({ _id: id });
    if (order.paid) {
      await Orders.findOneAndUpdate({ _id: id }, { delivered: true });

      res.json({
        msg: 'Updated successful',
        result: {
          paid: true,
          dateOfPayment: order.dateOfPayment,
          method: order.method,
          delivered: true,
        },
      });
    } else {
      await Orders.findOneAndUpdate(
        { _id: id },
        {
          paid: true,
          dateOfPayment: new Date().toISOString(),
          method: 'Receive Cash',
          delivered: true,
        }
      );

      res.json({
        msg: 'Updated successful',
        result: {
          paid: true,
          dateOfPayment: new Date().toISOString(),
          method: 'Receive Cash',
          delivered: true,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({ err: (err as any).message });
  }
};

export default delivery;
