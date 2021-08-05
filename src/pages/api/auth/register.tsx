import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import valid from '../../../utils/valid';
import bcrypt from 'bcrypt';

type Data = {
  msg?: string;
  err?: string;
};

connectDB();

const register = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      await handler(req, res);
      break;
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { name, email, password, cf_password } = req.body;

    const errMsg = valid({ name, email, password, cf_password });
    if (errMsg) return res.status(400).json({ err: errMsg });

    const user = await Users.findOne({ email });
    if (user)
      return res.status(400).json({ err: 'This email already exists.' });

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new Users({
      name,
      email,
      password: passwordHash,
      cf_password,
    });

    await newUser.save();
    res.json({ msg: 'Register Success!' });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default register;
