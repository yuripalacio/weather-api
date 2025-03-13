import { Router, Request, Response } from 'express'

const healthCheckRoutes = Router()

healthCheckRoutes.get('/', (_request: Request, response: Response) => {
  response.status(200).send({ message: 'Server is running' })
})

export { healthCheckRoutes }
