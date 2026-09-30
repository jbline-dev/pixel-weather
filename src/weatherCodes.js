const WEATHER_CODES = {
  0: { label: 'Clear sky', scene: 'clear' },
  1: { label: 'Mainly clear', scene: 'clear' },
  2: { label: 'Partly cloudy', scene: 'cloudy' },
  3: { label: 'Overcast', scene: 'cloudy' },
  45: { label: 'Fog', scene: 'fog' },
  48: { label: 'Freezing fog', scene: 'fog' },
  51: { label: 'Light drizzle', scene: 'rain' },
  53: { label: 'Drizzle', scene: 'rain' },
  55: { label: 'Heavy drizzle', scene: 'rain' },
  56: { label: 'Freezing drizzle', scene: 'rain' },
  57: { label: 'Heavy freezing drizzle', scene: 'rain' },
  61: { label: 'Light rain', scene: 'rain' },
  63: { label: 'Rain', scene: 'rain' },
  65: { label: 'Heavy rain', scene: 'rain' },
  66: { label: 'Freezing rain', scene: 'rain' },
  67: { label: 'Heavy freezing rain', scene: 'rain' },
  71: { label: 'Light snow', scene: 'snow' },
  73: { label: 'Snow', scene: 'snow' },
  75: { label: 'Heavy snow', scene: 'snow' },
  77: { label: 'Snow grains', scene: 'snow' },
  80: { label: 'Light rain showers', scene: 'rain' },
  81: { label: 'Rain showers', scene: 'rain' },
  82: { label: 'Violent rain showers', scene: 'rain' },
  85: { label: 'Light snow showers', scene: 'snow' },
  86: { label: 'Heavy snow showers', scene: 'snow' },
  95: { label: 'Thunderstorm', scene: 'thunder' },
  96: { label: 'Thunderstorm with hail', scene: 'thunder' },
  99: { label: 'Severe thunderstorm with hail', scene: 'thunder' },
}

export function describeWeather(code) {
  return WEATHER_CODES[code] ?? { label: 'Unknown', scene: 'clear' }
}