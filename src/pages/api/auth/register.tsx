import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import valid from '../../../utils/valid';
import bcrypt from 'bcrypt';

connectDB();

const register = async (
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
    const { name, email, password, confirmPassword } = req.body;

    const errMsg = valid({ name, email, password, confirmPassword });
    if (errMsg) {
      return res.status(400).json({ err: errMsg });
    }

    const user = await Users.findOne({ email });
    if (user) {
      return res.status(400).json({ err: 'This email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new Users({
      name,
      email,
      password: passwordHash,
      confirmPassword,
    });

    await newUser.save();
    res.json({ msg: 'Register Successful' });
  } catch (err) {
    return res.status(500).json({ err: (err as any).message });
  }
};

export default register;
