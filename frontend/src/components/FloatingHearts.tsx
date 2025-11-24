'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function FloatingHearts() {
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const hearts = ['💕', '💖', '💗', '💓', '💝', '💘']

  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
          }}
          initial={{
            y: '110vh',
            opacity: 0,
          }}
          animate={{
            y: '-10vh',
            x: [-20, 20, -20],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: 'linear',
          }}
        >
          {hearts[Math.floor(Math.random() * hearts.length)]}
        </motion.div>
      ))}
    </div>
  )
}
