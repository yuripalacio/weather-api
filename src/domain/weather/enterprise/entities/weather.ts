interface WeatherProps {
  city: string
  weather: string
  detail: string
  temperature: number
}

export class Weather {
  private _city: string
  private _weather: string
  private _detail: string
  private _temperature: number

  constructor(props: WeatherProps) {
    this._city = props.city
    this._weather = props.weather
    this._detail = props.detail
    this._temperature = props.temperature
  }

  get city() {
    return this._city
  }

  get weather() {
    return this._weather
  }

  get detail() {
    return this._detail
  }

  get temperature() {
    return this._temperature
  }

  static create(props: WeatherProps) {
    const weather = new Weather(props)

    return weather
  }
}
