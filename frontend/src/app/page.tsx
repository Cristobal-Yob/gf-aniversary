'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Navbar from '@/components/Navbar'
import CinematicIntro from '@/components/CinematicIntro'
import LoadingScreen from '@/components/LoadingScreen'
import Confetti from '@/components/Confetti'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Confetti de cumpleaños */}
      {!isLoading && showConfetti && <Confetti duration={6000} intensity="high" />}

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
          <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center px-4 pb-6 pt-0 md:min-h-screen md:px-6 md:pb-12">
            <div className="mx-auto max-w-5xl text-center">
              {/* Banner de cumpleaños */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mb-4 md:mb-6"
              >
                <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 px-4 py-2 text-white shadow-lg md:px-6 md:py-3">
                  <span className="text-lg md:text-2xl">🎂</span>
                  <span className="text-sm font-semibold md:text-lg">¡Feliz Cumpleaños Mi Amor!</span>
                  <span className="text-lg md:text-2xl">🎉</span>
                </div>
              </motion.div>

              {/* Emoji flotante principal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mb-4 md:mb-8"
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
                  className="inline-block text-5xl drop-shadow-2xl md:text-7xl lg:text-8xl"
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
                className="mb-4 text-4xl font-bold tracking-tight md:mb-6 md:text-6xl lg:text-8xl"
              >
                <span className="bg-gradient-to-r from-primary-900 via-primary-700 to-primary-900 bg-clip-text text-transparent">
                  Cristóbal
                </span>
                <span className="mx-2 font-script text-3xl text-accent-600 md:mx-4 md:text-5xl lg:text-7xl">
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
                className="mb-8 md:mb-12"
              >
                <p className="mb-1 text-xl font-medium text-primary-800 md:mb-2 md:text-2xl lg:text-3xl">
                  8 Años de Historia
                </p>
                <p className="text-base text-secondary-600 md:text-lg lg:text-xl">
                  Celebrando cada momento de nuestro amor infinito
                </p>
              </motion.div>

              {/* Botones con animación - optimizados para móvil */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6"
              >
                <Link href={isAuthenticated ? '/about' : '/auth'} className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary group w-full py-4 text-base sm:w-auto sm:py-3"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Nuestra Historia
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </motion.button>
                </Link>

                <Link href="/gallery" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary group w-full py-4 text-base sm:w-auto sm:py-3"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Ver Recuerdos
                      <span className="text-xl transition-transform group-hover:scale-110">
                        📸
                      </span>
                    </span>
                  </motion.button>
                </Link>

                {/* Botón especial de cumpleaños - Solo el 2 de diciembre */}
                {isAuthenticated && new Date().getMonth() === 11 && new Date().getDate() === 2 && (
                  <Link href="/birthday" className="w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{ 
                        boxShadow: [
                          '0 0 20px rgba(236, 72, 153, 0.4)',
                          '0 0 40px rgba(236, 72, 153, 0.6)',
                          '0 0 20px rgba(236, 72, 153, 0.4)',
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="group w-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-8 py-4 text-base font-medium text-white shadow-lg sm:w-auto sm:py-3"
                    >
                      <span className="flex items-center justify-center gap-2">
                        🎂 Tu Sorpresa de Cumpleaños
                        <span className="text-xl transition-transform group-hover:scale-110">
                          ✨
                        </span>
                      </span>
                    </motion.button>
                  </Link>
                )}
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="relative px-4 py-12 md:px-6 md:py-20">
            <div className="mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-10 text-center md:mb-16"
              >
                <h2 className="mb-3 text-3xl font-bold md:mb-4 md:text-4xl lg:text-5xl">
                  <span className="bg-gradient-to-r from-primary-900 via-primary-700 to-primary-800 bg-clip-text text-transparent">
                    Nuestro Universo
                  </span>
                </h2>
                <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary-300 to-accent-300 md:w-24" />
                <p className="mt-4 text-base text-secondary-600 md:mt-6 md:text-lg lg:text-xl">
                  Explora los rincones de nuestra vida juntos
                </p>
              </motion.div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
                {features.map((feature, index) => (
                  <Link
                    key={feature.title}
                    href={feature.href}
                    className="w-full"
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
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="card group flex h-full min-h-[200px] w-full flex-col items-center justify-center p-6 text-center md:min-h-[280px] md:p-8"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 15,
                        }}
                        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-4xl shadow-inner md:mb-6 md:h-20 md:w-20 md:text-5xl"
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="mb-2 text-xl font-semibold text-primary-900 transition-colors group-hover:text-primary-700 md:mb-3 md:text-2xl">
                        {feature.title}
                      </h3>
                      <p className="mb-4 text-sm text-secondary-600 md:mb-6 md:px-4 md:text-base">
                        {feature.description}
                      </p>
                      <div className="mt-auto inline-flex items-center text-sm font-medium text-accent-600 transition-all group-hover:gap-2 group-hover:text-accent-700 md:text-base">
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
          <footer className="relative px-4 py-12 md:px-6 md:py-20">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-primary-100 bg-white/50 p-6 backdrop-blur-sm md:rounded-3xl md:p-12"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="mb-4 inline-block text-5xl md:mb-6 md:text-6xl"
                >
                  🎂
                </motion.div>
                <h3 className="mb-3 font-script text-3xl text-primary-800 md:mb-4 md:text-4xl lg:text-5xl">
                  Feliz Cumpleaños Josefa
                </h3>
                <p className="mb-6 text-base leading-relaxed text-secondary-700 md:mb-8 md:text-lg lg:text-xl">
                  "Que este día esté lleno de alegría, amor y todos tus sueños cumplidos.
                  <br className="hidden md:block" />
                  <span className="md:hidden"> </span>
                  Te amo infinitamente."
                </p>
                <div className="flex flex-col items-center gap-2 text-xs text-secondary-500 md:gap-3 md:text-sm">
                  <p className="font-medium">
                    Hecho con todo mi ❤️ por Cristóbal
                  </p>
                  <p className="opacity-75">
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
