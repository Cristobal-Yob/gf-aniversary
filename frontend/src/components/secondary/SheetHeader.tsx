'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'
import { BindingRings, TornEdge } from '@/components/illustrations'
import { EASE_OUT } from '@/lib/site'

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

interface SheetHeaderProps {
  /** Rótulo pequeño a la izquierda de la fila reglada */
  label: string
  title: ReactNode
  children?: ReactNode
}

/** Cabecera de hoja de calendario: anillas, fila reglada, título gigante y borde rasgado */
export default function SheetHeader({ label, title, children }: SheetHeaderProps) {
  const reduceMotion = useReducedMotion()
  const [today, setToday] = useState<Date | null>(null)

  // La fecha se calcula en el navegador: la página se prerenderiza al compilar
  useEffect(() => setToday(new Date()), [])

  return (
    <section className="relative bg-calipso text-ink [--accent:theme(colors.marker)]">
      <BindingRings className="h-8 w-full text-ink md:h-10" />

      <div className="mx-auto max-w-7xl px-4 pb-14 pt-2 md:px-8 md:pb-20 lg:pb-12">
        <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-2 font-display text-lg font-semibold uppercase tracking-wide md:text-2xl">
          <span>{label}</span>
          <span className="tabular-nums">
            {today ? `${today.getDate()} · ${MONTHS[today.getMonth()]}` : ' '}
          </span>
        </div>

        <motion.h1
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }
          }
          animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="mt-8 break-words pb-[0.18em] font-display text-[clamp(3rem,13vw,9rem)] font-black uppercase leading-[0.9] md:mt-12 lg:mt-6 lg:text-[clamp(3rem,min(9vw,14vh),9rem)]"
        >
          {title}
        </motion.h1>

        {children && (
          <motion.div
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, transform: 'translateY(14px)' }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, transform: 'translateY(0px)' }
            }
            transition={{ duration: 0.7, delay: 0.25, ease: EASE_OUT }}
            className="mt-5 max-w-2xl text-lg lg:mt-3 text-calipso-shade md:text-xl"
          >
            {children}
          </motion.div>
        )}
      </div>

      <TornEdge className="absolute inset-x-0 top-full z-10 -mt-px h-4 w-full text-calipso md:h-6" />
    </section>
  )
}
