import { DomainError } from '@/core/errors/domain-error'
import { ExternalServiceError } from '@/core/errors/external-service-error'
import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof DomainError) {
    res.status(err.statusCode).json({
      message: err.message,
      code: err.code,
      statusCode: err.statusCode
    })

    return
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      errors: err.errors
    })

    return
  }

  if (err instanceof ExternalServiceError) {
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
