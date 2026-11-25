'use client'

import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { IconInfinity } from '@/components/icons'
import { afterAll, milestones, monthIndex } from '@/content/milestones'
import { RELATIONSHIP_START } from '@/lib/site'

const MONTH_INITIALS = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
const STEP_MS = 7

type CellState = 'empty' | 'lived' | 'milestone' | 'today' | 'upcoming'

function buildCells(now: Date) {
  const startYear = RELATIONSHIP_START.getFullYear()
  const lastYear = Math.max(now.getFullYear(), ...milestones.map(m => m.year))
  const years = Array.from(
    { length: lastYear - startYear + 1 },
    (_, i) => startYear + i
  )
  const startIndex = monthIndex(startYear, RELATIONSHIP_START.getMonth())
  const nowIndex = monthIndex(now.getFullYear(), now.getMonth())

  const cells = years.flatMap(year =>
    MONTH_INITIALS.map((_, month) => {
      const index = monthIndex(year, month)
      const milestone = milestones.find(
        m => m.year === year && m.month === month
      )
      let state: CellState = 'empty'
      if (index === nowIndex) state = 'today'
      else if (milestone) state = index > nowIndex ? 'upcoming' : 'milestone'
      else if (index >= startIndex && index < nowIndex) state = 'lived'
      return { year, month, state, title: milestone?.title }
    })
  )
  return { years, cells }
}

const CELL_STYLE: Record<CellState, string> = {
  empty: 'border border-rule',
  lived: 'bg-ink',
  milestone: 'bg-marker ring-2 ring-inset ring-ink',
  today: 'bg-calipso',
  upcoming: 'border-2 border-dashed border-ink bg-marker/40',
}

/**
 * Cada cuadro es un mes: los años en columnas, de enero a diciembre hacia
 * abajo. Llega hasta el último plan con fecha y cierra con el infinito.
 */
export default function MonthGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => setNow(new Date()), [])

  // Hasta conocer la fecha del navegador no hay meses vividos que pintar
  const { years, cells } = buildCells(now ?? RELATIONSHIP_START)
  const shown = inView && now !== null

  return (
    <div ref={ref} className="flex gap-2 sm:gap-3">
      <div
        aria-hidden
        className="grid grid-rows-[auto_repeat(12,minmax(0,1fr))] gap-[3px] font-display text-xs font-semibold text-dim sm:gap-1 sm:text-sm"
      >
        <span className="h-5 sm:h-6" />
        {MONTH_INITIALS.map((initial, i) => (
          <span key={i} className="flex items-center">
            {initial}
          </span>
        ))}
      </div>

      <div
        role="img"
        aria-label={`Calendario de ${years.length} años: cada cuadro es un mes desde noviembre de 2017, con los planes que vienen y, después, ${afterAll.title.toLowerCase()}`}
        className="grid flex-1 grid-flow-col grid-rows-[auto_repeat(12,minmax(0,1fr))] gap-[3px] sm:gap-1"
        style={{
          gridTemplateColumns: `repeat(${years.length}, minmax(0, 1fr)) minmax(0, 1.5fr)`,
        }}
      >
        {years.map((year, column) => [
          <span
            key={`y-${year}`}
            className="h-5 text-center font-display text-xs font-semibold text-dim sm:h-6 sm:text-sm"
          >
            {String(year).slice(2)}
          </span>,
          ...cells
            .filter(cell => cell.year === year)
            .map(cell => (
              <span
                key={`${cell.year}-${cell.month}`}
                title={cell.title}
                className={`aspect-square transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
                  CELL_STYLE[cell.state]
                } ${shown ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
                style={{
                  transitionDelay: `${(column * 12 + cell.month) * STEP_MS}ms`,
                }}
              />
            )),
        ])}

        {/* Después del último plan: el infinito */}
        <span className="h-5 sm:h-6" />
        <span
          title={afterAll.title}
          className={`flex items-center justify-center bg-calipso text-ink transition-[opacity,clip-path] duration-700 ease-out motion-reduce:transition-none ${
            shown
              ? 'opacity-100 [clip-path:inset(0%_0%_0%_0%)]'
              : 'opacity-0 [clip-path:inset(0%_0%_100%_0%)]'
          }`}
          style={{
            gridRow: 'span 12',
            transitionDelay: `${years.length * 12 * STEP_MS}ms`,
          }}
        >
          <IconInfinity className="h-6 w-6 rotate-90 sm:h-9 sm:w-9" />
        </span>
      </div>
    </div>
  )
}
