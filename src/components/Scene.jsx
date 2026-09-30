import './Scene.css'
import { CLOUDS, MAX_DROPS, cloudCount } from './scene/sceneData'
import { Sun, Moon, Stars, Cloud } from './scene/sky'
import { Rain, Snow, Fog, Bolt } from './scene/effects'

function rainCount(mm) {
  if (mm < 0.5) return 8
  if (mm < 2.5) return 16
  return 24
}

function windFactor(speed) {
  return Math.max(0.25, 1 - speed / 50)
}

function windDrift(speed) {
  return Math.round(Math.min(speed, 40) / 5)
}

function Scene({ isDay, cloudCover, scene, precipitation, windSpeed }) {
  const time = isDay ? 'day' : 'night'
  const stormy = scene === 'rain' || scene === 'thunder'
  const snowy = scene === 'snow'
  const foggy = scene === 'fog'
  const overcast = stormy || snowy
  const clouds = overcast ? 3 : foggy ? 0 : cloudCount(cloudCover)
  const cloudSpeed = windFactor(windSpeed)
  const dropCount = scene === 'thunder' ? MAX_DROPS : rainCount(precipitation)

  return (
    <div
      className={`scene scene--${time} scene--${scene}`}
      style={{ '--drift': `${windDrift(windSpeed)}px` }}
      aria-hidden="true"
    >
      <svg
        className="scene__svg"
        viewBox="0 0 64 36"
        shapeRendering="crispEdges"
      >
        {!overcast && !foggy && (isDay ? <Sun /> : <><Stars /><Moon /></>)}
        {CLOUDS.slice(0, clouds).map((cloud, i) => (
          <Cloud
            key={i}
            {...cloud}
            duration={cloud.duration * cloudSpeed}
          />
        ))}
        {scene === 'thunder' && <Bolt />}
        {stormy && <Rain count={dropCount} />}
        {snowy && <Snow />}
        {foggy && <Fog />}
        <rect x="0" y="28" width="64" height="8" fill="#38b764" />
        <rect x="0" y="28" width="64" height="1" fill="#a7f070" />
      </svg>
      {scene === 'thunder' && <div className="scene__flash" />}
    </div>
  )
}

export default Scene