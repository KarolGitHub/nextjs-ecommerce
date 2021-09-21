import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import auth from '../../../middleware/auth';

connectDB();

const user = async (
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
    const { name, avatar } = req.body;

    const newUser = await Users.findOneAndUpdate(
      { _id: result.id },
      { name, avatar }
    );

    res.json({
      msg: 'Update Successful',
      user: {
        name,
        avatar,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: (err as any).message });
  }
};

export default user;
