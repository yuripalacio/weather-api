import { CheckWeatherUseCase } from '@/domain/weather/application/use-cases/check-weather'
import { OpenWeatherGateway } from '@/infra/gateways/open-weather-gateway'
import { Router, Request, Response, NextFunction } from 'express'
import { CheckWeatherController } from '../controllers/check-weather.controller'

const weatherRoutes = Router()

const openWeatherGateway = new OpenWeatherGateway()
const checkWeatherUseCase = new CheckWeatherUseCase(openWeatherGateway)
const checkWeatherController = new CheckWeatherController(checkWeatherUseCase)

weatherRoutes.get('/', async (request: Request, response: Response, next: NextFunction) => {
  await checkWeatherController.handle(request, response)
})

export { weatherRoutes }
