export function formatTemp(celsius, units) {
  const value = units === 'imperial' ? (celsius * 9) / 5 + 32 : celsius
  const symbol = units === 'imperial' ? '°F' : '°C'
  return `${Math.round(value * 10) / 10}${symbol}`
}

export function formatWind(kmh, units) {
  if (units === 'imperial') {
    return `${Math.round(kmh * 0.621371 * 10) / 10} mph`
  }
  return `${kmh} km/h`
}

export function formatRain(mm, units) {
  if (units === 'imperial') {
    return `${(mm / 25.4).toFixed(2)} in`
  }
  return `${mm} mm`
}