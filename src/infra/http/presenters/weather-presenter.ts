import { Weather } from '@/domain/weather/enterprise/entities/weather'

export class WeatherPresenter {
  static toHTTP(weather: Weather) {
    return {
      city: weather.city,
      temperature: weather.temperature,
      weather: weather.weather,
      detail: weather.detail
    }
  }
}
