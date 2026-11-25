'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT } from '@/lib/site'

interface BirthdayCakeProps {
  lit: boolean
  smoking: boolean
  className?: string
}

const FROSTING =
  'M28 110H192V124C186 132 180 132 175 124C169 134 161 134 156 124C150 132 143 132 138 124C132 135 124 135 119 124C113 132 106 132 101 124C95 134 87 134 82 124C76 132 69 132 64 124C58 135 50 135 45 124C40 132 33 132 28 124Z'

/** Pastel de papel recortado: cuerpo calipso, crema de papel, vela de plumón */
export default function BirthdayCake({ lit, smoking, className = '' }: BirthdayCakeProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      viewBox="0 0 220 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={`font-display ${className}`}
    >
      {/* Llama: el único elemento que se mueve sin parar */}
      <AnimatePresence>
        {lit && (
          <motion.g
            key="flame"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, transform: 'translateY(-8px) scale(0.94)' }
            }
            transition={{ duration: 0.35, ease: EASE_OUT }}
            style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
          >
            <motion.g
              animate={
                reduceMotion
                  ? undefined
                  : {
                      transform: [
                        'scaleY(1) rotate(0deg)',
                        'scaleY(1.08) rotate(3deg)',
                        'scaleY(0.96) rotate(-2deg)',
                        'scaleY(1.04) rotate(1deg)',
                        'scaleY(1) rotate(0deg)',
                      ],
                    }
              }
              transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
            >
              <path
                d="M110 6C110 6 96 22 96 33C96 41 102 46 110 46C118 46 124 41 124 33C124 22 110 6 110 6Z"
                className="fill-marker stroke-ink"
                strokeWidth={2.5}
              />
              <path
                d="M110 24C110 24 104 31 104 36C104 40 107 42 110 42C113 42 116 40 116 36C116 31 110 24 110 24Z"
                className="fill-paper"
              />
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Humo al apagarse */}
      <AnimatePresence>
        {smoking &&
          [0, 1, 2].map(i => (
            <motion.rect
              key={`smoke-${i}`}
              x={106}
              y={32}
              width={8}
              height={8}
              className="fill-dim"
              initial={{ opacity: 0.6, transform: 'translate(0px, 0px) rotate(0deg)' }}
              animate={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      transform: `translate(${(i - 1) * 12}px, -34px) rotate(${(i - 1) * 40}deg)`,
                    }
              }
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, delay: i * 0.15, ease: EASE_OUT }}
              style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
            />
          ))}
      </AnimatePresence>

      {/* Mecha y vela */}
      <path d="M110 46V54" className="stroke-ink" strokeWidth={3} />
      <rect x={100} y={54} width={20} height={56} className="fill-marker stroke-ink" strokeWidth={2.5} />
      <path d="M100 66L120 60M100 80L120 74M100 94L120 88M100 108L120 102" className="stroke-ink" strokeWidth={2.5} />

      {/* Cuerpo del pastel */}
      <rect x={28} y={110} width={164} height={74} className="fill-calipso" />
      <path d={FROSTING} className="fill-paper stroke-ink" strokeWidth={2.5} strokeLinejoin="round" />
      <text
        x={110}
        y={164}
        textAnchor="middle"
        fontSize={19}
        fontWeight={800}
        letterSpacing={1}
        className="fill-paper uppercase"
      >
        ¡Feliz Cumple!
      </text>

      {/* Frutas de papel sobre la crema */}
      <circle cx={62} cy={108} r={6} className="fill-ink" />
      <circle cx={84} cy={106} r={5} className="fill-marker stroke-ink" strokeWidth={2} />
      <circle cx={138} cy={106} r={5} className="fill-marker stroke-ink" strokeWidth={2} />
      <circle cx={160} cy={108} r={6} className="fill-ink" />

      {/* Plato */}
      <rect x={10} y={184} width={200} height={8} className="fill-ink" />
    </svg>
  )
}
