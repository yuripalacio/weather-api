import { DomainError } from '@/domain/weather/application/errors/domain-error'
import { Request, Response, NextFunction } from 'express'

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof DomainError) {
    res.status(err.statusCode).json({
      message: err.message,
      code: err.code,
      statusCode: err.statusCode
    })

    return
  }

  console.error(err)

  res.status(500).json({
    status: 'error',
    message: `Internal server error`
  })
}
