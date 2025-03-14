import { Weather } from '@/domain/weather/enterprise/entities/weather'
import { WeatherGateway } from '../gateways/weather-gateway'
import { DomainError } from '../errors/domain-error'

interface CheckWeatherRequest {
  city: string
}

export class CheckWeather {
  constructor(private weatherGateway: WeatherGateway) {}

  async execute({ city }: CheckWeatherRequest): Promise<Weather> {
    if (!city) {
      throw new DomainError('City is required', 400)
    }

    const weather = await this.weatherGateway.checkWeather(city)

    if (!weather) {
      throw new DomainError(`Does not find the weather for the given city [${city}]`, 404)
    }

    return weather
  }
}
