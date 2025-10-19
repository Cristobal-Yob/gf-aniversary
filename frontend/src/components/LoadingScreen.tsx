'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function LoadingScreen({
  onLoadingComplete,
}: {
  onLoadingComplete: () => void
}) {
  const [progress, setProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Simular progreso de carga
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onLoadingComplete()
          }, 300)
          return 100
        }
        // Incremento más rápido al inicio, más lento al final
        const increment = prev < 60 ? 8 : prev < 90 ? 4 : 2
        return Math.min(prev + increment, 100)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50"
    >
      {/* Imagen de fondo con blur */}
      <div className="absolute inset-0">
        <Image
          src="/photos/icon/J&C.png"
          alt="Loading"
          fill
          className="object-contain opacity-10 blur-3xl"
          priority
        />
      </div>

      {/* Contenido de carga */}
      <div className="relative z-10 text-center">
        {/* Corazón animado */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mb-8 text-8xl"
        >
          💕
        </motion.div>

        {/* Texto de carga */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-3xl font-bold md:text-4xl"
        >
          <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-orange-600 bg-clip-text text-transparent">
            Cargando nuestro espacio...
          </span>
        </motion.h2>

        {/* Barra de progreso */}
        <div className="mx-auto mb-4 h-2 w-64 overflow-hidden rounded-full bg-white/50 backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>

        {/* Porcentaje */}
        <motion.p
          className="text-xl font-semibold text-pink-600"
          key={progress}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {progress}%
        </motion.p>

        {/* Mensaje romántico */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-4 text-sm text-gray-600"
        >
          Preparando algo especial para ti... ❤️
        </motion.p>
      </div>

      {/* Partículas flotantes */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-30"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 50,
              }}
              animate={{
                y: -50,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
            >
              {['💖', '💝', '💕', '💗'][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
