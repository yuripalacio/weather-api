import { faker } from '@faker-js/faker'
import { Weather, WeatherProps } from '@/domain/weather/enterprise/entities/weather'

export function makeWeather(override: Partial<WeatherProps> = {}) {
  const weather = Weather.create({
    city: faker.location.city(),
    temperature: faker.number.float({ multipleOf: 0.1, min: -30, max: 50 }),
    weather: faker.lorem.word({ length: { min: 5, max: 8 } }),
    detail: faker.lorem.sentence({ min: 15, max: 30 }),
    ...override
  })

  return weather
}
