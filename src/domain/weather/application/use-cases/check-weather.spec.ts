import { CheckWeatherUseCase } from './check-weather'
import { InMemoryWeatherGateway } from 'test/gateways/in-memory-weather-gateway'

let inMemoryWeatherGateway: InMemoryWeatherGateway
let sut: CheckWeatherUseCase

describe('Check weather', () => {
  beforeEach(() => {
    inMemoryWeatherGateway = new InMemoryWeatherGateway()
    sut = new CheckWeatherUseCase(inMemoryWeatherGateway)
  })

  it('should return the weather for the given city', async () => {
    const city = 'São Paulo'
    const weather = await sut.execute({ city })

    expect(weather.city).toBe(city)
  })

  it('should return a error for empty city', async () => {
    const city = ''

    await expect(sut.execute({ city })).rejects.toThrowError('City is required')
  })
})
