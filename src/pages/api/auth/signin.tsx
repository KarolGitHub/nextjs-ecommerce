import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import {
  createAccessToken,
  createRefreshToken,
} from '../../../utils/generateToken';

connectDB();

const signin = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
): Promise<void> => {
  switch (request.method) {
    case 'POST':
      await handler(request, response);
      break;
  }
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  try {
    const { email, password } = request.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return response.status(400).json({ err: 'This user does not exist.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.status(400).json({ err: 'Incorrect password.' });
    }

    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });

    response.json({
      msg: 'Login Successful',
      accessToken,
      refreshToken,
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

export default signin;
