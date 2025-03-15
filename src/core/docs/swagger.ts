import swaggerJSDoc from 'swagger-jsdoc'
import options from './swagger.config'

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
