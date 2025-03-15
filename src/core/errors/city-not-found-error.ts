import { DomainError } from './domain-error'

export class CityNotFoundError extends DomainError {
  statusCode: number

  constructor(city: string) {
    super(`Could not find weather data for city [${city}]`)
    this.statusCode = 404
    Object.setPrototypeOf(this, CityNotFoundError.prototype)
  }
}
