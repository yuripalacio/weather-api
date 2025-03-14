import { WeatherGateway } from '@/domain/weather/application/gateways/weather-gateway'
import { Weather } from '@/domain/weather/enterprise/entities/weather'
import { makeWeather } from '../factories/make-weather'

export class InMemoryWeatherGateway implements WeatherGateway {
  public items: Weather[] = [makeWeather({ city: 'São Paulo' })]

  async checkWeather(city: string): Promise<Weather | null> {
    const weather = this.items.find((data) => data.city === city)

    return weather || null
  }
}
