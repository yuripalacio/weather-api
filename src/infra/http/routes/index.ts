import { Router } from 'express'
import { healthCheckRoutes } from './health-check.routes'

const router = Router()

router.use('/health-check', healthCheckRoutes)

export { router }
