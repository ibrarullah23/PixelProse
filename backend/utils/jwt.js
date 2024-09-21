import 'dotenv/config';
import jwt  from 'jsonwebtoken';

export const createSecretToken = (id, username, role) => {
  return jwt.sign({ id, username , role}, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60, // 3 days
  });
};