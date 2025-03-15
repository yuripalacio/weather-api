import { envSchema } from '@/infra/env'
import { config } from 'dotenv'

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

envSchema.parse(process.env)
