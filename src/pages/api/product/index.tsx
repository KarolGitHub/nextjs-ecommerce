import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../utils/connectDB';
import Products from '../../../models/productsModel';

connectDB();

const product = async (
  req: NextApiRequest,
  res: NextApiResponse<ProductsPayload>
): Promise<void> => {
  switch (req.method) {
    case 'GET':
      await getAllProducts(req, res);
      break;
  }
};

const getAllProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<ProductsPayload>
) => {
  try {
    const products = await Products.find();
    res.json({
      status: 'success',
      products,
    });
  } catch (err) {
    return res.status(500).json({ err: (err as any).message });
  }
};

export default product;
