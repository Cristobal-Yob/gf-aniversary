'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BindingRings } from '@/components/illustrations'
import { EASE_OUT, RELATIONSHIP_START } from '@/lib/site'

const STEP_MS = 150
const HOLD_MS = 450

/** Portada del calendario: pasa los años desde 2017 hasta hoy y se arranca hacia arriba */
export default function LoadingScreen({
  onLoadingComplete,
}: {
  onLoadingComplete: () => void
}) {
  const reduceMotion = useReducedMotion()
  const startYear = RELATIONSHIP_START.getFullYear()
  const [year, setYear] = useState(startYear)

  useEffect(() => {
    const endYear = new Date().getFullYear()

    if (reduceMotion) {
      setYear(endYear)
      const done = setTimeout(onLoadingComplete, HOLD_MS)
      return () => clearTimeout(done)
    }

    let done: ReturnType<typeof setTimeout>
    const tick = setInterval(() => {
      setYear(current => {
        if (current >= endYear) {
          clearInterval(tick)
          done = setTimeout(onLoadingComplete, HOLD_MS)
          return endYear
        }
        return current + 1
      })
    }, STEP_MS)

    return () => {
      clearInterval(tick)
      clearTimeout(done)
    }
  }, [onLoadingComplete, reduceMotion])

  return (
    <motion.div
      initial={false}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { transform: 'translateY(-100%) rotate(-2deg)' }
      }
      transition={{ duration: reduceMotion ? 0.2 : 0.6, ease: EASE_OUT }}
      style={{ transformOrigin: 'top left' }}
      className="fixed inset-0 z-[60] flex flex-col bg-cobalt text-paper"
    >
      <BindingRings className="h-10 w-full shrink-0 text-paper" />

      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <p className="font-display text-2xl font-semibold uppercase tracking-wide text-cobalt-tint md:text-3xl">
          ¡Feliz Aniversario!
        </p>

        <p
          aria-live="polite"
          className="font-display text-[clamp(7rem,38vw,20rem)] font-black leading-[0.85] tabular-nums"
        >
          {year}
        </p>

        <p className="font-hand text-4xl text-marker md:text-5xl">
          Mi amor Josefa
        </p>

        <p className="mt-6 text-sm text-cobalt-tint md:text-base">
          Preparando algo especial para ti...
        </p>
      </div>
    </motion.div>
  )
}
