import { serve, setup } from 'swagger-ui-express'
import config from '../../../swagger/swagger.json'

/**
 * TODO: Use a simple configuration on the swagger.json
 * and loads the rest from routes using `swagger-jsdoc`
 * https://stackoverflow.com/questions/34247484/how-to-integrate-swagger-with-my-express-application
 */
export default (app): void => {
  app.use('/swagger/docs', serve, setup(config))
  app.use('/swagger/api-docs', (_req, res) => res.send(config))
}
