import express from 'express'
import cors from 'cors'
import { router } from './routes'

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: '*',
    exposedHeaders: ['Content-Type', 'Content-Length']
  })
)

app.use(router)

export { app }
