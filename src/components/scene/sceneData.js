export const CLOUDS = [
  { y: 5, duration: 60, delay: -10 },
  { y: 14, duration: 90, delay: -55 },
  { y: 9, duration: 75, delay: -30 },
]

export const MAX_DROPS = 32

export function cloudCount(cover) {
  if (cover < 20) return 0
  if (cover < 50) return 1
  if (cover < 80) return 2
  return 3
}