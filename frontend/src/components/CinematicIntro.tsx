'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface FloatingImage {
  src: string
  alt: string
  position: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
  size: string
  delay: number
}

const floatingImages: FloatingImage[] = [
  {
    src: '/photos/fotos/felizes en ny.jpeg',
    alt: 'Felices en NY',
    position: { top: '15%', left: '10%' },
    size: 'w-48 h-64 md:w-64 md:h-80',
    delay: 1.2,
  },
  {
    src: '/photos/fotos/snow kiss.jpeg',
    alt: 'Snow Kiss',
    position: { top: '25%', right: '8%' },
    size: 'w-44 h-60 md:w-56 md:h-72',
    delay: 1.5,
  },
  {
    src: '/photos/fotos/sorprendidos ny.jpeg',
    alt: 'Sorprendidos en NY',
    position: { bottom: '15%', left: '15%' },
    size: 'w-40 h-56 md:w-52 md:h-68',
    delay: 1.8,
  },
  {
    src: '/photos/fotos/snow hearth.jpeg',
    alt: 'Snow Heart',
    position: { bottom: '20%', right: '12%' },
    size: 'w-36 h-52 md:w-48 md:h-64',
    delay: 2.1,
  },
  {
    src: '/photos/fotos/hearth templo.jpeg',
    alt: 'Corazón Templo',
    position: { top: '40%', left: '5%' },
    size: 'w-40 h-56 md:w-52 md:h-68',
    delay: 2.4,
  },
  {
    src: '/photos/fotos/snow faces.jpeg',
    alt: 'Snow Faces',
    position: { top: '50%', right: '5%' },
    size: 'w-44 h-60 md:w-56 md:h-72',
    delay: 2.7,
  },
  {
    src: '/photos/fotos/mirandonos templo.jpeg',
    alt: 'Mirándonos Templo',
    position: { bottom: '35%', left: '8%' },
    size: 'w-36 h-52 md:w-48 md:h-64',
    delay: 3.0,
  },
]

export default function CinematicIntro() {
  const [showImages, setShowImages] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImages(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Imágenes flotantes */}
      <AnimatePresence>
        {showImages &&
          floatingImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 1.2,
                delay: image.delay,
                ease: [0.16, 1, 0.3, 1], // Easing suave tipo Apple
              }}
              className={`absolute ${image.size} hidden md:block`}
              style={{
                ...image.position,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 6 + index * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative h-full w-full"
              >
                {/* Contenedor con glassmorphism y sombra suave */}
                <div className="group relative h-full w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-pink-500/30">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  {/* Overlay con gradiente sutil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Brillo ambiental suave */}
                <motion.div
                  className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-pink-400/20 via-rose-400/20 to-orange-400/20 blur-2xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  )
}
