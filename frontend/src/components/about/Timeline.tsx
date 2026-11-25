'use client'

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import TimelineSheet, { parseEntryDate } from '@/components/about/TimelineSheet'
import type { TimelineEntry } from '@/content/timeline'
import { EASE_OUT } from '@/lib/site'

interface TimelineProps {
  entries: TimelineEntry[]
}

/** Línea de tiempo: una línea de tinta que se dibuja al bajar y hojas que caen */
export default function Timeline({ entries }: TimelineProps) {
  const reduceMotion = useReducedMotion()
  const listRef = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState(0)
  const onActive = useCallback((index: number) => setActive(index), [])

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start center', 'end center'],
  })
  const lineTransform = useTransform(scrollYProgress, value =>
    reduceMotion ? 'scaleY(1)' : `scaleY(${value})`
  )

  const activeYear = parseEntryDate(entries[active]?.date ?? '').year

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-8 lg:grid-cols-12">
      {/* Año actual, fijo al costado */}
      <div className="hidden lg:col-span-2 lg:block">
        <div
          className="sticky top-28 overflow-hidden border-y-2 border-ink py-2"
          aria-hidden
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={activeYear}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, transform: 'translateY(100%)' }
              }
              animate={{ opacity: 1, transform: 'translateY(0%)' }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, transform: 'translateY(-100%)' }
              }
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className="font-display text-6xl font-black leading-none tabular-nums xl:text-7xl"
            >
              {activeYear}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative lg:col-span-10">
        {/* Riel y línea de tinta */}
        <span
          aria-hidden
          className="absolute bottom-0 left-4 top-0 w-px bg-rule md:left-1/2 md:-translate-x-1/2"
        />
        <motion.span
          aria-hidden
          style={{ transform: lineTransform }}
          className="absolute bottom-0 left-[15px] top-0 w-0.5 origin-top bg-ink md:left-[calc(50%-1px)]"
        />

        <ol ref={listRef} className="relative space-y-14 md:space-y-4">
          {entries.map((entry, index) => (
            <TimelineSheet
              key={entry.title}
              entry={entry}
              index={index}
              onActive={onActive}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}
