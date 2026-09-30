export function Sun() {
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

export function Moon() {
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

export function Stars() {
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

export function Cloud({ y, duration, delay }) {
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