import { Weather } from '@/domain/weather/enterprise/entities/weather'
import { WeatherGateway } from '../gateways/weather-gateway'

interface CheckWeatherRequest {
  city: string
}

export class CheckWeather {
  constructor(private weatherGateway: WeatherGateway) {}

  async execute({ city }: CheckWeatherRequest): Promise<Weather> {
    const weather = await this.weatherGateway.checkWeather(city)

    return weather
  }
}
