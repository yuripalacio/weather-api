import { Router } from 'express'
import { healthCheckRoutes } from './health-check.routes'
import { weatherRoutes } from './weather.routes'

const router = Router()

router.use('/health-check', healthCheckRoutes)
router.use('/weather', weatherRoutes)

export { router }
