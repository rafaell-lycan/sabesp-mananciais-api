import ua from 'universal-analytics'
import { Request, Response, NextFunction } from 'express'

export const analytics = ({ headers, path }: Request, _res: Response, next: NextFunction) => {
  if (process.env.ANALYTICS) {
    const visitor = ua(process.env.ANALYTICS)
    const options = {
      dp: path,
      dh: headers.host,
      uip: headers['x-forwarded-for'] || headers['x-real-ip'],
      ua: headers['user-agent'],
    }

    visitor.pageview(options).send(() => next())
  }

  next()
}
