import { serve, setup } from 'swagger-ui-express'
import config from '../../../swagger/swagger.json'

export default (app): void => {
  app.use('/swagger/docs', serve, setup(config))
  app.use('/swagger/api-docs', (_req, res) => res.send(config))
}
