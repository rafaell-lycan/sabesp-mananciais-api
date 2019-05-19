import { Application, Request, Response, Router } from 'express';

export default (app: Application) => {
  const router = Router();

  router.get('/', (req: Request, res: Response) => {
    res.send('OK');
  });

  app.use(router);
};
