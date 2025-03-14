import { Weather } from '../../enterprise/entities/weather'

interface CheckWeatherRequest {
  city: string
}

export class CheckWeather {
  execute({ city }: CheckWeatherRequest) {
    const weather = new Weather({
      city,
      weather: 'sunny',
      detail: 'clear sky',
      temperature: 25
    })

    return weather
  }
}
