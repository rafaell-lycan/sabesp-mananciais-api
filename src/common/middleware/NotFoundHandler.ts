import { Request, Response, NextFunction } from 'express';
import { Middleware, ExpressMiddlewareInterface, NotFoundError } from 'routing-controllers';

@Middleware({ type: 'after' })
export default class NotFoundHandler implements ExpressMiddlewareInterface {
  public use(req: Request, res: Response, next: NextFunction) {
    const { name, message, httpCode } = new NotFoundError(
      `Resource '${req.originalUrl}' not found.`
    );

    res.status(httpCode).send({
      httpCode,
      name,
      message,
    });

    next();
  }
}
