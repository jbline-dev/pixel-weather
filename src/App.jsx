import { useState, useEffect } from 'react'
import { describeWeather } from './weatherCodes'
import Scene from './components/scene'
import SearchBox from './components/SearchBox'

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
  const [location, setLocation] = useState(DEFAULT_LOCATION)
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
        setWeather({ location, current: data.current })
      } catch (err) {
        if (err.name === 'AbortError') return
        setError({ location, message: err.message })
      }
    }

    loadWeather()

    return () => controller.abort()
  }, [location])

  const current = weather?.current
  const errorMessage = error?.location === location ? error.message : null
  const isLoading = !errorMessage && weather?.location !== location
  const condition = current ? describeWeather(current.weather_code) : null

  return (
    <main className="app">
      <h1>Pixel Weather</h1>

      <SearchBox onSelect={setLocation} />

      <div className="status" role="status">
        {isLoading && 'Loading weather...'}
      </div>

      {errorMessage && (
        <p role="alert">Something went wrong: {errorMessage}</p>
      )}

      {current && !errorMessage && (
        <div className={`layout${isLoading ? ' layout--loading' : ''}`}>
          <Scene
            isDay={current.is_day === 1}
            cloudCover={current.cloud_cover}
            scene={condition.scene}
          />
          <section className="report">
            <p className="report__place">
              {[weather.location.name, weather.location.country]
                .filter(Boolean)
                .join(', ')}
            </p>
            <p className="report__temp">{current.temperature_2m}°C</p>
            <p className="report__condition">{condition.label}</p>
            <p className="report__time">{current.is_day ? 'Day' : 'Night'}</p>
            <ul className="report__details">
              <li>Wind: {current.wind_speed_10m} km/h</li>
              <li>Clouds: {current.cloud_cover}%</li>
              <li>Precipitation: {current.precipitation} mm</li>
            </ul>
          </section>
        </div>
      )}
    </main>
  )
}

export default App