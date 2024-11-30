import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from './exception.filter';

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error('JWT_SECRET_KEY is not defined in environment variables');
}

export const AuthMiddleware = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: Request & { user?: any },
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    throw new HttpException(401, 'No token provided');
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    throw new HttpException(401, `Unauthorized ${error}`);
  }
};
