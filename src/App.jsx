import { useState, useEffect } from 'react'

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

  return (
    <main className="app">
      <h1>Pixel Weather</h1>

      {error && <p>Something went wrong: {error}</p>}
      {!error && !weather && <p>Loading...</p>}
      {weather && (
        <p>
          {weather.temperature_2m}°C (code {weather.weather_code})
        </p>
      )}
    </main>
  )
}

export default App