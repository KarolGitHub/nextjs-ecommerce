import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../utils/connectDB';
import Products from '../../../models/productsModel';

connectDB();

const product = async (
  request: NextApiRequest,
  response: NextApiResponse<ProductsPayload>
): Promise<void> => {
  switch (request.method) {
    case 'GET':
      await getAllProducts(request, response);
      break;
  }
};

const getAllProducts = async (
  request: NextApiRequest,
  response: NextApiResponse<ProductsPayload>
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
