import path from 'path'
import express from 'express'
import cors from 'cors'
import favicon from 'serve-favicon'
import helmet from 'helmet'
import morgan from 'morgan'

// import swagger from './common/middleware/swagger'
import { routes } from './api/routes'
import { errorHandler, notFoundHandler } from './api/middlewares'

const app = express()

app.set('prod', ['production', 'heroku'].includes(process.env.NODE_ENV))
app.set('env', process.env.NODE_ENV ? process.env.NODE_ENV : 'development')
app.set('port', process.env.PORT ? parseInt(process.env.PORT, 10) : 3000)

app.use(helmet())
app.use(cors())
app.use(morgan(app.get('prod') ? 'combined': 'dev'))
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')))
// swagger(app)

app.use(routes)

app.use(notFoundHandler)
app.use(errorHandler)

export { app }
