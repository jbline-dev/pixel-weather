import './Scene.css'

const CLOUDS = [
  { y: 5, duration: 60, delay: -10 },
  { y: 14, duration: 90, delay: -55 },
  { y: 9, duration: 75, delay: -30 },
]

function cloudCount(cover) {
  if (cover < 20) return 0
  if (cover < 50) return 1
  if (cover < 80) return 2
  return 3
}

function Cloud({ y, duration, delay }) {
  return (
    <g
      className="cloud"
      style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
    >
      <g transform={`translate(0 ${y})`}>
        <rect x="2" y="0" width="6" height="1" />
        <rect x="1" y="1" width="10" height="1" />
        <rect x="0" y="2" width="12" height="2" />
      </g>
    </g>
  )
}

function Sun() {
  return (
    <g fill="#ffcd75">
      <rect x="48" y="6" width="4" height="1" />
      <rect x="47" y="7" width="6" height="1" />
      <rect x="46" y="8" width="8" height="4" />
      <rect x="47" y="12" width="6" height="1" />
      <rect x="48" y="13" width="4" height="1" />
    </g>
  )
}

function Moon() {
  return (
    <g>
      <g fill="#f4f4f4">
        <rect x="48" y="6" width="4" height="1" />
        <rect x="47" y="7" width="6" height="1" />
        <rect x="46" y="8" width="8" height="4" />
        <rect x="47" y="12" width="6" height="1" />
        <rect x="48" y="13" width="4" height="1" />
      </g>
      <g fill="#b1b5c9">
        <rect x="48" y="9" width="2" height="2" />
        <rect x="51" y="11" width="1" height="1" />
      </g>
    </g>
  )
}

function Stars() {
  return (
    <g fill="#f4f4f4">
      <rect x="6" y="4" width="1" height="1" />
      <rect x="14" y="10" width="1" height="1" />
      <rect x="22" y="5" width="1" height="1" />
      <rect x="30" y="12" width="1" height="1" />
      <rect x="37" y="3" width="1" height="1" />
      <rect x="58" y="16" width="1" height="1" />
      <rect x="10" y="18" width="1" height="1" />
    </g>
  )
}

const DROPS = Array.from({ length: 24 }, (_, i) => ({
  x: (i * 11) % 64,
  delay: -((i * 7) % 10) / 10,
}))

function Rain() {
  return (
    <g fill="#73eff7">
      {DROPS.map((drop, i) => (
        <rect
          key={i}
          className="drop"
          x={drop.x}
          y="0"
          width="1"
          height="3"
          style={{ animationDelay: `${drop.delay}s` }}
        />
      ))}
    </g>
  )
}

function Bolt() {
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

function Scene({ isDay, cloudCover, scene }) {
  const time = isDay ? 'day' : 'night'
  const stormy = scene === 'rain' || scene === 'thunder'
  const clouds = stormy ? 3 : cloudCount(cloudCover)

  return (
    <div
      className={`scene scene--${time} scene--${scene}`}
      aria-hidden="true"
    >
      <svg
        className="scene__svg"
        viewBox="0 0 64 36"
        shapeRendering="crispEdges"
      >
        {!stormy && (isDay ? <Sun /> : <><Stars /><Moon /></>)}
        {CLOUDS.slice(0, clouds).map((cloud, i) => (
          <Cloud key={i} {...cloud} />
        ))}
        {scene === 'thunder' && <Bolt />}
        {stormy && <Rain />}
        <rect x="0" y="28" width="64" height="8" fill="#38b764" />
        <rect x="0" y="28" width="64" height="1" fill="#a7f070" />
      </svg>
      {scene === 'thunder' && <div className="scene__flash" />}
    </div>
  )
}

export default Scene