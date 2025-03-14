export class DomainError extends Error {
  public readonly statusCode: number
  public readonly code: string

  constructor(message: string, statusCode = 400, code = '') {
    super(message)

    this.statusCode = statusCode
    this.code = code

    Object.setPrototypeOf(this, DomainError.prototype)
  }
}
