'use client'

import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { milestones } from '@/content/milestones'
import { RELATIONSHIP_START } from '@/lib/site'

const MONTH_INITIALS = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

type CellState = 'empty' | 'lived' | 'milestone' | 'today'

function buildCells(now: Date) {
  const startYear = RELATIONSHIP_START.getFullYear()
  const years = Array.from(
    { length: now.getFullYear() - startYear + 1 },
    (_, i) => startYear + i
  )
  const startIndex = startYear * 12 + RELATIONSHIP_START.getMonth()
  const nowIndex = now.getFullYear() * 12 + now.getMonth()

  const cells = years.flatMap(year =>
    MONTH_INITIALS.map((_, month) => {
      const index = year * 12 + month
      const milestone = milestones.find(
        m => m.year === year && m.month === month
      )
      let state: CellState = 'empty'
      if (index === nowIndex) state = 'today'
      else if (milestone) state = 'milestone'
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
  today: 'bg-cobalt',
}

/** Cada cuadro es un mes: los años en columnas, de enero a diciembre hacia abajo */
export default function MonthGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => setNow(new Date()), [])

  const { years, cells } = buildCells(now ?? new Date(2026, 10, 25))

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
        aria-label={`Calendario de ${years.length} años: cada cuadro es un mes juntos desde noviembre de 2017`}
        className="grid flex-1 grid-flow-col grid-rows-[auto_repeat(12,minmax(0,1fr))] gap-[3px] sm:gap-1"
        style={{
          gridTemplateColumns: `repeat(${years.length}, minmax(0, 1fr))`,
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
                } ${inView ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
                style={{
                  transitionDelay: `${(column * 12 + cell.month) * 7}ms`,
                }}
              />
            )),
        ])}
      </div>
    </div>
  )
}
