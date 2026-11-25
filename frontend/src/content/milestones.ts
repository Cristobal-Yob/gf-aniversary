export interface Milestone {
  title: string
  dateLabel: string
  year: number
  /** 0 = enero */
  month: number
}

/** Hitos con mes exacto, tomados de la línea de tiempo de "Nosotros" */
export const milestones: Milestone[] = [
  { title: 'Nuestro Primer Beso', dateLabel: '25 de Septiembre, 2017', year: 2017, month: 8 },
  { title: 'Oficialmente Pololeando', dateLabel: '25 de Noviembre, 2017', year: 2017, month: 10 },
  { title: 'Primer Año Juntos', dateLabel: '25 de Noviembre, 2018', year: 2018, month: 10 },
  { title: 'Viaje a Nueva York', dateLabel: 'Abril, 2022', year: 2022, month: 3 },
  { title: 'Nuestros Anillos', dateLabel: '25 de Noviembre, 2023', year: 2023, month: 10 },
  { title: '8 Años de Amor', dateLabel: '25 de Noviembre, 2025', year: 2025, month: 10 },
]
