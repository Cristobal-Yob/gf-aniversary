'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  EARTH_ORBIT_MKM_PER_DAY,
  MARS_YEAR_DAYS,
  SYNODIC_MONTH_DAYS,
  dayFacts,
} from '@/content/dayFacts'
import { EASE_OUT, RELATIONSHIP_START, formatCount } from '@/lib/site'

interface MoreDaysThanProps {
  /** Días juntos; null mientras la página aún no conoce la fecha */
  days: number | null
}

const VIEWPORT = { once: true, margin: '0px 0px -10% 0px' } as const

function dateAfter(days: number) {
  const date = new Date(RELATIONSHIP_START)
  date.setDate(date.getDate() + days)
  return date.toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** El mismo número de días, comparado con cosas que duraron menos (y las que vienen) */
export default function MoreDaysThan({ days }: MoreDaysThanProps) {
  const reduceMotion = useReducedMotion()
  if (days === null) return null

  const surpassed = dayFacts.filter(fact => fact.days < days)
  const ahead = dayFacts.filter(fact => fact.days >= days)

  const equivalents = [
    { value: formatCount(Math.floor(days / 7)), label: 'semanas' },
    { value: formatCount(days * 24), label: 'horas' },
    { value: formatCount(days * 24 * 60), label: 'minutos' },
    {
      value: formatCount(Math.floor(days / SYNODIC_MONTH_DAYS)),
      label: 'lunas llenas',
    },
    {
      value: formatCount(Math.round(days * EARTH_ORBIT_MKM_PER_DAY)),
      label: 'millones de km alrededor del Sol',
    },
    {
      value: (days / MARS_YEAR_DAYS).toLocaleString('es-CL', {
        maximumFractionDigits: 1,
      }),
      label: 'años en Marte',
    },
  ]

  const bar = (ratio: number, delay: number) =>
    reduceMotion
      ? { style: { transform: `scaleX(${ratio})` } }
      : {
          initial: { transform: 'scaleX(0)' },
          whileInView: { transform: `scaleX(${ratio})` },
          viewport: VIEWPORT,
          transition: { duration: 0.9, delay, ease: EASE_OUT },
        }

  return (
    <section className="px-4 pb-20 md:px-8 md:pb-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-5xl font-display text-[clamp(2.75rem,8.5vw,6.5rem)] font-black uppercase leading-[0.9]">
          Llevamos más días juntos que…
        </h2>

        <ul className="mt-10 border-t-2 border-ink md:mt-14">
          {surpassed.map((fact, index) => (
            <li key={fact.label} className="border-b border-rule py-4 md:py-5">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-display text-2xl font-extrabold uppercase leading-none md:text-4xl">
                  {fact.label}
                  <span className="mt-1 block font-body text-sm font-normal normal-case text-dim md:text-base">
                    {fact.detail}
                  </span>
                </p>
                <p className="shrink-0 font-display text-2xl font-semibold tabular-nums md:text-4xl">
                  {formatCount(fact.days)}
                </p>
              </div>
              <div className="mt-3 h-2 bg-rule">
                <motion.div
                  {...bar(Math.max(fact.days / days, 0.004), index * 0.07)}
                  className="h-full origin-left bg-ink"
                />
              </div>
            </li>
          ))}

          <li className="border-b-2 border-ink py-4 md:py-5">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-display text-2xl font-extrabold uppercase leading-none md:text-4xl">
                Nosotros
              </p>
              <p className="shrink-0 font-display text-2xl font-black tabular-nums md:text-4xl">
                {formatCount(days)}
              </p>
            </div>
            <div className="mt-3 h-3 bg-rule">
              <motion.div
                {...bar(1, surpassed.length * 0.07)}
                className="h-full origin-left bg-calipso"
              />
            </div>
          </li>
        </ul>

        {ahead.length > 0 && (
          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-12 md:gap-8">
            <h3 className="font-display text-4xl font-black uppercase leading-[0.9] md:col-span-4 md:text-5xl">
              Lo que viene
            </h3>
            <ul className="border-t border-rule md:col-span-8">
              {ahead.map(fact => (
                <li
                  key={fact.label}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-4"
                >
                  <p className="text-lg md:text-xl">
                    Superar {fact.label}{' '}
                    <span className="text-dim">
                      ({formatCount(fact.days)} días)
                    </span>
                  </p>
                  <p className="font-display text-xl font-semibold uppercase tracking-wide md:text-2xl">
                    Faltan {formatCount(fact.days - days + 1)} días ·{' '}
                    {dateAfter(fact.days + 1)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 md:mt-16">
          <h3 className="font-display text-4xl font-black uppercase leading-[0.9] md:text-5xl">
            O dicho de otra forma
          </h3>
          <dl className="mt-6 grid grid-cols-2 border-l border-t border-ink md:grid-cols-3">
            {equivalents.map(({ value, label }, index) => (
              <motion.div
                key={label}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'translateY(14px)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                viewport={VIEWPORT}
                transition={{ duration: 0.6, delay: index * 0.06, ease: EASE_OUT }}
                className="border-b border-r border-ink p-4 md:p-6"
              >
                <dd className="font-display text-[clamp(1.9rem,6.2vw,4.5rem)] font-black leading-none tabular-nums">
                  {value}
                </dd>
                <dt className="mt-2 text-sm text-dim md:text-base">{label}</dt>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
