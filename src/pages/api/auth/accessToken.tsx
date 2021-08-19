import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import { createAccessToken } from '../../../utils/generateToken';

connectDB();

const accessToken = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
): Promise<void> => {
  try {
    const refreshToken = request.cookies.refreshToken;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || '';

    if (!refreshToken)
      return response.status(400).json({ err: 'Please login' });

    const result: any = jwt.verify(refreshToken, refreshTokenSecret);

    if (!result)
      return response
        .status(400)
        .json({ err: 'Your token is incorrect or has expired.' });

    const user = await Users.findById(result.id);
    if (!user)
      return response.status(400).json({ err: 'User does not exist.' });

    const accessToken = createAccessToken({ id: user._id });
    response.json({
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
    return response.status(500).json({ err: err.message });
  }
};

export default accessToken;
