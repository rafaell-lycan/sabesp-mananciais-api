import { env } from 'process';
import { Request, Response, NextFunction } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import ua, { PageviewParams, Visitor } from 'universal-analytics';

import logger from '../utils/logger';

@Middleware({ type: 'after' })
export default class Analytics implements ExpressMiddlewareInterface {
  public use(req: Request, res: Response, next: NextFunction) {
    const { headers, path } = req;
    logger.info(`Analytics pageview on ${path}`);
    if (env.ANALYTICS) {
      const visitor: Visitor = ua(env.ANALYTICS);
      const options: PageviewParams = {
        dp: path,
        dh: headers.host,
        uip: headers['x-forwarded-for'] || headers['x-real-ip'],
        ua: headers['user-agent'],
      };

      logger.info(`Analytics pageview on ${path}`);
      visitor.pageview(options).send(() => next());
    }

    next();
  }
}
