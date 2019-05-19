import { NextFunction, Request, Response } from 'express';
import Logger from '../utils/logger';

const logger = Logger('appError');

interface IHttpException extends Error {
  message: string;
  status?: number;
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction): void {
  const error: IHttpException = new Error('Not Found.');
  error.status = 404;
  logger('Not found', error);
  next(error);
}

export function errorHandler(error: IHttpException, req: Request, res: Response): void {
  logger('error', error);
  const { message = 'Something went wrong. Please try again.', status = 500 } = error;
  res.status(status).json({
    message,
    status,
  });
}
