import { CheckWeatherUseCase } from '@/domain/weather/application/use-cases/check-weather'
import { OpenWeatherGateway } from '@/infra/gateways/open-weather-gateway'
import { Router, Request, Response, NextFunction } from 'express'
import { CheckWeatherController } from '../controllers/check-weather.controller'

const weatherRoutes = Router()

const openWeatherGateway = new OpenWeatherGateway()
const checkWeatherUseCase = new CheckWeatherUseCase(openWeatherGateway)
const checkWeatherController = new CheckWeatherController(checkWeatherUseCase)

/**
 * @openapi
 * /weather:
 *   get:
 *     tags: ["Weather"]
 *     summary: Get weather information for a city
 *     description: Returns weather data for the specified city.
 *     parameters:
 *       - in: query
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the city.
 *     responses:
 *       200:
 *         description: Successfully retrieved weather data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 weather:
 *                   type: object
 *                   properties:
 *                     city:
 *                       type: string
 *                     temperature:
 *                       type: number
 *                     description:
 *                       type: string
 *             example:
 *               weather:
 *                 city: "London"
 *                 temperature: 21.5
 *                 description: "Partly cloudy"
 *       400:
 *         description: Invalid request – the city parameter is missing or empty.
 *       404:
 *         description: City not found.
 *       503:
 *         description: Weather service is currently unavailable..
 */
weatherRoutes.get('/', async (request: Request, response: Response, next: NextFunction) => {
  await checkWeatherController.handle(request, response)
})

export { weatherRoutes }
