import { useState } from 'react'
import './SearchBox.css'

function SearchBox({ onSelect }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [status, setStatus] = useState('idle')
  const [locating, setLocating] = useState(false)
  const [geoError, setGeoError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const name = query.trim()
    if (name.length < 2) return

    setStatus('loading')
    try {
      const params = new URLSearchParams({ name, count: 5 })
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?${params}`
      )
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      const data = await response.json()
      setResults(data.results ?? [])
      setStatus('done')
    } catch {
      setResults([])
      setStatus('error')
    }
  }

  function handlePick(place) {
    onSelect({
      name: place.name,
      country: place.country ?? '',
      latitude: place.latitude,
      longitude: place.longitude,
    })
    setQuery('')
    setResults([])
    setStatus('idle')
  }

  function handleLocate() {
    if (!navigator.geolocation) {
      setGeoError('Your browser does not support location.')
      return
    }

    setLocating(true)
    setGeoError('')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onSelect({
          name: 'Your location',
          country: '',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setLocating(false)
      },
      (err) => {
        setLocating(false)
        if (err.code === err.PERMISSION_DENIED) {
          setGeoError('Location permission denied. Search for a city instead.')
        } else {
          setGeoError('Could not get your location. Search for a city instead.')
        }
      },
      { timeout: 10000 }
    )
  }

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="search"
          aria-label="Search for a city"
          placeholder="Search a city..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="search__button" type="submit">
          Go
        </button>
        <button
          className="search__button"
          type="button"
          onClick={handleLocate}
          disabled={locating}
          aria-label="Use my location"
          title="Use my location"
        >
          {locating ? '...' : '◎'}
        </button>
      </form>

      <div role="status">
        {status === 'loading' && <p className="search__msg">Searching...</p>}
        {locating && <p className="search__msg">Finding you...</p>}
        {geoError && <p className="search__msg">{geoError}</p>}
        {status === 'error' && (
          <p className="search__msg">Search failed. Try again.</p>
        )}
        {status === 'done' && results.length === 0 && (
          <p className="search__msg">No places found.</p>
        )}
      </div>

      {results.length > 0 && (
        <ul className="search__results">
          {results.map((place) => (
            <li key={place.id}>
              <button
                className="search__result"
                type="button"
                onClick={() => handlePick(place)}
              >
                {place.name}
                {place.admin1 ? `, ${place.admin1}` : ''}
                {place.country ? `, ${place.country}` : ''}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBox