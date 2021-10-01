import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

import Users from '../../../models/userModel';
import {
  connectDB,
  createAccessToken,
  createRefreshToken,
} from '../../../utils';

connectDB();

const signin = async (
  req: NextApiRequest,
  res: NextApiResponse<UserPayload>
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      await handler(req, res);
      break;
  }
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<UserPayload>
) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ err: 'This user does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ err: 'Incorrect password' });
    }

    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });

    res.json({
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
    return res.status(500).json({ err: (err as any).message });
  }
};

export default signin;
