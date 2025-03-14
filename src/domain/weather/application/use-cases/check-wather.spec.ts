import { expect, test } from 'vitest'
import { CheckWeather } from './check-weather'

test('Check weather', () => {
  const checkWeather = new CheckWeather()

  const city = 'London'
  const weather = checkWeather.execute({ city })

  expect(weather.city).toBe(city)
})
