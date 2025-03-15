import { env } from '@/infra/env'
import { SwaggerDefinition, Options } from 'swagger-jsdoc'

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Weather API',
    version: '1.0.0',
    description: 'Weather API used for an interview'
  },
  servers: [
    {
      url: `${env.HOST}:${env.PORT}`,
      description: 'Development server'
    }
  ]
}

const options: Options = {
  swaggerDefinition,
  apis: ['./src/infra/http/routes/*.ts', './src/infra/http/controllers/*.ts']
}

export default options
