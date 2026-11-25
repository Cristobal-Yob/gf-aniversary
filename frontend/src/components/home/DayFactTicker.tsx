'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { dayFacts } from '@/content/dayFacts'
import { formatCount } from '@/lib/site'

const INTERVAL_MS = 3800

interface DayFactTickerProps {
  days: number | null
  /** Empieza a rotar cuando termina la portada */
  play: boolean
}

/** Bajo el contador: va rotando cosas que duraron menos que nosotros */
export default function DayFactTicker({ days, play }: DayFactTickerProps) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  const facts =
    days === null ? [] : dayFacts.filter(fact => fact.days < days).reverse()

  useEffect(() => {
    if (!play || reduceMotion || facts.length < 2) return
    const timer = setInterval(
      () => setIndex(current => (current + 1) % facts.length),
      INTERVAL_MS
    )
    return () => clearInterval(timer)
  }, [play, reduceMotion, facts.length])

  if (facts.length === 0) return <div className="mt-4 min-h-[3.5rem] lg:min-h-[2rem]" />
  const fact = facts[index % facts.length]

  return (
    <div className="mt-4 min-h-[3.5rem] lg:min-h-[2rem] text-base md:text-lg">
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={fact.label}
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, transform: 'translateY(10px)' }
          }
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, transform: 'translateY(-10px)' }
          }
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="max-w-xl"
        >
          <span className="font-semibold">Más que {fact.label}</span>{' '}
          <span className="text-calipso-shade">
            ({formatCount(fact.days)} días)
          </span>
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
