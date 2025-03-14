import { Weather } from '@/domain/weather/enterprise/entities/weather'

export interface WeatherGateway {
  checkWeather(city: string): Promise<Weather>
}
