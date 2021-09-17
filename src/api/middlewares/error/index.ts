import { NextFunction, Request, Response } from 'express'
import { NotFoundError, WebError } from '../../../utils/errors';
import { logger } from '../../../utils/logger'

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
  const error = new NotFoundError(`Resource '${req.originalUrl}' not found.`);
  next(error)
}

export const errorHandler = (error: WebError, _req: Request, res: Response, _next: NextFunction) => {
  const {
    message = 'Something went wrong. Please try again.',
    status = 500,
  } = error
  logger.error('Error handler', JSON.stringify(error))

  res.status(status).json({ message, status })
}
