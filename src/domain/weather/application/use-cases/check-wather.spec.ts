import { CheckWeather } from './check-weather'
import { InMemoryWeatherGateway } from 'test/gateways/in-memory-weather-gateway'

let inMemoryWeatherGateway: InMemoryWeatherGateway
let sut: CheckWeather

describe('Check weather', () => {
  beforeEach(() => {
    inMemoryWeatherGateway = new InMemoryWeatherGateway()
    sut = new CheckWeather(inMemoryWeatherGateway)
  })

  it('should return the weather for the given city', async () => {
    const city = 'São Paulo'
    const weather = await sut.execute({ city })

    expect(weather.city).toBe(city)
  })

  it('should return a error for non exist city', async () => {
    const city = 'non-exist'

    await expect(sut.execute({ city })).rejects.toThrowError(`Does not find the weather for the given city [${city}]`)
  })

  it('should return a error for empty city', async () => {
    const city = ''

    await expect(sut.execute({ city })).rejects.toThrowError('City is required')
  })
})
