import { Application } from 'express';
import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { cwd } from 'process';
import { initializeMiddleware } from 'swagger-tools';

export default (app: Application): void => {
  const file = readFileSync(`${cwd()}/swagger/swagger.yml`, 'utf8');
  const swaggerFile = load(file.toString());

  initializeMiddleware(
    swaggerFile,
    ({ swaggerMetadata, swaggerValidator, swaggerUi }): void => {
      // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
      app.use(swaggerMetadata());

      // Validate Swagger requests
      app.use(swaggerValidator());

      // Serve the Swagger documents and Swagger UI
      app.use(swaggerUi());
    }
  );
};
