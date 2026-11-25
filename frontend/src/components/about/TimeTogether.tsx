'use client'

import { motion, useReducedMotion } from 'framer-motion'
import DrawOnView from '@/components/ui/DrawOnView'
import { MarkCircle } from '@/components/illustrations'
import { EASE_OUT, RELATIONSHIP_START, daysTogether, formatCount } from '@/lib/site'

interface Breakdown {
  years: number
  months: number
  days: number
}

/** Años, meses y días calendario desde el inicio de la relación */
export function breakdownSince(start: Date, now: Date): Breakdown {
  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()

  if (days < 0) {
    months--
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }
  return { years, months, days }
}

interface TimeTogetherProps {
  /** null hasta que el navegador conoce la fecha de hoy */
  today: Date | null
}

/** Contador de días juntos: numerales gigantes encerrados con plumón */
export default function TimeTogether({ today }: TimeTogetherProps) {
  const reduceMotion = useReducedMotion()
  const breakdown = today ? breakdownSince(RELATIONSHIP_START, today) : null

  const cells = [
    { label: 'Años', value: breakdown?.years },
    { label: 'Meses', value: breakdown?.months },
    { label: 'Días', value: breakdown?.days },
  ]

  return (
    <div className="pt-12 md:pt-16">
      <h2 className="font-display text-3xl font-extrabold uppercase leading-[0.9] md:text-5xl">
        Tiempo Juntos
      </h2>
      <p className="mt-2 text-base text-calipso-shade md:text-lg">
        Desde el 25 de Noviembre de 2017
      </p>

      <div className="relative mt-8 inline-block">
        <motion.p
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }
          }
          animate={
            today ? { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' } : undefined
          }
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="font-display text-[clamp(5.5rem,27vw,17rem)] font-black leading-[0.82] tabular-nums"
        >
          {today ? formatCount(daysTogether(today)) : '0.000'}
        </motion.p>
        <DrawOnView
          play={today !== null}
          delay={600}
          className="pointer-events-none absolute -inset-x-[5%] -inset-y-[9%] block"
        >
          <MarkCircle className="h-full w-full" />
        </DrawOnView>
      </div>
      <p className="mt-4 font-display text-2xl font-semibold uppercase tracking-wide md:text-4xl">
        días juntos
      </p>

      <dl className="mt-10 grid grid-cols-3 border-y-2 border-ink">
        {cells.map(({ label, value }, index) => (
          <div
            key={label}
            className={`px-3 py-4 md:px-6 md:py-6 ${index > 0 ? 'border-l border-calipso-shade' : ''}`}
          >
            <dt className="font-display text-base font-semibold uppercase tracking-wide text-calipso-shade md:text-xl">
              {label}
            </dt>
            <dd className="font-display text-5xl font-black leading-none tabular-nums md:text-7xl">
              {value ?? '0'}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 text-lg font-semibold md:text-xl">
        Cada segundo contigo es un regalo
      </p>
    </div>
  )
}
