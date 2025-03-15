import 'dotenv/config'
import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  HOST: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().default(3333),
  OPEN_WEATHER_API_KEY: z.string(),
  WINDOW_MS: z.coerce.number().default(15 * 60 * 1000), // 15 minutes
  MAX_LIMIT_EACH_IP: z.coerce.number().default(50)
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables:', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
