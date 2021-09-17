import { Router } from 'express'
import { analytics } from '../middlewares'
import { routesV1 } from './v1'
import { routesV2 } from './v2'

const routes = Router()

routes.get('/_health', (_req, res) => {
  res.json({ status: 'OK' })
})

routes.get('/loaderio-deb75e3581d893735fd6e5050757bdb2', (_req, res) => {
  res.send('loaderio-deb75e3581d893735fd6e5050757bdb2')
})

routes.use('/v2', analytics, routesV2)
routes.use('/', analytics, routesV1)

export { routes }
