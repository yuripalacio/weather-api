import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { router } from './routes'
import { errorHandler } from './middleware/error-handler'
import { apiRateLimiter } from './middleware/rate-limiter'
import swaggerSpec from '@/core/docs/swagger'

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: '*',
    exposedHeaders: ['Content-Type', 'Content-Length']
  })
)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(apiRateLimiter)

app.use(router)

app.use(errorHandler)

export { app }
