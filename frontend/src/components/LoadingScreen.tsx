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
      <div className="relative z-10 px-4 text-center">
        {/* Emoji de cumpleaños */}
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
          className="mb-6 text-6xl md:mb-8 md:text-8xl"
        >
          🎂
        </motion.div>

        {/* Texto de cumpleaños */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-2 text-2xl font-bold md:mb-4 md:text-4xl"
        >
          <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-orange-600 bg-clip-text text-transparent">
            ¡Feliz Cumpleaños!
          </span>
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 font-script text-4xl font-bold text-pink-600 md:mb-6 md:text-6xl"
        >
          Mi amor Josefa 💕
        </motion.h1>

        {/* Barra de progreso */}
        <div className="mx-auto mb-4 h-2 w-48 overflow-hidden rounded-full bg-white/50 backdrop-blur-sm md:w-64">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>

        {/* Porcentaje */}
        <motion.p
          className="text-lg font-semibold text-pink-600 md:text-xl"
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
          className="mt-3 text-xs text-gray-600 md:mt-4 md:text-sm"
        >
          Preparando algo especial para ti... ❤️
        </motion.p>
      </div>

      {/* Partículas flotantes */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl opacity-40 md:text-2xl"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
              }}
              animate={{
                y: -50,
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
            >
              {['🎂', '🎁', '🎈', '🎉', '💖', '💝', '✨', '🌟'][Math.floor(Math.random() * 8)]}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
