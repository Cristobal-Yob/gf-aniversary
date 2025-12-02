'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ConfettiProps {
  duration?: number // duración en ms antes de desaparecer (0 = infinito)
  intensity?: 'low' | 'medium' | 'high'
}

export default function Confetti({ duration = 5000, intensity = 'high' }: ConfettiProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (duration > 0) {
      const timer = setTimeout(() => setIsVisible(false), duration)
      return () => clearTimeout(timer)
    }
  }, [duration])

  if (!mounted || !isVisible) return null

  const particleCount = intensity === 'high' ? 60 : intensity === 'medium' ? 40 : 20

  const colors = [
    '#ff6b9d', // rosa
    '#ffd93d', // amarillo
    '#6bcb77', // verde
    '#4d96ff', // azul
    '#ff6b6b', // rojo
    '#c44dff', // morado
    '#ff9f43', // naranja
    '#00d2d3', // cyan
  ]

  const shapes = ['circle', 'square', 'triangle', 'heart']

  const getShape = (shape: string, color: string) => {
    switch (shape) {
      case 'circle':
        return (
          <div
            className="h-3 w-3 rounded-full md:h-4 md:w-4"
            style={{ backgroundColor: color }}
          />
        )
      case 'square':
        return (
          <div
            className="h-3 w-3 md:h-4 md:w-4"
            style={{ backgroundColor: color }}
          />
        )
      case 'triangle':
        return (
          <div
            className="h-0 w-0 border-b-[12px] border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent md:border-b-[16px] md:border-l-[8px] md:border-r-[8px]"
            style={{ borderBottomColor: color }}
          />
        )
      case 'heart':
        return <span className="text-sm md:text-base" style={{ color }}>❤️</span>
      default:
        return (
          <div
            className="h-3 w-3 rounded-full md:h-4 md:w-4"
            style={{ backgroundColor: color }}
          />
        )
    }
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {[...Array(particleCount)].map((_, i) => {
        const color = colors[Math.floor(Math.random() * colors.length)]
        const shape = shapes[Math.floor(Math.random() * shapes.length)]
        const startX = Math.random() * 100
        const endX = startX + (Math.random() - 0.5) * 40
        const rotations = Math.random() * 720 - 360

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${startX}%`,
              top: '-5%',
            }}
            initial={{
              y: 0,
              x: 0,
              rotate: 0,
              opacity: 1,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: '120vh',
              x: `${(endX - startX) * 10}px`,
              rotate: rotations,
              opacity: [1, 1, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              delay: Math.random() * 2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {getShape(shape, color)}
          </motion.div>
        )
      })}
    </div>
  )
}
