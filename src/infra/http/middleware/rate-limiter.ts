import { env } from '@/infra/env'
import rateLimit from 'express-rate-limit'

export const apiRateLimiter = rateLimit({
  windowMs: env.WINDOW_MS,
  max: env.MAX_LIMIT_EACH_IP,
  handler: (req, res) => {
    res.status(429).json({
      status: 429,
      error: 'Too many requests',
      message: `Too many requests, please try again after ${env.WINDOW_MS / 1000 / 60} minutes.`
    })
  },
  standardHeaders: true,
  legacyHeaders: false
})
