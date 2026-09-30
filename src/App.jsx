import { useState, useEffect } from 'react'
import { describeWeather } from './weatherCodes'
import Scene from './components/scene';

const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=7.19&longitude=125.45&current=temperature_2m,weather_code,is_day,wind_speed_10m,cloud_cover,precipitation&timezone=auto'

function App() {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadWeather() {
      try {
        const response = await fetch(WEATHER_URL)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const data = await response.json()
        setWeather(data.current)
      } catch (err) {
        setError(err.message)
      }
    }

    loadWeather()
  }, [])

  const condition = weather ? describeWeather(weather.weather_code) : null

  return (
    <main className="app">
      <h1>Pixel Weather</h1>

      {error && <p>Something went wrong: {error}</p>}
      {!error && !weather && <p>Loading...</p>}
      {weather && (
        <Scene
          isDay={weather.is_day === 1}
          cloudCover={weather.cloud_cover}
          scene={condition.scene}
        />
      )}
      {weather && (
        <section className="report">
          <p className="report__temp">{weather.temperature_2m}°C</p>
          <p className="report__condition">{condition.label}</p>
          <p className="report__time">{weather.is_day ? 'Day' : 'Night'}</p>
          <ul className="report__details">
            <li>Wind: {weather.wind_speed_10m} km/h</li>
            <li>Clouds: {weather.cloud_cover}%</li>
            <li>Precipitation: {weather.precipitation} mm</li>
          </ul>
        </section>
      )}
    </main>
  )
}

export default App