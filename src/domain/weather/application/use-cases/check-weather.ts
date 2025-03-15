import { Weather } from '@/domain/weather/enterprise/entities/weather'
import { WeatherGateway } from '../gateways/weather-gateway'
import { DomainError } from '@/core/errors/domain-error'

interface CheckWeatherRequest {
  city: string
}

export class CheckWeatherUseCase {
  constructor(private weatherGateway: WeatherGateway) {}

  async execute({ city }: CheckWeatherRequest): Promise<Weather> {
    if (!city || !city.trim()) {
      throw new DomainError('City is required', 400)
    }

    const weather = await this.weatherGateway.checkWeather(city)

    return weather
  }
}
