'use client'

import { useRef, type KeyboardEvent, type PointerEvent } from 'react'

interface RuleSliderProps {
  /** Valor actual entre 0 y `max` */
  value: number
  max: number
  onChange: (value: number) => void
  label: string
  /** Texto que leen los lectores de pantalla, p. ej. "1:23 de 4:15" */
  valueText?: string
  /** Paso de las flechas del teclado */
  step: number
  className?: string
  /** Color de la regla de fondo */
  trackClassName?: string
}

/**
 * Una regla delgada en plumón que se puede arrastrar, tocar o mover con el teclado.
 * El relleno se dibuja con scaleX para animar solo transform.
 */
export default function RuleSlider({
  value,
  max,
  onChange,
  label,
  valueText,
  step,
  className = '',
  trackClassName = 'bg-paper/25',
}: RuleSliderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0

  const valueAt = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect || rect.width === 0 || max <= 0) return value
    const x = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    return x * max
  }

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (max <= 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    onChange(valueAt(e.clientX))
  }

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
    onChange(valueAt(e.clientX))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (max <= 0) return
    const keys: Record<string, number> = {
      ArrowRight: value + step,
      ArrowUp: value + step,
      ArrowLeft: value - step,
      ArrowDown: value - step,
      Home: 0,
      End: max,
    }
    if (!(e.key in keys)) return
    e.preventDefault()
    // El espacio no llega aquí: el atajo global solo actúa sobre document.body
    onChange(Math.min(max, Math.max(0, keys[e.key])))
  }

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={Math.round(max)}
      aria-valuenow={Math.round(value)}
      aria-valuetext={valueText}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onKeyDown={handleKeyDown}
      className={`group relative flex h-5 cursor-pointer touch-none items-center ${className}`}
    >
      <span className={`absolute inset-x-0 h-0.5 ${trackClassName}`} />
      <span
        className="absolute inset-x-0 h-0.5 origin-left bg-marker transition-transform duration-150 ease-out group-hover:h-1"
        style={{ transform: `scaleX(${ratio})` }}
      />
      <span
        className="absolute h-3 w-1 bg-marker"
        style={{ left: `calc(${ratio * 100}% - 2px)` }}
      />
    </div>
  )
}
