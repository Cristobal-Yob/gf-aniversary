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
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-20"
          initial={{
            x: Math.random() * windowSize.width,
            y: windowSize.height + 100,
          }}
          animate={{
            y: -100,
            x: [
              Math.random() * windowSize.width,
              Math.random() * windowSize.width + (Math.random() - 0.5) * 200,
              Math.random() * windowSize.width,
            ],
          }}
          transition={{
            duration: Math.random() * 15 + 20,
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
