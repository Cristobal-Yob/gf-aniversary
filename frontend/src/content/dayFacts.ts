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
 * De dónde sale cada número:
 * - Apolo 11: despegue 16 jul 1969, amerizaje 24 jul 1969.
 * - Tokio 2020: inauguración 23 jul 2021, clausura 8 ago 2021.
 * - Qatar 2022: 20 nov al 18 dic 2022.
 * - Colón: zarpó el 3 ago 1492 y llegó el 12 oct 1492.
 * - La vuelta al mundo en 80 días: la novela de Julio Verne.
 * - Mercurio, Venus, Marte y Júpiter: duración de su año en días terrestres.
 * - Perseverance: lanzamiento 30 jul 2020, aterrizaje 18 feb 2021.
 * - Embarazo: 40 semanas. Elefanta: unos 22 meses.
 * - Empire State: inicio de obra 17 mar 1930, inauguración 1 may 1931.
 * - El Señor de los Anillos: rodaje del 11 oct 1999 al 22 dic 2000.
 * - Voyager 1: lanzamiento 5 sep 1977, paso por Júpiter 5 mar 1979.
 * - Torre Eiffel: 2 años, 2 meses y 5 días de obra (1887-1889).
 * - Titanic: quilla 31 mar 1909, terminado 2 abr 1912.
 * - Golden Gate: inicio de obra 5 ene 1933, inauguración 27 may 1937.
 * - Breaking Bad: estreno 20 ene 2008, final 29 sep 2013.
 * - Game of Thrones: estreno 17 abr 2011, final 19 may 2019.
 * - New Horizons: lanzamiento 19 ene 2006, paso por Plutón 14 jul 2015.
 * - Friends: estreno 22 sep 1994, final 6 may 2004.
 */
export const dayFacts: DayFact[] = [
  { label: 'el viaje del Apolo 11 a la Luna, ida y vuelta', days: 8, detail: '8 días' },
  { label: 'los Juegos Olímpicos de Tokio', days: 17, detail: '17 días' },
  { label: 'el Mundial de Qatar', days: 29, detail: '29 días' },
  { label: 'el primer viaje de Colón a América', days: 70, detail: '70 días' },
  { label: 'la vuelta al mundo de Julio Verne', days: 80, detail: '80 días' },
  { label: 'un año entero en Mercurio', days: 88, detail: '88 días terrestres' },
  { label: 'el viaje del Perseverance hasta Marte', days: 203, detail: 'casi 7 meses' },
  { label: 'un año entero en Venus', days: 225, detail: '225 días terrestres' },
  { label: 'un embarazo', days: 280, detail: '40 semanas' },
  { label: 'la construcción del Empire State', days: 410, detail: '1 año y 45 días' },
  { label: 'el rodaje de El Señor de los Anillos', days: 438, detail: 'las tres películas' },
  { label: 'el viaje de la Voyager 1 hasta Júpiter', days: 546, detail: 'un año y medio' },
  { label: 'el embarazo de una elefanta', days: 660, detail: 'unos 22 meses' },
  { label: 'un año entero en Marte', days: 687, detail: '687 días terrestres' },
  { label: 'la construcción de la Torre Eiffel', days: 795, detail: '2 años, 2 meses y 5 días' },
  { label: 'la construcción del Titanic', days: 1098, detail: '3 años' },
  { label: 'un período presidencial en Chile', days: 1461, detail: '4 años' },
  { label: 'la construcción del Golden Gate', days: 1603, detail: '4 años y 4 meses' },
  { label: 'una carrera universitaria de cinco años', days: 1826, detail: '5 años' },
  { label: 'todo el tiempo que Breaking Bad estuvo al aire', days: 2079, detail: '5 temporadas' },
  { label: 'todo el tiempo que Game of Thrones estuvo al aire', days: 2954, detail: '8 temporadas' },
  { label: 'el viaje de la New Horizons hasta Plutón', days: 3463, detail: '9 años y medio' },
  { label: 'todo el tiempo que Friends estuvo al aire', days: 3514, detail: '10 temporadas' },
  { label: 'una vuelta de Júpiter alrededor del Sol', days: 4333, detail: 'casi 12 años' },
]

/** Días promedio entre dos lunas llenas */
export const SYNODIC_MONTH_DAYS = 29.530588

/** Millones de kilómetros que la Tierra avanza en su órbita cada día */
export const EARTH_ORBIT_MKM_PER_DAY = 2.573

/** Días terrestres que dura un año en Marte y en Mercurio */
export const MARS_YEAR_DAYS = 687
export const MERCURY_YEAR_DAYS = 88
