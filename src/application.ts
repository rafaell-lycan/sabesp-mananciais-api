import cors from 'cors';
import express, { Express } from 'express';
import * as fs from 'fs';
import helmet = require('helmet');
import * as http from 'http';
import * as jsyaml from 'js-yaml';
import swaggerTools from 'swagger-tools';

export class Application {
  private app: Express;

  constructor() {
    this.app = express();

    this.setup();
  }

  private setup(): void {
    this.middleware();
    this.setupSwagger();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    // enable helmet
    this.app.use(helmet());
    // enable cors
    this.app.use(cors({ maxAge: 600 }));
  }

  private setupSwagger(): void {
    const file = fs.readFileSync(`${process.cwd()}/swagger/swagger.yml`, 'utf8');
    const swaggerFile = jsyaml.load(file.toString());

    swaggerTools.initializeMiddleware(
      swaggerFile,
      ({ swaggerMetadata, swaggerValidator, swaggerRouter, swaggerUi }) => {
        // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
        this.app.use(swaggerMetadata());

        // Validate Swagger requests
        this.app.use(swaggerValidator());

        // Route validated requests to appropriate controller
        this.app.use(swaggerRouter());

        // Serve the Swagger documents and Swagger UI
        this.app.use(swaggerUi());
      }
    );
  }

  // Configure routes
  private routes(): void {
    // load routes
  }

  public start(port: number | string = 3000): void {
    http.createServer(this.app).listen(port, () => {
      // tslint:disable-next-line: no-console
      console.log(`
        Your server is running on http://localhost:${port}
        Swagger-ui is available on http://localhost:${port}/docs
      `);
    });
  }
}
