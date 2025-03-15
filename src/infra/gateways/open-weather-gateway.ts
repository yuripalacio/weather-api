import axios from 'axios'
import { z } from 'zod'
import { WeatherGateway } from '@/domain/weather/application/gateways/weather-gateway'
import { Weather } from '@/domain/weather/enterprise/entities/weather'
import { OpenWeatherMapper } from './mappers/open-weather-mapper'
import { ExternalServiceError } from '@/core/errors/external-service-error'
import { CityNotFoundError } from '@/core/errors/city-not-found-error'
import axiosRetry from 'axios-retry'
import { axiosWithRetry } from '../http/axios-with-retry'

const openWeatherResponseSchema = z.object({
  coord: z.object({
    lon: z.number(),
    lat: z.number()
  }),
  weather: z.array(
    z.object({
      id: z.number(),
      main: z.string(),
      description: z.string(),
      icon: z.string()
    })
  ),
  base: z.string(),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number(),
    humidity: z.number(),
    sea_level: z.number(),
    grnd_level: z.number()
  }),
  visibility: z.number(),
  wind: z.object({
    speed: z.number(),
    deg: z.number()
  }),
  clouds: z.object({
    all: z.number()
  }),
  dt: z.number(),
  timezone: z.number(),
  id: z.number(),
  name: z.string(),
  cod: z.number()
})

export type OpenWeatherResponse = z.infer<typeof openWeatherResponseSchema>

const API_VERSION = '2.5'
const TEMPERATURE_UNIT_MEASUREMENT = 'metric'

export class OpenWeatherGateway implements WeatherGateway {
  async checkWeather(city: string): Promise<Weather> {
    const apiKey = process.env.OPEN_WEATHER_API_KEY

    try {
      const { data } = await axiosWithRetry.get<unknown>(`https://api.openweathermap.org/data/${API_VERSION}/weather`, {
        params: {
          q: city,
          appid: apiKey,
          units: TEMPERATURE_UNIT_MEASUREMENT
        }
      })

      const parsedData = openWeatherResponseSchema.parse(data)

      const weather = OpenWeatherMapper.toDomain(parsedData)

      return weather
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new CityNotFoundError(city)
        } else {
          throw new ExternalServiceError('Weather service is currently unavailable.')
        }
      }
      throw new ExternalServiceError('Unexpected error', 500)
    }
  }
}
