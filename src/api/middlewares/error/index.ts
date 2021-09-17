import { NextFunction, Request, Response } from 'express'
import { NotFoundError, WebError } from '../../../utils/errors';
import { logger } from '../../../utils/logger'

export const notFoundHandler = ({path}: Request, _res: Response, next: NextFunction) => {
  const error = new NotFoundError(`Resource '${path}' not found.`);
  next(error)
}

export const errorHandler = (error: WebError, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(JSON.stringify(error))
  logger.error(error.message)
  logger.error(error.stack)
  const message = error.message || 'Something went wrong. Please try again.';
  const status = error.status || 500;

  res.status(status).json({ message, status })
}
