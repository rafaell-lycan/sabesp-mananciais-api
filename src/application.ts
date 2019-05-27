import { env, cwd } from 'process';
import { join } from 'path';
import cors from 'cors';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import express, { Application } from 'express';
import { useExpressServer } from 'routing-controllers';
import { MongoClient, MongoClientOptions } from 'mongodb';

import logger from './common/utils/logger';
import swagger from './common/middleware/swagger';
import Analytics from './common/middleware/analytics';
import NotFoundHandler from './common/middleware/NotFoundHandler';
import ErrorHandler from './common/middleware/ErrorHandler';
import IndexController from './api';
import ApiV2Controller from './api/v2';
import ApiV1Controller from './api/v1';

export default class Server {
  private static app: Application;

  constructor() {
    Server.app = express();
    this.setup(Server.app);
  }

  public get app(): Application {
    return Server.app;
  }

  private setup(app: Application): void {
    this.database(app);
    this.middleware(app);
    this.controllers(app);
  }

  private async database(app: Application): Promise<void> {
    if (env.MONGO_URI) {
      logger.debug('Adding MongoDB configuration...');
      const dbOptions: MongoClientOptions = { useNewUrlParser: true };
      const db: MongoClient = await MongoClient.connect(env.MONGO_URI, dbOptions);
      app.set('db', db);
    }
  }

  // Configure Express middleware.
  private middleware(app: Application): void {
    logger.debug('Applying middlewares...');

    // enable swagger
    swagger(app);

    // enable helmet
    app.use(helmet());

    // enable server favicon
    app.use(favicon(join(cwd(), 'public', 'favicon.ico')));

    // enable cors
    app.use(cors());

    // enable morgan logger
    app.use(morgan('dev'));
  }

  // Configure routes based on controllers
  private controllers(app: Application): void {
    logger.debug('Configuring routes...');
    // const controllers = [`${__dirname}/controllers/*`];

    useExpressServer(app, {
      controllers: [IndexController, ApiV2Controller, ApiV1Controller],
      middlewares: [
        // custom middlewares
        Analytics,
        NotFoundHandler,
        ErrorHandler,
      ],
      defaultErrorHandler: false,
    });
  }

  public start(): void {
    const port: string | number = env.PORT || 3000;

    Server.app.listen(port, () => {
      logger.info(`
      ------------
      Server Started!
      Express:      http://localhost:${port}
      Swagger Docs: http://localhost:${port}/swagger/docs
      Swagger Spec: http://localhost:${port}/swagger/api-docs
      ------------
      `);
    });
  }
}
