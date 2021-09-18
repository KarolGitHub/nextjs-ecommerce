import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import auth from '../../../middleware/auth';
import bcrypt from 'bcrypt';

connectDB();

const resetPassword = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  switch (req.method) {
    case 'PATCH':
      await handler(req, res);
      break;
  }
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  try {
    const result = await auth(req, res);
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password + '', 12);

    await Users.findOneAndUpdate(
      { _id: result.id },
      { password: passwordHash }
    );

    res.json({ msg: 'Update Successful' });
  } catch (err) {
    return res.status(500).json({ err: (err as any).message });
  }
};

export default resetPassword;
