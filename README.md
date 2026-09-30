# Pixiecast

A weather app where the weather is a living pixel-art world. Real conditions
from any city drive the scene: clouds drift faster in wind, rain gets heavier
with precipitation, storms flash with lightning, and night brings stars.

**Live demo:** https://pixiecast.vercel.app/
## Features

- Live weather from Open-Meteo (no simulated data)
- City search and "use my location"
- Scene driven by weather code, day/night, cloud cover, precipitation and wind
- Animated rain, snow, fog, thunderstorms and clouds, in pixel steps
- °C / °F toggle
- Responsive layout, keyboard accessible, respects reduced-motion settings

## Tech

React 19, Vite, plain CSS and SVG. No UI or animation libraries.

## What I learned

- Fetching async data in `useEffect`, and cancelling outdated requests with
  `AbortController`
- Deriving a loading state from data instead of storing it
- Driving CSS animations from React data with custom properties
- Drawing pixel art with SVG rects and `steps()` animation

## Run locally

    npm install
    npm run dev

## Credits

Weather data by [Open-Meteo](https://open-meteo.com/), used under their free
non-commercial tier.