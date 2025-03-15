import { Weather } from '@/domain/weather/enterprise/entities/weather'
import { OpenWeatherResponse } from '../open-weather-gateway'

export class OpenWeatherMapper {
  static toDomain(raw: OpenWeatherResponse): Weather {
    return Weather.create({
      city: raw.name,
      temperature: raw.main.temp,
      weather: raw.weather[0].main,
      detail: raw.weather[0].description
    })
  }
}
