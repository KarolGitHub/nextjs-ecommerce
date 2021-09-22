import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import Users from '../models/userModel';

const auth = async (
  req: NextApiRequest,
  res: NextApiResponse<UserPayload>
): Promise<any> => {
  const token = req.headers.authorization;
  const accessToken = process.env.ACCESS_TOKEN_SECRET || '';

  if (!token) {
    return res.status(400).json({ err: 'Invalid Authentication' });
  }

  const decoded = jwt.verify(token, accessToken);
  if (!decoded) {
    return res.status(400).json({ err: 'Invalid Authentication' });
  }

  const user = await Users.findOne({ _id: (decoded as any).id });
  return { id: user._id, role: user.role, root: user.root };
};

export default auth;
