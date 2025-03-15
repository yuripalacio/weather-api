import request from 'supertest'
import { app } from '@/infra/http/app'

describe('Check weather by City (E2E)', () => {
  it('should return 400 if "city" query param is missing', async () => {
    const response = await request(app).get('/weather')
    expect(response.status).toBe(400)
    expect(response.body).toMatchObject({
      errors: expect.any(Array)
    })
  })

  it('should return 404 if the requested city does not exist', async () => {
    const city = 'NON-EXIST'
    const response = await request(app).get('/weather').query({ city })

    expect(response.status).toBe(404)
    expect(response.body).toMatchObject({
      message: expect.stringContaining(`Could not find weather data for city [${city}]`)
    })
  })

  it('should return 200 and the weather data if a valid city is provided', async () => {
    const response = await request(app).get('/weather').query({ city: 'São Paulo' })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('weather')
    expect(response.body.weather).toEqual({
      city: 'São Paulo',
      weather: expect.any(String),
      detail: expect.any(String),
      temperature: expect.any(Number)
    })
  })
})
