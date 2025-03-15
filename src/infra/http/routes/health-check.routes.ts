import { Router, Request, Response } from 'express'

const healthCheckRoutes = Router()

/**
 * @openapi
 * /health-check:
 *   get:
 *     tags: ["Health Check"]
 *     summary: Check if the server is running
 *     description: Return a message if the server is running.
 *     responses:
 *       200:
 *         description: Successfully retrieved status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Server is running"
 */
healthCheckRoutes.get('/', (_request: Request, response: Response) => {
  response.status(200).send({ message: 'Server is running' })
})

export { healthCheckRoutes }
