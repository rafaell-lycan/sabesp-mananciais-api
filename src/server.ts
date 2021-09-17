import 'dotenv/config'
import { Server } from 'http'
import errorhandler from 'errorhandler'

import {app} from './application'
import {logger} from './utils/logger'

/**
 * Error Handler. Provides full stack
 */
if (!app.get('prod')) {
  app.use(errorhandler())
}

/**
 * Start Express server.
 */
let server: Server

async function main() {
  server = await app.listen(app.get('port'), () => {
    logger.info(`⚡️ Server listening on http://localhost:${app.get('port')}`)
    logger.info('Press CTRL-C to stop')
  })
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
