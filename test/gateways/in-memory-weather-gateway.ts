import { WeatherGateway } from '@/domain/weather/application/gateways/weather-gateway'
import { Weather } from '@/domain/weather/enterprise/entities/weather'
import { makeWeather } from '../factories/make-weather'

export class InMemoryWeatherGateway implements WeatherGateway {
  public items: Weather[] = []

  async checkWeather(city: string): Promise<Weather> {
    this.items.push(makeWeather({ city }))

    const weather = this.items.find((data) => data.city === city) as Weather

    return weather
  }
}
