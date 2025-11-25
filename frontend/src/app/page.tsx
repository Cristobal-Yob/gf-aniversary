'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Navbar from '@/components/Navbar'
import CinematicIntro from '@/components/CinematicIntro'
import LoadingScreen from '@/components/LoadingScreen'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="relative min-h-screen overflow-hidden font-serif">
        {/* Fondo animado con gradiente suave tipo Apple */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="animate-gradient absolute inset-0 bg-gradient-to-br from-cream via-[#fff0f3] to-[#fdf2f4]"
        />{' '}
        {/* Intro cinematográfica con imágenes flotantes */}
        <CinematicIntro />
        <div className="relative z-20">
          <Navbar />

          {/* Hero Section */}
          <section className="relative flex min-h-screen items-center justify-center px-6 pb-8 pt-0 md:pb-12">
            <div className="mx-auto max-w-5xl text-center">
              {/* Corazón flotante principal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mb-8"
              >
                <motion.div
                  animate={{
                    y: [-10, 10, -10],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="inline-block text-7xl drop-shadow-2xl md:text-8xl"
                >
                  ♾️
                </motion.div>
              </motion.div>

              {/* Nombres con efecto de brillo */}
              <motion.h1
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 1.2,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mb-6 text-6xl font-bold tracking-tight md:text-8xl"
              >
                <span className="bg-gradient-to-r from-primary-900 via-primary-700 to-primary-900 bg-clip-text text-transparent">
                  Cristóbal
                </span>
                <span className="mx-4 font-script text-5xl text-accent-600 md:text-7xl">
                  &
                </span>
                <span className="bg-gradient-to-r from-primary-900 via-primary-700 to-primary-900 bg-clip-text text-transparent">
                  Josefa
                </span>
              </motion.h1>

              {/* Subtítulo con efecto typewriter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mb-12"
              >
                <p className="mb-2 text-2xl font-medium text-primary-800 md:text-3xl">
                  8 Años de Historia
                </p>
                <p className="text-lg text-secondary-600 md:text-xl">
                  Celebrando cada momento de nuestro amor infinito
                </p>
              </motion.div>

              {/* Botones con animación */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-wrap justify-center gap-6"
              >
                <Link href={isAuthenticated ? '/about' : '/auth'}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Nuestra Historia
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </motion.button>
                </Link>

                <Link href="/gallery">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary group"
                  >
                    <span className="flex items-center gap-2">
                      Ver Recuerdos
                      <span className="text-xl transition-transform group-hover:scale-110">
                        📸
                      </span>
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="relative px-6 py-20">
            <div className="mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-16 text-center"
              >
                <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                  <span className="bg-gradient-to-r from-primary-900 via-primary-700 to-primary-800 bg-clip-text text-transparent">
                    Nuestro Universo
                  </span>
                </h2>
                <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-primary-300 to-accent-300" />
                <p className="mt-6 text-lg text-secondary-600 md:text-xl">
                  Explora los rincones de nuestra vida juntos
                </p>
              </motion.div>

              <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <Link
                    key={feature.title}
                    href={feature.href}
                    className="w-full max-w-sm"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 40, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.15,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{ y: -12, scale: 1.02 }}
                      className="card group flex aspect-square h-full w-full flex-col items-center justify-center text-center"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 15,
                        }}
                        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 text-5xl shadow-inner"
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="mb-3 text-2xl font-semibold text-primary-900 transition-colors group-hover:text-primary-700">
                        {feature.title}
                      </h3>
                      <p className="mb-6 px-4 text-secondary-600">
                        {feature.description}
                      </p>
                      <div className="mt-auto inline-flex items-center font-medium text-accent-600 transition-all group-hover:gap-2 group-hover:text-accent-700">
                        Descubrir
                        <motion.span
                          className="ml-1 inline-block"
                          animate={{ x: [0, 4, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          →
                        </motion.span>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Footer romántico */}
          <footer className="relative px-6 py-20">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-primary-100 bg-white/50 p-12 backdrop-blur-sm"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="mb-6 inline-block text-6xl"
                >
                  💝
                </motion.div>
                <h3 className="mb-4 font-script text-4xl text-primary-800 md:text-5xl">
                  Felices 8 Años
                </h3>
                <p className="mb-8 text-lg leading-relaxed text-secondary-700 md:text-xl">
                  "Ocho años de aventuras, risas y un amor que crece cada día
                  más.
                  <br />
                  Gracias por ser mi compañera de vida."
                </p>
                <div className="flex flex-col items-center gap-3 text-sm text-secondary-500">
                  <p className="font-medium">
                    Hecho con todo mi ❤️ por Cristóbal
                  </p>
                  <p className="text-xs opacity-75">
                    © {new Date().getFullYear()} • Nuestro Aniversario
                  </p>
                </div>
              </motion.div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

const features = [
  {
    icon: '📸',
    title: 'Nuestra Galería',
    description: 'Ocho años de recuerdos capturados en momentos inolvidables.',
    href: '/gallery',
  },
  {
    icon: '🎵',
    title: 'Soundtrack',
    description: 'La música bonita c:.',
    href: '/music',
  },

  {
    icon: '❤️',
    title: 'Nuestra Historia',
    description: 'El camino desde el primer día hasta hoy.',
    href: '/about',
  },
]
