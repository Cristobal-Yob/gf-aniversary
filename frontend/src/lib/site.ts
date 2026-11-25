export const COUPLE = { first: 'Cristóbal', second: 'Josefa' } as const

/** 25 de noviembre de 2017: el día que empezaron a pololear */
export const RELATIONSHIP_START = new Date(2017, 10, 25)

const MS_PER_DAY = 24 * 60 * 60 * 1000

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function daysTogether(now: Date = new Date()) {
  const elapsed = startOfDay(now).getTime() - RELATIONSHIP_START.getTime()
  return Math.max(0, Math.round(elapsed / MS_PER_DAY))
}

export function yearsTogether(now: Date = new Date()) {
  const years = now.getFullYear() - RELATIONSHIP_START.getFullYear()
  const anniversaryThisYear = new Date(
    now.getFullYear(),
    RELATIONSHIP_START.getMonth(),
    RELATIONSHIP_START.getDate()
  )
  return startOfDay(now) < anniversaryThisYear ? years - 1 : years
}

export function formatCount(value: number) {
  return value.toLocaleString('es-CL')
}

export const EASE_OUT = [0.23, 1, 0.32, 1] as const
