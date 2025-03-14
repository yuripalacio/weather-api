import { Weather } from '@/domain/weather/enterprise/entities/weather'
import { WeatherGateway } from '../gateways/weather-gateway'
import { CheckWeather } from './check-weather'

const fakeWeatherGateway: WeatherGateway = {
  checkWeather: async function (city: string): Promise<Weather> {
    return new Weather({
      city: city,
      weather: 'Cloudy',
      detail: 'Cloudy with a chance of meatballs',
      temperature: 20
    })
  }
}

test('Check weather', async () => {
  const checkWeather = new CheckWeather(fakeWeatherGateway)

  const city = 'London'
  const weather = await checkWeather.execute({ city })

  expect(weather.city).toBe(city)
})
