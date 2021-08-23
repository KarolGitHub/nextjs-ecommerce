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
      await getProducts(request, response);
      break;
  }
};

const getProducts = async (
  request: NextApiRequest,
  response: NextApiResponse<ProductPayload>
) => {
  try {
    const products = await Products.find();
    response.json({
      status: 'success',
      products,
    });
  } catch (err) {
    return response.status(500).json({ err: err.message });
  }
};

export default product;
