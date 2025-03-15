export class ExternalServiceError extends Error {
  public readonly statusCode: number
  public readonly code: string

  constructor(message: string, statusCode = 503, code = '') {
    super(message)

    this.statusCode = statusCode
    this.code = code

    Object.setPrototypeOf(this, ExternalServiceError.prototype)
  }
}
