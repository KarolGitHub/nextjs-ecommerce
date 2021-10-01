import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import Users from '../../../models/userModel';
import { connectDB, createAccessToken } from '../../../utils';

connectDB();

const accessToken = async (
  req: NextApiRequest,
  res: NextApiResponse<UserPayload>
): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || '';

    if (!refreshToken) {
      return res.status(400).json({ err: 'Please login' });
    }

    const result: any = jwt.verify(refreshToken, refreshTokenSecret);

    if (!result) {
      return res
        .status(400)
        .json({ err: 'Your token is incorrect or has expired' });
    }

    const user = await Users.findById(result.id);
    if (!user) {
      return res.status(400).json({ err: 'User does not exist' });
    }

    const accessToken = createAccessToken({ id: user._id });
    res.json({
      accessToken,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: (err as any).message });
  }
};

export default accessToken;
