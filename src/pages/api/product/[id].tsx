import type { NextApiRequest, NextApiResponse } from 'next';

import { connectDB } from '../../../utils';
import Products from '../../../models/productsModel';

connectDB();

const product = async (
  req: NextApiRequest,
  res: NextApiResponse<ProductPayload>
): Promise<void> => {
  switch (req.method) {
    case 'GET':
      await getProduct(req, res);
      break;
  }
};

const getProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<ProductPayload>
) => {
  try {
    const { id } = req.query;

    const product = await Products.findById(id);
    if (!product) {
      return res.status(400).json({ err: 'This product does not exist' });
    }

    res.json({ product });
  } catch (err) {
    return res.status(500).json({ err: (err as any).message });
  }
};

export default product;
