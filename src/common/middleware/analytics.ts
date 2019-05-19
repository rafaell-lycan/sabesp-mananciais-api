import { NextFunction, Request, Response } from 'express';
import ua, { PageviewParams, Visitor } from 'universal-analytics';

export default class Analytics {
  private visitor: Visitor;

  constructor(id: string) {
    this.visitor = ua(id);
  }

  public track(req: Request, res: Response, next: NextFunction): void {
    const { headers, path } = req;
    const options: PageviewParams = {
      dp: path,
      dh: headers.host,
      uip: headers['x-forwarded-for'] || headers['x-real-ip'],
      ua: headers['user-agent'],
    };

    this.visitor.pageview(options).send();
    next();
  }
}
