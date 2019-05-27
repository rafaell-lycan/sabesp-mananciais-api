import { Application } from 'express';
import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { cwd } from 'process';
import { serve, setup } from 'swagger-ui-express';

import logger from '../utils/logger';

const file = readFileSync(`${cwd()}/swagger/swagger.yml`, 'utf8');
const swaggerSpec: any = load(file.toString());

export default (app: Application): void => {
  logger.debug('Swagger: Setup...');
  app.use('/swagger/docs', serve, setup(swaggerSpec));
  app.use('/swagger/api-docs', (req, res) => res.send(swaggerSpec));
};
