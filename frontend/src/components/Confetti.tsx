'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ConfettiProps {
  duration?: number // duración en ms antes de desaparecer (0 = infinito)
  intensity?: 'low' | 'medium' | 'high'
}

type Shape = 'rect' | 'strip' | 'triangle'

interface Piece {
  id: number
  left: number
  drift: number
  spin: number
  tilt: number
  size: number
  fall: number
  delay: number
  color: string
  shape: Shape
}

// Solo la paleta del almanaque
const COLORS = ['bg-calipso', 'bg-marker', 'bg-ink', 'bg-paper']
const SHAPES: Shape[] = ['rect', 'strip', 'triangle']

function makePieces(count: number): Piece[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: Math.random() * 100,
    drift: (Math.random() - 0.5) * 260,
    spin: Math.random() * 720 - 360,
    tilt: Math.random() * 360,
    size: Math.random() * 0.6 + 0.7,
    fall: Math.random() * 3 + 4,
    delay: Math.random() * 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
  }))
}

function PaperPiece({ shape, color }: Pick<Piece, 'shape' | 'color'>) {
  // El papel blanco lleva filo de tinta para verse sobre el fondo claro
  const edge = color === 'bg-paper' ? 'border border-ink' : ''

  if (shape === 'triangle') {
    return (
      <span
        className={`block h-3 w-3 md:h-4 md:w-4 ${color}`}
        style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
      />
    )
  }
  if (shape === 'strip') {
    return <span className={`block h-1.5 w-4 md:h-2 md:w-5 ${color} ${edge}`} />
  }
  return <span className={`block h-3 w-2 md:h-4 md:w-2.5 ${color} ${edge}`} />
}

/** Papel picado que cae una vez; con movimiento reducido solo aparece y se desvanece */
export default function Confetti({
  duration = 5000,
  intensity = 'high',
}: ConfettiProps) {
  const reduceMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(true)
  const [pieces, setPieces] = useState<Piece[]>([])

  useEffect(() => {
    const count = intensity === 'high' ? 60 : intensity === 'medium' ? 40 : 20
    // Aleatorio solo en el navegador, para no romper la hidratación
    setPieces(makePieces(count))
  }, [intensity])

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => setIsVisible(false), duration)
      return () => clearTimeout(timer)
    }
  }, [duration])

  if (!isVisible || pieces.length === 0) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
    >
      {pieces.map(piece =>
        reduceMotion ? (
          <motion.span
            key={piece.id}
            className="absolute block"
            style={{
              left: `${piece.left}%`,
              top: `${(piece.id * 37) % 90}%`,
              transform: `rotate(${piece.tilt}deg)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3, delay: piece.delay * 0.3 }}
          >
            <PaperPiece shape={piece.shape} color={piece.color} />
          </motion.span>
        ) : (
          <motion.span
            key={piece.id}
            className="absolute block"
            style={{ left: `${piece.left}%`, top: '-5%' }}
            initial={{
              opacity: 1,
              transform: `translate3d(0px, 0vh, 0px) rotate(${piece.tilt}deg) scale(${piece.size})`,
            }}
            animate={{
              opacity: [1, 1, 0.8, 0],
              transform: `translate3d(${piece.drift}px, 115vh, 0px) rotate(${piece.tilt + piece.spin}deg) scale(${piece.size})`,
            }}
            transition={{
              duration: piece.fall,
              delay: piece.delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <PaperPiece shape={piece.shape} color={piece.color} />
          </motion.span>
        )
      )}
    </div>
  )
}
