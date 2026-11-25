'use client'

import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { TornEdge } from '@/components/illustrations'
import { RingsPair } from '@/components/illustrations/extra'
import type { TimelineEntry } from '@/content/timeline'
import { EASE_OUT } from '@/lib/site'

/** Separa la fecha del contenido en numeral grande, año y resto */
export function parseEntryDate(date: string) {
  const years = date.match(/\d{4}/g) ?? []
  const year = years[0] ?? date
  const day = date.match(/^(\d{1,2}) de /)?.[1]
  return { year, day, lastYear: years[years.length - 1] ?? year }
}

interface TimelineSheetProps {
  entry: TimelineEntry
  index: number
  onActive: (index: number) => void
}

/** Una hoja arrancada del calendario por cada hito */
export default function TimelineSheet({ entry, index, onActive }: TimelineSheetProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLLIElement>(null)
  // La hoja está "activa" mientras cruza la mitad de la pantalla
  const atMiddle = useInView(ref, { margin: '-50% 0px -50% 0px' })

  useEffect(() => {
    if (atMiddle) onActive(index)
  }, [atMiddle, index, onActive])

  const { year, day } = parseEntryDate(entry.date)
  const onLeft = index % 2 === 0
  const tilt = onLeft ? -1.2 : 1.2
  const isRings = entry.title === 'Nuestros Anillos'

  return (
    <li
      ref={ref}
      className={`relative pl-12 md:w-1/2 md:pl-0 ${onLeft ? 'md:pr-14' : 'md:ml-auto md:pl-14'}`}
    >
      {/* Marca sobre la línea */}
      <motion.span
        aria-hidden
        initial={
          reduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'scale(1.35)' }
        }
        whileInView={{ opacity: 1, transform: 'scale(1)' }}
        viewport={{ once: true, margin: '0px 0px -50% 0px' }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        className={`absolute left-2 top-10 block h-4 w-4 bg-marker ring-2 ring-inset ring-ink md:left-auto ${
          onLeft ? 'md:-right-2' : 'md:-left-2'
        }`}
      />

      <motion.article
        initial={
          reduceMotion
            ? { opacity: 0 }
            : {
                opacity: 0,
                transform: `translateY(-36px) rotate(${tilt * 4}deg) scale(1.04)`,
              }
        }
        whileInView={{
          opacity: 1,
          transform: reduceMotion
            ? 'translateY(0px) rotate(0deg) scale(1)'
            : `translateY(0px) rotate(${tilt}deg) scale(1)`,
        }}
        viewport={{ once: true, margin: '0px 0px -40% 0px' }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        style={{ transformOrigin: onLeft ? 'top right' : 'top left' }}
        className="relative border-2 border-ink bg-paper"
      >
        <header className="relative flex items-baseline justify-between gap-3 bg-ink px-4 pb-2 pt-3 font-display text-sm font-semibold uppercase tracking-wide text-paper md:px-6 md:text-base">
          <span>{entry.date}</span>
          <span className="tabular-nums">{year}</span>
          <TornEdge className="absolute inset-x-0 top-full -mt-px h-3 w-full text-ink md:h-4" />
        </header>

        <div className="px-4 pb-6 pt-8 md:px-6 md:pb-8 md:pt-10">
          <p className="font-display text-[clamp(4.5rem,18vw,8rem)] font-black leading-[0.82] tabular-nums text-calipso-deep">
            {day ?? year}
          </p>
          <h3 className="mt-4 font-display text-3xl font-extrabold uppercase leading-[0.9] md:text-4xl">
            {entry.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-dim md:text-lg">
            {entry.description}
          </p>

          {isRings && (
            <div className="relative mt-6 border-t border-rule pt-6">
              <RingsPair className="absolute right-0 top-4 z-10 h-12 w-20 text-calipso-deep md:h-16 md:w-28" />
              <Image
                src="/illustrations/anillos.webp"
                alt="Ilustración de nuestros anillos"
                width={1024}
                height={1024}
                sizes="(min-width: 768px) 320px, 70vw"
                className="mx-auto h-auto w-full max-w-[320px]"
              />
            </div>
          )}
        </div>
      </motion.article>
    </li>
  )
}
