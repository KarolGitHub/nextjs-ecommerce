import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../utils/connectDB';
import Products from '../../../models/productsModel';

connectDB();

const product = async (
  request: NextApiRequest,
  response: NextApiResponse<ProductPayload>
): Promise<void> => {
  switch (request.method) {
    case 'GET':
      await getProduct(request, response);
      break;
  }
};

const getProduct = async (
  request: NextApiRequest,
  response: NextApiResponse<ProductPayload>
) => {
  try {
    const { id } = request.query;

    const product = await Products.findById(id);
    if (!product) {
      return response.status(400).json({ err: 'This product does not exist.' });
    }

    response.json({ product });
  } catch (err) {
    return response.status(500).json({ err: err.message });
  }
};

export default product;
