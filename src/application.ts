import cors from 'cors';
import express, { Application } from 'express';
import helmet = require('helmet');
import * as http from 'http';
import { MongoClient, MongoClientOptions } from 'mongodb';
import { env } from 'process';

import Analytics from './common/middleware/analytics';
import { errorHandler, notFoundHandler } from './common/middleware/handlers';
import swagger from './common/middleware/swagger';
import Logger from './common/utils/logger';
import routes from './routes';

const logger = Logger('app');

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
    this.routes(app);
  }

  private async database(app: Application): Promise<void> {
    if (env.MONGO_URI) {
      logger('Adding MongoDB configuration...');
      const dbOptions: MongoClientOptions = { useNewUrlParser: true };
      const db: MongoClient = await MongoClient.connect(env.MONGO_URI, dbOptions);
      app.set('db', db);
    }
  }

  // Configure Express middleware.
  private middleware(app: Application): void {
    logger('Applying middlewares...');

    // enable helmet
    app.use(helmet());

    // enable cors
    app.use(cors({ maxAge: 600 }));

    // enable swagger
    swagger(app);

    // enable Analytics
    if (env.ANALYTICS) {
      app.use(new Analytics(env.ANALYTICS).track);
    }
  }

  // Configure routes
  private routes(app: Application): void {
    routes(app);

    // Add application error handlers
    // app.use(notFoundHandler);
    // app.use(errorHandler);
  }

  public start(): void {
    const port: string | number = env.PORT || 3000;

    http.createServer(Server.app).listen(port, () => {
      logger(`
        Your server is running on http://localhost:${port}
        Swagger-ui is available on http://localhost:${port}/docs
      `);
    });
  }
}
