import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../utils/connectDB';
import Orders from '../../../models/orderModel';
import Products from '../../../models/productsModel';
import auth from '../../../middleware/auth';

connectDB();

const order = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      await createOrder(req, res);
      break;
  }
};

const createOrder = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const result = await auth(req, res);
    const { address, phoneNumber, cart, totalPrice } = req.body;

    const newOrder = new Orders({
      user: result.id,
      address,
      phoneNumber,
      cart,
      totalPrice,
    });

    cart.filter((item: ProductData) => updateItemStock(item));

    await newOrder.save();

    res.json({
      msg: 'Order successful! We will contact you to confirm the order',
      newOrder,
    });
  } catch (err) {
    return res.status(500).json({ err: (err as any).message });
  }
};

const updateItemStock = async (item: ProductData) => {
  await Products.findOneAndUpdate(
    { _id: item._id },
    {
      quantity: item.quantity - item.amount,
      sold: item.sold + item.amount,
    }
  );
};

export default order;
