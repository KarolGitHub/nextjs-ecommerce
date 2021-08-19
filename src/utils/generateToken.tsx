import jwt from 'jsonwebtoken';

const accessToken = process.env.ACCESS_TOKEN_SECRET || '';
const refreshToken = process.env.REFRESH_TOKEN_SECRET || '';

export const createAccessToken = (payload: { id: string }): string => {
  return jwt.sign(payload, accessToken, {
    expiresIn: '15m',
  });
};

export const createRefreshToken = (payload: { id: string }): string => {
  return jwt.sign(payload, refreshToken, {
    expiresIn: '7d',
  });
};
