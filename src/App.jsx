import { useState, useEffect } from 'react'
import { describeWeather } from './weatherCodes'
import Scene from './components/Scene'

const DEFAULT_LOCATION = {
  name: 'Davao City',
  country: 'Philippines',
  latitude: 7.19,
  longitude: 125.45,
}

function buildWeatherUrl({ latitude, longitude }) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current:
      'temperature_2m,weather_code,is_day,wind_speed_10m,cloud_cover,precipitation',
    timezone: 'auto',
  })
  return `https://api.open-meteo.com/v1/forecast?${params}`
}

function App() {
  const [location] = useState(DEFAULT_LOCATION)
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadWeather() {
      try {
        const response = await fetch(buildWeatherUrl(location), {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const data = await response.json()
        setWeather(data.current)
        setError(null)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message)
      }
    }

    loadWeather()

    return () => controller.abort()
  }, [location])

  const condition = weather ? describeWeather(weather.weather_code) : null

  return (
    <main className="app">
      <h1>Pixel Weather</h1>

      {error && <p>Something went wrong: {error}</p>}
      {!error && !weather && <p>Loading...</p>}
      {weather && (
        <div className="layout">
          <Scene
            isDay={weather.is_day === 1}
            cloudCover={weather.cloud_cover}
            scene={condition.scene}
          />
          <section className="report">
            <p className="report__place">
              {location.name}, {location.country}
            </p>
            <p className="report__temp">{weather.temperature_2m}°C</p>
            <p className="report__condition">{condition.label}</p>
            <p className="report__time">{weather.is_day ? 'Day' : 'Night'}</p>
            <ul className="report__details">
              <li>Wind: {weather.wind_speed_10m} km/h</li>
              <li>Clouds: {weather.cloud_cover}%</li>
              <li>Precipitation: {weather.precipitation} mm</li>
            </ul>
          </section>
        </div>
      )}
    </main>
  )
}

export default App