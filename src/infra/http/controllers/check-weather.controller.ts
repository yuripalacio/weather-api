import { Request, Response } from 'express'
import { CheckWeatherUseCase } from '@/domain/weather/application/use-cases/check-weather'
import { z } from 'zod'
import { WeatherPresenter } from '../presenters/weather-presenter'

const querySchema = z.object({
  city: z.string().nonempty('City param is required')
})

export class CheckWeatherController {
  constructor(private checkWeatherUseCase: CheckWeatherUseCase) {}

  async handle(request: Request, response: Response): Promise<void> {
    const { city } = querySchema.parse(request.query)

    const weather = await this.checkWeatherUseCase.execute({ city })

    response.status(200).json({
      weather: WeatherPresenter.toHTTP(weather)
    })
  }
}
