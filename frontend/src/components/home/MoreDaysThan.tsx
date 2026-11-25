'use client'

import { motion, useReducedMotion } from 'framer-motion'
import LiveUnits from '@/components/home/LiveUnits'
import { dayFacts } from '@/content/dayFacts'
import { EASE_OUT, RELATIONSHIP_START, formatCount } from '@/lib/site'

interface MoreDaysThanProps {
  /** Días juntos; null mientras la página aún no conoce la fecha */
  days: number | null
}

const VIEWPORT = { once: true, margin: '0px 0px -8% 0px' } as const

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

  const bar = (ratio: number, delay: number) =>
    reduceMotion
      ? { style: { transform: `scaleX(${ratio})` } }
      : {
          initial: { transform: 'scaleX(0)' },
          whileInView: { transform: `scaleX(${ratio})` },
          viewport: VIEWPORT,
          transition: { duration: 0.8, delay, ease: EASE_OUT },
        }

  return (
    <section className="px-4 pb-20 md:px-8 md:pb-28">
      <div className="mx-auto max-w-7xl">
        {/* La lista es larga: en escritorio el título queda fijo al costado */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
              <h2 className="font-display text-[clamp(2.75rem,8.5vw,5.5rem)] font-black uppercase leading-[0.9] lg:text-[clamp(2.75rem,min(5.2vw,10vh),5.5rem)]">
                Llevamos más días juntos que…
              </h2>
              <p className="mt-4 max-w-md text-lg text-dim md:text-xl">
                {formatCount(days)} días son más de lo que duraron{' '}
                {surpassed.length} cosas que parecían largas.
              </p>
            </div>
          </div>

          <ul className="border-t-2 border-ink lg:col-span-7">
            {surpassed.map((fact, index) => (
              <li key={fact.label} className="border-b border-rule py-3">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display text-xl font-extrabold uppercase leading-tight md:text-2xl">
                    {fact.label}
                    <span className="ml-2 font-body text-sm font-normal normal-case text-dim">
                      {fact.detail}
                    </span>
                  </p>
                  <p className="shrink-0 font-display text-xl font-semibold tabular-nums md:text-2xl">
                    {formatCount(fact.days)}
                  </p>
                </div>
                <div className="mt-2 h-1.5 bg-rule">
                  <motion.div
                    {...bar(
                      Math.max(fact.days / days, 0.004),
                      (index % 6) * 0.05
                    )}
                    className="h-full origin-left bg-ink"
                  />
                </div>
              </li>
            ))}

            <li className="border-b-2 border-ink py-4">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-display text-2xl font-black uppercase leading-none md:text-4xl">
                  Nosotros
                </p>
                <p className="shrink-0 font-display text-2xl font-black tabular-nums md:text-4xl">
                  {formatCount(days)}
                </p>
              </div>
              <div className="mt-3 h-3 bg-rule">
                <motion.div
                  {...bar(1, 0.1)}
                  className="h-full origin-left bg-calipso"
                />
              </div>
            </li>
          </ul>
        </div>

        {ahead.length > 0 && (
          <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-12">
            <h3 className="font-display text-4xl font-black uppercase leading-[0.9] md:text-5xl lg:col-span-5">
              Lo que viene
            </h3>
            <ul className="border-t border-rule lg:col-span-7">
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
          <LiveUnits />
        </div>
      </div>
    </section>
  )
}
