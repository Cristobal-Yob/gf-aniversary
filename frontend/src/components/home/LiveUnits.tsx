'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  EARTH_ORBIT_MKM_PER_DAY,
  MARS_YEAR_DAYS,
  MERCURY_YEAR_DAYS,
  SYNODIC_MONTH_DAYS,
} from '@/content/dayFacts'
import { EASE_OUT, RELATIONSHIP_START, formatCount } from '@/lib/site'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

function monthsSince(start: Date, now: Date) {
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth())
  return now.getDate() < start.getDate() ? months - 1 : months
}

const oneDecimal = (value: number) =>
  value.toLocaleString('es-CL', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })

/** El mismo tiempo juntos en otras unidades; horas, minutos y segundos corren en vivo */
export default function LiveUnits() {
  const reduceMotion = useReducedMotion()
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const timer = setInterval(() => setNow(new Date()), SECOND)
    return () => clearInterval(timer)
  }, [])

  if (now === null) return null

  const elapsed = Math.max(0, now.getTime() - RELATIONSHIP_START.getTime())
  const days = elapsed / DAY

  const units = [
    { value: formatCount(monthsSince(RELATIONSHIP_START, now)), label: 'meses' },
    { value: formatCount(Math.floor(days / 7)), label: 'semanas' },
    { value: formatCount(Math.floor(elapsed / HOUR)), label: 'horas' },
    { value: formatCount(Math.floor(elapsed / MINUTE)), label: 'minutos' },
    {
      value: formatCount(Math.floor(elapsed / SECOND)),
      label: 'segundos, y contando',
      wide: true,
    },
    {
      value: formatCount(Math.floor(days / SYNODIC_MONTH_DAYS)),
      label: 'lunas llenas',
    },
    {
      value: formatCount(Math.round(days * EARTH_ORBIT_MKM_PER_DAY)),
      label: 'millones de km alrededor del Sol',
    },
    { value: oneDecimal(days / MARS_YEAR_DAYS), label: 'años en Marte' },
    { value: oneDecimal(days / MERCURY_YEAR_DAYS), label: 'años en Mercurio' },
  ]

  return (
    <dl className="mt-6 grid grid-cols-2 border-l border-t border-ink md:grid-cols-3">
      {units.map(({ value, label, wide }, index) => (
        <motion.div
          key={label}
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, transform: 'translateY(14px)' }
          }
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.6, delay: index * 0.05, ease: EASE_OUT }}
          className={`border-b border-r border-ink p-4 md:p-6 ${
            wide ? 'col-span-2 bg-calipso md:col-span-1' : ''
          }`}
        >
          <dd className="font-display text-[clamp(1.9rem,5.4vw,4rem)] font-black leading-none tabular-nums">
            {value}
          </dd>
          <dt
            className={`mt-2 text-sm md:text-base ${
              wide ? 'text-calipso-shade' : 'text-dim'
            }`}
          >
            {label}
          </dt>
        </motion.div>
      ))}
    </dl>
  )
}
