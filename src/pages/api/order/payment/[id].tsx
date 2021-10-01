import type { NextApiRequest, NextApiResponse } from 'next';

import { connectDB } from '../../../../utils';
import Orders from '../../../../models/orderModel';
import auth from '../../../../middleware/auth';

connectDB();

const payment = async (
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

    if (result.role === 'user') {
      const { id } = req.query;
      const { paymentId } = req.body;

      await Orders.findOneAndUpdate(
        { _id: id },
        {
          paid: true,
          dateOfPayment: new Date().toISOString(),
          paymentId,
          method: 'Paypal',
        }
      );

      res.json({ msg: 'Payment successful' });
    }
  } catch (err) {
    return res.status(500).json({ err: (err as any).message });
  }
};

export default payment;
