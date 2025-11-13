'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Navbar from '@/components/Navbar'
import FloatingHearts from '@/components/FloatingHearts'
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

      <div className="relative min-h-screen overflow-hidden">
        {/* Fondo animado con gradiente suave tipo Apple */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="animate-gradient absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50"
        />{' '}
        {/* Partículas flotantes de corazones */}
        <FloatingHearts />
        {/* Intro cinematográfica con imágenes flotantes */}
        <CinematicIntro />
        <div className="relative">
          <Navbar />

          {/* Hero Section */}
          <section className="relative flex min-h-screen items-center justify-center px-6 pb-8 pt-0 md:pb-12">
            <div className="mx-auto max-w-4xl text-center">
              {/* Corazón flotante principal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.8,
                  ease: [0.16, 1, 0.3, 1], // Easing suave tipo Apple
                }}
                className="mb-8"
              >
                <motion.div
                  animate={{
                    y: [-8, 8, -8],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="inline-block text-7xl drop-shadow-lg md:text-8xl"
                >
                  💕
                </motion.div>
              </motion.div>

              {/* Nombres con efecto de brillo */}
              <motion.h1
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 1.2,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mb-6 text-5xl font-bold md:text-7xl"
              >
                <motion.span
                  className="relative inline-block bg-gradient-to-r from-pink-600 via-rose-500 to-orange-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundSize: '200% 100%',
                  }}
                >
                  Cristóbal
                </motion.span>
                <span className="mx-4 text-gray-600">&</span>
                <motion.span
                  className="relative inline-block bg-gradient-to-r from-pink-600 via-rose-500 to-orange-600 bg-clip-text text-transparent"
                  style={{
                    backgroundSize: '200% 100%',
                  }}
                >
                  Josefa
                </motion.span>
              </motion.h1>

              {/* Subtítulo con efecto typewriter */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mb-10 text-xl text-gray-600 md:text-2xl"
              >
                Un lugar especial para nuestros recuerdos, música y momentos
                juntos
              </motion.p>

              {/* Botones con animación */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.0,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link href="/auth">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative overflow-hidden rounded-full bg-gradient-to-r from-pink-600 to-rose-600 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-2xl hover:shadow-pink-500/50"
                  >
                    Comenzar 💖
                  </motion.button>
                </Link>

                <Link href="/gallery">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full border-2 border-pink-300 bg-white/90 px-8 py-3 font-semibold text-pink-600 shadow-lg backdrop-blur-sm transition-all hover:border-pink-400 hover:bg-pink-50/90 hover:shadow-xl hover:shadow-pink-300/50"
                  >
                    Ver Galería 📸
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="relative px-6 py-12">
            <div className="mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-12 text-center"
              >
                <h2 className="mb-3 text-4xl font-bold md:text-5xl">
                  <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
                    Nuestro Espacito
                  </span>{' '}
                  <span className="text-gray-800">en la Web</span>
                </h2>
                <p className="mx-auto flex max-w-2xl items-center justify-center gap-2 text-lg text-gray-600 md:text-xl">
                  <span>
                    Todas las secciones que puedes ver para que te diviertas
                  </span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="text-2xl"
                  >
                    💖
                  </motion.span>
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
                      whileHover={{ y: -12, scale: 1.03 }}
                      className="group flex aspect-square w-full cursor-pointer items-center justify-center rounded-2xl border border-gray-100 bg-white/90 p-8 shadow-lg backdrop-blur-sm transition-all duration-500 hover:border-pink-200 hover:shadow-2xl hover:shadow-pink-500/20"
                    >
                      <div className="flex h-full flex-col items-center justify-center text-center">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 8 }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 10,
                          }}
                          className="mb-4 text-6xl"
                        >
                          {feature.icon}
                        </motion.div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-800 transition-colors group-hover:text-pink-700">
                          {feature.title}
                        </h3>
                        <p className="mb-4 px-2 text-sm text-gray-600">
                          {feature.description}
                        </p>
                        <div className="inline-flex items-center font-medium text-pink-600 transition-all group-hover:gap-2 group-hover:text-pink-700">
                          Explorar
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
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Footer romántico */}
          <footer className="relative px-6 py-16">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="mb-4 inline-block text-5xl"
                >
                  💝
                </motion.div>
                <h3 className="mb-3 text-2xl font-semibold md:text-3xl">
                  <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
                    Ojalá que te guste
                  </span>
                </h3>
                <p className="mb-6 text-lg text-gray-600 md:text-xl">
                  Este espacito lo hice con mucho amor para nosotros ❤️
                </p>
                <div className="flex flex-col items-center gap-2 text-sm text-gray-500">
                  <p>Hecho con 💖 por Cristóbal</p>
                  <p className="text-xs">
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
    title: 'Galería de Recuerdos',
    description:
      'Nuestras fotitos más lindas y momentos especiales guardados con amor',
    href: '/gallery',
  },
  {
    icon: '🎵',
    title: 'Música Juntos',
    description:
      'Escucha nuestras canciones favoritas y controla Spotify en tiempo real',
    href: '/music',
  },
  {
    icon: '💬',
    title: 'Chat con IA',
    description:
      'Pregúntale a nuestra IA sobre nuestros recuerdos y ella te responderá',
    href: '/chat',
  },
  /* {
    icon: '🎮',
    title: 'Juegos Retro',
    description:
      'Juega conmigo a juegos clásicos Flash como en los viejos tiempos',
    href: '/games',
  }, */
  {
    icon: '❤️',
    title: 'Sobre Nosotros',
    description: 'Nuestra historia de amor y los momentos que más atesoramos',
    href: '/about',
  },
]
