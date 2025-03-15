# Weather API

A simple Node.js/TypeScript API that fetches weather data from the [OpenWeather API](https://openweathermap.org/) using Clean Architecture principles. This project demonstrates:

- **Express** for HTTP server
- **TypeScript** for static typing
- **Clean Architecture** for layered design
- **Zod** for runtime validation
- **Swagger** for API documentation
- **Axios** for external HTTP calls (with optional retry)
- **Vitest** + **Supertest** for testing

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation (Swagger)](#api-documentation-swagger)
- [Endpoints](#endpoints)
- [Testing](#testing)
  - [Unit Tests](#unit-tests)
  - [E2E Tests](#e2e-tests)
- [Error Handling](#error-handling)
- [License](#license)

---

## Project Structure

A simplified view of the folders (omitting some files for brevity):

```
src
├─ domain
│  └─ weather
│     ├─ enterprise
│     │  └─ entities
│     │     └─ weather.ts
│     └─ application
│        ├─ gateways
│        │  └─ weather-gateway.ts
│        └─ use-cases
│           └─ check-weather.ts
├─ infra
│  ├─ gateways
│  │  ├─ open-weather-gateway.ts
│  │  └─ mappers
│  │     └─ open-weather-mapper.ts
│  ├─ http
│  │  ├─ controllers
│  │  │  └─ check-weather.controller.ts
│  │  ├─ middleware
│  │  │  ├─ error-handler.ts
│  │  │  └─ rate-limiter.ts
│  │  ├─ presenters
│  │  │  └─ weather-presenter.ts
│  │  └─ routes
│  │     ├─ weather.routes.ts
│  │     └─ index.ts
│  └─ ...
├─ core
│  ├─ docs
│  │  ├─ swagger.config.ts
│  │  └─ swagger.ts
│  └─ errors
│     ├─ domain-error.ts
│     ├─ external-service-error.ts
│     └─ city-not-found-error.ts
├─ tests
│  ├─ factories
│  ├─ gateways
│  └─ setup-e2e.ts
└─ ...
```

- **domain/weather**: Contains entities (`Weather`), application use-cases (`CheckWeatherUseCase`), and gateway interfaces.
- **infra/gateways**: Concrete implementations of those gateway interfaces (e.g., `OpenWeatherGateway`).
- **infra/http**: Express-related code (controllers, routes, middleware).
- **core/errors**: Custom error classes (e.g., `DomainError`, `ExternalServiceError`, etc.).
- **docs**: Swagger/OpenAPI configuration files.

---

## Getting Started

### Prerequisites

- **Node.js** v20+
- **npm**
- **OpenWeather API Key** (sign up at [openweathermap.org](https://openweathermap.org/) if you need one)

---

## Configuration

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Environment Variables**: Create a `.env` file in the project root (following the `.env.example` file). For example:

3. **Optional**: If you have a `.env.test` for your tests, set it similarly but only with the variables you want to overwrite.

---

## Running the Application

```bash
npm run start:dev
```

This starts the server in development mode (with TypeScript watch, if configured).

- The server listens on `http://localhost:3333` (or your configured `PORT`).
- You can test the `/health-check` endpoint or check the [Swagger docs](#api-documentation-swagger).

---

## API Documentation (Swagger)

This project integrates **Swagger** via [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express). The documentation is served at:

```
GET /api-docs
```

When you visit `http://localhost:3333/api-docs` in your browser, you’ll see the interactive Swagger UI. From there, you can:

- See all endpoints and their documentation.
- “Try it out” to test requests from the browser.
- View example request/response schemas.

---

## Endpoints

### Health Check

```
GET /health-check
```

- Returns a simple JSON to confirm the service is running.
- Example response:
  ```json
  {
    "message": "Server is running"
  }
  ```

### Weather

```
GET /weather?city=SomeCity
```

- **Query Parameter**: `city` (string, required)
- Returns weather data for the specified city by calling OpenWeather.
- Example response:
  ```json
  {
    "weather": {
      "city": "London",
      "temperature": 21.5,
      "weather": "Clouds",
      "description": "scattered clouds"
    }
  }
  ```
- If `city` is missing, a **400** is returned.
- If the city is not found, a **404** is returned.
- If the external service is down, a **503** is returned.

---

## Testing

### Unit Tests

We use [Vitest](https://vitest.dev/) for unit tests. Run them with:

```bash
npm run test
```

### E2E Tests

For **end-to-end** tests, we often use [supertest](https://www.npmjs.com/package/supertest) to call.

```bash
npm run test:e2e
```

- Looks for tests in `tests/e2e/**/*.spec.ts`.
- Ensures the server endpoints (e.g., `/weather`) and actual route logic work as expected.

---

## Error Handling

We have a **centralized error-handling middleware** (`error-handler.ts`). All domain or infrastructure errors are either:

- Thrown as **custom errors** (e.g., `DomainError`, `CityNotFoundError`, `ExternalServiceError`)
- Caught by the middleware, which returns the correct HTTP status code (e.g., 400, 404, 503).

---

## License

This project is licensed under the [MIT License](LICENSE), though you can choose whichever license suits your needs.

---

### Additional Notes

- **Zod Validation**: In `CheckWeatherController`, we use a Zod schema to parse and validate the `city` query param:

  If validation fails, a `ZodError` is thrown, and our error handler returns a **400** response.

- **Rate Limiting**: If you want to add rate-limiting, you can use [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) in `rate-limiter.ts` and apply it globally or per-route.

- **Axios Retry**: We optionally use [axios-retry](https://www.npmjs.com/package/axios-retry) in `open-weather-gateway.ts` to handle transient network errors.

---

**Thank you for checking out the Weather API project!** If you have any questions or run into issues, please reach out.
