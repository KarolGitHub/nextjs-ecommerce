import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import auth from '../../../middleware/auth';
import resetPassword from './resetPassword';

connectDB();

const user = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  switch (req.method) {
    case 'PATCH':
      await resetPassword(req, res);
      break;
  }
};

export default user;
