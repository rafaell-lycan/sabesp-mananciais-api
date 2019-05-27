import { Request, Response } from 'express';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import logger from '../utils/logger';

@Middleware({ type: 'before' })
export default class ErrorHandler implements ExpressErrorMiddlewareInterface {
  public error(error: any, req: Request, res: Response): void {
    const {
      message = 'Something went wrong. Please try again.',
      httpCode,
      statusCode = 500,
    } = error;

    logger.error('Error handler', JSON.stringify(error));
    const status = httpCode || statusCode;
    res.status(status).json({
      message,
      status,
    });
  }
}
