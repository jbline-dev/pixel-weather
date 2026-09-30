import { useState } from 'react'
import './SearchBox.css'

function SearchBox({ onSelect }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [status, setStatus] = useState('idle')

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
      </form>

      <div role="status">
        {status === 'loading' && <p className="search__msg">Searching...</p>}
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