import { IconInfinity } from '@/components/icons'
import { afterAll, milestones, monthIndex } from '@/content/milestones'

interface MonthLegendProps {
  /** Fecha del navegador; null mientras la página aún no se monta */
  today: Date | null
}

const ROW = 'flex items-center gap-4 border-b border-rule py-3'
const TITLE =
  'flex-1 font-display text-xl font-semibold uppercase leading-tight md:text-2xl'
const DATE = 'text-right text-sm text-dim'

/** Leyenda de la grilla de meses: lo vivido, hoy, lo que viene y el infinito */
export default function MonthLegend({ today }: MonthLegendProps) {
  const nowIndex = today
    ? monthIndex(today.getFullYear(), today.getMonth())
    : Number.POSITIVE_INFINITY
  const past = milestones.filter(m => monthIndex(m.year, m.month) <= nowIndex)
  const upcoming = milestones.filter(
    m => monthIndex(m.year, m.month) > nowIndex
  )

  return (
    <ul className="mt-8 border-t border-rule">
      {past.map(milestone => (
        <li key={milestone.title} className={ROW}>
          <span className="h-4 w-4 shrink-0 bg-marker ring-2 ring-inset ring-ink" />
          <span className={TITLE}>{milestone.title}</span>
          <span className={DATE}>{milestone.dateLabel}</span>
        </li>
      ))}

      <li className={ROW}>
        <span className="h-4 w-4 shrink-0 bg-calipso" />
        <span className={TITLE}>Hoy</span>
      </li>

      {upcoming.map(milestone => (
        <li key={milestone.title} className={ROW}>
          <span className="h-4 w-4 shrink-0 border-2 border-dashed border-ink bg-marker/40" />
          <span className={TITLE}>{milestone.title}</span>
          <span className={DATE}>{milestone.dateLabel}</span>
        </li>
      ))}

      <li className="flex items-center gap-4 py-3">
        <span className="flex h-4 w-4 shrink-0 items-center justify-center bg-calipso">
          <IconInfinity className="h-3.5 w-3.5" />
        </span>
        <span className={TITLE}>{afterAll.title}</span>
        <span className={DATE}>{afterAll.dateLabel}</span>
      </li>
    </ul>
  )
}
