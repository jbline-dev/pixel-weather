import { MAX_DROPS } from './sceneData'

const DROPS = Array.from({ length: MAX_DROPS }, (_, i) => ({
  x: (i * 37 + 11) % 64,
  height: 2 + (i % 3),
  duration: 0.4 + ((i * 7) % 5) / 10,
  delay: -(((i * 13) % 17) / 17) * 0.8,
}))

const FLAKES = Array.from({ length: 20 }, (_, i) => ({
  x: (i * 13) % 64,
  delay: -((i * 9) % 20) / 2,
  duration: 6 + (i % 4),
}))

export function Rain({ count }) {
  return (
    <g fill="#73eff7">
      {DROPS.slice(0, count).map((drop, i) => (
        <rect
          key={i}
          className="drop"
          x={drop.x}
          y="0"
          width="1"
          height={drop.height}
          style={{
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
          }}
        />
      ))}
    </g>
  )
}

export function Snow() {
  return (
    <g fill="#f4f4f4">
      {FLAKES.map((flake, i) => (
        <rect
          key={i}
          className="flake"
          x={flake.x}
          y="0"
          width="1"
          height="1"
          style={{
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
          }}
        />
      ))}
    </g>
  )
}

export function Fog() {
  return (
    <g className="fog" fill="#c2c3c7">
      <rect x="-16" y="12" width="48" height="3" />
      <rect x="20" y="18" width="52" height="3" />
      <rect x="-8" y="23" width="44" height="3" />
    </g>
  )
}

export function Bolt() {
  return (
    <g className="bolt" fill="#ffcd75">
      <rect x="32" y="9" width="3" height="3" />
      <rect x="30" y="12" width="4" height="3" />
      <rect x="31" y="15" width="3" height="3" />
      <rect x="28" y="18" width="4" height="3" />
      <rect x="29" y="21" width="2" height="4" />
    </g>
  )
}