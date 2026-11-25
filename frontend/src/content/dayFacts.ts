export interface DayFact {
  /** Completa la frase "Llevamos más días juntos que…" */
  label: string
  /** Cuántos días duró lo que se compara */
  days: number
  /** El mismo dato, en palabras */
  detail: string
}

/**
 * Cosas que duraron una cantidad conocida de días, de menor a mayor.
 * Las que todavía no superamos aparecen como metas con su fecha.
 *
 * Fuentes de las duraciones:
 * - Apolo 11: despegue 16 jul 1969, amerizaje 24 jul 1969.
 * - Perseverance: lanzamiento 30 jul 2020, aterrizaje 18 feb 2021.
 * - Empire State: inicio de obra 17 mar 1930, inauguración 1 may 1931.
 * - Año marciano: 687 días terrestres.
 * - Torre Eiffel: 2 años, 2 meses y 5 días de obra (1887-1889).
 * - Titanic: quilla 31 mar 1909, terminado 2 abr 1912.
 * - Friends: estreno 22 sep 1994, final 6 may 2004.
 * - Júpiter: una órbita son 4.333 días terrestres.
 */
export const dayFacts: DayFact[] = [
  {
    label: 'el viaje del Apolo 11 a la Luna, ida y vuelta',
    days: 8,
    detail: '8 días',
  },
  {
    label: 'el viaje del Perseverance hasta Marte',
    days: 203,
    detail: 'casi 7 meses',
  },
  {
    label: 'la construcción del Empire State',
    days: 410,
    detail: '1 año y 45 días',
  },
  {
    label: 'un año entero en Marte',
    days: 687,
    detail: '687 días terrestres',
  },
  {
    label: 'la construcción de la Torre Eiffel',
    days: 795,
    detail: '2 años, 2 meses y 5 días',
  },
  {
    label: 'la construcción del Titanic',
    days: 1098,
    detail: '3 años',
  },
  {
    label: 'todo el tiempo que Friends estuvo al aire',
    days: 3514,
    detail: '10 temporadas',
  },
  {
    label: 'una vuelta de Júpiter alrededor del Sol',
    days: 4333,
    detail: 'casi 12 años',
  },
]

/** Días promedio entre dos lunas llenas */
export const SYNODIC_MONTH_DAYS = 29.530588

/** Millones de kilómetros que la Tierra avanza en su órbita cada día */
export const EARTH_ORBIT_MKM_PER_DAY = 2.573

/** Días terrestres que dura un año en Marte */
export const MARS_YEAR_DAYS = 687
