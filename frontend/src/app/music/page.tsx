'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useMusicPlayer } from '@/contexts/MusicPlayerContext'
import Navbar from '@/components/Navbar'

export default function MusicPage() {
  const { isAuthenticated } = useAuth()
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    playTrack,
    togglePlayPause,
    seekTo,
    playlist, // Obtenemos la playlist del contexto
  } = useMusicPlayer()

  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null)

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-md text-center">
            <div className="mb-6 text-6xl">🔒</div>
            <h1 className="mb-4 text-3xl font-bold text-gray-800">
              Área Privada
            </h1>
            <p className="mb-8 text-gray-600">
              Necesitas iniciar sesión para escuchar nuestra música
            </p>
            <Link
              href="/auth"
              className="inline-block rounded-lg bg-pink-600 px-6 py-3 font-medium text-white transition-colors hover:bg-pink-700"
            >
              Iniciar Sesión 💖
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentGradient = currentTrack?.color || 'from-pink-600 to-orange-600'

  return (
    <motion.div
      className="min-h-screen transition-all duration-1000"
      style={{
        background: `linear-gradient(135deg, 
          ${currentTrack ? 'rgba(252, 231, 243, 0.5)' : 'rgb(254, 242, 242)'}, 
          ${currentTrack ? 'rgba(254, 243, 199, 0.5)' : 'rgb(255, 251, 235)'})`,
      }}
    >
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mb-4 text-7xl"
          >
            🎵
          </motion.div>

          <motion.h1
            className="font-cursive mb-4 text-4xl font-bold md:text-6xl"
            animate={{
              textShadow:
                currentTrack && isPlaying
                  ? [
                      '0 0 20px rgba(236, 72, 153, 0.3)',
                      '0 0 40px rgba(236, 72, 153, 0.5)',
                      '0 0 20px rgba(236, 72, 153, 0.3)',
                    ]
                  : '0 0 0 rgba(236, 72, 153, 0)',
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span
              className={`bg-gradient-to-r ${currentGradient} bg-clip-text text-transparent transition-all duration-1000`}
            >
              Nuestra Música
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto max-w-2xl text-xl text-gray-600"
          >
            Las canciones que cuentan nuestra historia de amor 💕
          </motion.p>

          <AnimatePresence mode="wait">
            {currentTrack && (
              <motion.div
                key={currentTrack.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="mt-6"
              >
                <p className="font-cursive text-lg text-pink-600">
                  "Cada vez que suena esta canción, pienso en ti 💕"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mx-auto mb-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 text-center"
          >
            <h2 className="font-cursive mb-3 text-3xl font-bold text-gray-800 md:text-4xl">
              <span
                className={`bg-gradient-to-r ${currentGradient} bg-clip-text text-transparent transition-all duration-1000`}
              >
                Nuestra Playlist
              </span>{' '}
              del Corazón
            </h2>
            <p className="text-gray-600">
              {playlist.length} canciones que cuentan nuestra historia 💕
            </p>
          </motion.div>

          <div className="space-y-3">
            {playlist.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, x: 5 }}
                onClick={() => playTrack(track)}
                onMouseEnter={() => setHoveredTrack(track.id)}
                onMouseLeave={() => setHoveredTrack(null)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl p-5 shadow-lg transition-all duration-300 ${
                  currentTrack?.id === track.id
                    ? `bg-gradient-to-r ${track.color} bg-opacity-20 shadow-2xl`
                    : 'bg-white/90 hover:bg-pink-50/50 hover:shadow-xl'
                }`}
              >
                {currentTrack?.id === track.id && isPlaying && (
                  <motion.div
                    className={`absolute inset-0 -z-10 bg-gradient-to-r ${track.color} opacity-30 blur-2xl`}
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}

                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{
                      rotate:
                        currentTrack?.id === track.id && isPlaying ? 360 : 0,
                      scale: hoveredTrack === track.id ? 1.1 : 1,
                    }}
                    transition={{
                      rotate: {
                        duration: 10,
                        repeat: Infinity,
                        ease: 'linear',
                      },
                      scale: { duration: 0.2 },
                    }}
                    className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${track.color} text-3xl shadow-lg`}
                  >
                    {track.emoji}
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold text-gray-800">
                      {track.title}
                    </h3>
                    <p className="mb-1 text-sm text-gray-600">{track.artist}</p>
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{
                        opacity: hoveredTrack === track.id ? 1 : 0.7,
                        y: 0,
                      }}
                      className="font-cursive text-xs text-pink-600"
                    >
                      {track.memory}
                    </motion.p>
                  </div>

                  <div className="flex items-center gap-3">
                    {track.icon && (
                      <motion.div
                        animate={{
                          rotate:
                            hoveredTrack === track.id ? [0, 10, -10, 0] : 0,
                          scale: hoveredTrack === track.id ? [1, 1.2, 1] : 1,
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: hoveredTrack === track.id ? Infinity : 0,
                        }}
                        className="text-2xl"
                      >
                        {track.icon}
                      </motion.div>
                    )}

                    {currentTrack?.id === track.id && isPlaying ? (
                      <div className="flex gap-0.5">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`w-1 rounded-full bg-gradient-to-t ${track.color}`}
                            animate={{
                              height: ['12px', '24px', '12px'],
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.15,
                              ease: 'easeInOut',
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: hoveredTrack === track.id ? 1 : 0,
                          scale: hoveredTrack === track.id ? 1 : 0,
                        }}
                        className="text-2xl"
                      >
                        ▶️
                      </motion.div>
                    )}

                    <span className="text-sm text-gray-500">
                      {track.duration}
                    </span>
                  </div>

                  {index < 2 && (
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="absolute right-4 top-4 text-xl"
                    >
                      💕
                    </motion.div>
                  )}
                </div>

                <AnimatePresence>
                  {hoveredTrack === track.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute -top-12 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-800 px-3 py-1.5 text-xs text-white shadow-lg"
                    >
                      {track.memory}
                      <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-800" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
