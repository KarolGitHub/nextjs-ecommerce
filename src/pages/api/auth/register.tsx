import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import valid from '../../../utils/valid';
import bcrypt from 'bcrypt';

connectDB();

const register = async (
  request: NextApiRequest,
  response: NextApiResponse<UserPayload>
): Promise<void> => {
  switch (request.method) {
    case 'POST':
      await handler(request, response);
      break;
  }
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<UserPayload>
) => {
  try {
    const { name, email, password, confirmPassword } = request.body;

    const errMsg = valid({ name, email, password, confirmPassword });
    if (errMsg) {
      return response.status(400).json({ err: errMsg });
    }

    const user = await Users.findOne({ email });
    if (user) {
      return response.status(400).json({ err: 'This email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new Users({
      name,
      email,
      password: passwordHash,
      confirmPassword,
    });

    await newUser.save();
    response.json({ msg: 'Register Successful' });
  } catch (err) {
    return response.status(500).json({ err: err.message });
  }
};

export default register;
