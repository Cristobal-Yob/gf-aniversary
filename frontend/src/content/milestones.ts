export interface Milestone {
  title: string
  dateLabel: string
  year: number
  /** 0 = enero */
  month: number
}

/**
 * Hitos con mes exacto. Los que ya pasaron vienen de la línea de tiempo de
 * "Nosotros"; los que tienen fecha futura son los planes que vienen.
 */
export const milestones: Milestone[] = [
  { title: 'Nuestro Primer Beso', dateLabel: '25 de Septiembre, 2017', year: 2017, month: 8 },
  { title: 'Oficialmente Pololeando', dateLabel: '25 de Noviembre, 2017', year: 2017, month: 10 },
  { title: 'Primer Año Juntos', dateLabel: '25 de Noviembre, 2018', year: 2018, month: 10 },
  { title: 'Viaje a Nueva York', dateLabel: 'Abril, 2022', year: 2022, month: 3 },
  { title: 'Nuestros Anillos', dateLabel: '25 de Noviembre, 2023', year: 2023, month: 10 },
  { title: '8 Años de Amor', dateLabel: '25 de Noviembre, 2025', year: 2025, month: 10 },
  { title: 'Viviendo Juntos', dateLabel: 'Diciembre, 2026', year: 2026, month: 11 },
  { title: 'Islandia', dateLabel: 'Noviembre, 2027', year: 2027, month: 10 },
]

/** Lo que viene después del último hito con fecha */
export const afterAll = { title: 'Un infinito juntos', dateLabel: 'Después' } as const

export function monthIndex(year: number, month: number) {
  return year * 12 + month
}
