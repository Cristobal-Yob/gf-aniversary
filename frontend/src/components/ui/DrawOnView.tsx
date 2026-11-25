'use client'

import { useInView } from 'framer-motion'
import { useRef, type CSSProperties, type ReactNode } from 'react'

interface DrawOnViewProps {
  children: ReactNode
  className?: string
  /** Milisegundos antes de empezar a dibujar */
  delay?: number
  /** Permite retener el trazo hasta que otra animación termine */
  play?: boolean
}

/** Dibuja los trazos de plumón (.mark-path) que contiene cuando entra en pantalla */
export default function DrawOnView({
  children,
  className = '',
  delay = 0,
  play = true,
}: DrawOnViewProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  return (
    <span
      ref={ref}
      aria-hidden
      className={`${className} ${inView && play ? 'mark-drawn' : ''}`}
      style={{ '--mark-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </span>
  )
}
