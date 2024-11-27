import { Request, Response, NextFunction } from 'express';
import { HttpException } from './exception.filter';

const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).send({
    status,
    message,
  });
};

export default errorMiddleware;
