import 'dotenv/config'
import { Server } from 'http'

import {app} from './application'
import {logger} from './utils/logger'

/**
 * Error Handler. Provides full stack
 */
if (!app.get('prod')) {
  app.use(require('errorhandler')())
}

let server: Server

/**
 * Start Express server.
 */
async function main() {
  server = await app.listen(app.get('port'), () => {
    logger.info(`⚡️ Server listening on http://localhost:${app.get('port')}`)
    logger.info('Press CTRL-C to stop')
  })
  // logger.info(`
  //   ------------
  //   Server Started!
  //   Express:      http://localhost:${app.get('port')}
  //   Swagger Docs: http://localhost:${app.get('port')}/swagger/docs
  //   Swagger Spec: http://localhost:${app.get('port')}/swagger/api-docs
  //   ------------
  //   `)
}

process.on('unhandledRejection', (reason) => {
  if(reason) logger.error(reason)
  process.kill(process.pid, 'SIGTERM')
})

process.on('uncaughtException', (err) => {
  if(err) logger.error(err)
  process.kill(process.pid, 'SIGTERM')
})

/**
 * Graceful shut downs.
 */
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.')
  logger.info('Closing http server.')
  server.close(() => logger.info('Http server closed.'))
})

main()
