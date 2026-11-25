'use client'

import { useReducedMotion } from 'framer-motion'
import { EASE_OUT } from '@/lib/site'

/**
 * Entrada al hacer scroll (o al montar): sube 18px y aparece.
 * Con movimiento reducido solo queda el fundido.
 */
export function useReveal() {
  const reduceMotion = useReducedMotion()

  return (delay = 0, onMount = false) => {
    const hidden = reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, transform: 'translateY(18px)' }
    const shown = reduceMotion
      ? { opacity: 1 }
      : { opacity: 1, transform: 'translateY(0px)' }
    const transition = { duration: 0.7, delay, ease: EASE_OUT }

    return onMount
      ? { initial: hidden, animate: shown, transition }
      : {
          initial: hidden,
          whileInView: shown,
          viewport: { once: true, margin: '0px 0px -10% 0px' },
          transition,
        }
  }
}
