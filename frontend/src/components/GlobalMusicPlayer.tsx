'use client'

import { useMusicPlayer } from '@/contexts/MusicPlayerContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function GlobalMusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    togglePlayPause,
    nextTrack,
    previousTrack,
    seekTo,
  } = useMusicPlayer()
  const [isExpanded, setIsExpanded] = useState(false)

  if (!currentTrack) return null

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.div
          animate={{ scale: isExpanded ? 1 : 1 }}
          className={`group relative overflow-hidden rounded-2xl backdrop-blur-2xl transition-all duration-500 ${
            isExpanded ? 'w-80' : 'w-72'
          }`}
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
            boxShadow:
              '0 8px 32px rgba(236, 72, 153, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.5)',
          }}
        >
          {/* Glow animado de fondo */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${currentTrack.color} opacity-20 blur-2xl`}
            animate={{
              opacity: isPlaying ? [0.2, 0.4, 0.2] : 0.1,
              scale: isPlaying ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <div className="relative p-4">
            {/* Header con info de canción */}
            <div className="mb-3 flex items-center gap-3">
              {/* Emoji rotando si está reproduciendo */}
              <motion.div
                animate={{
                  rotate: isPlaying ? 360 : 0,
                  scale: isPlaying ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
                }}
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${currentTrack.color} text-2xl shadow-lg`}
              >
                {currentTrack.emoji}
              </motion.div>

              {/* Info */}
              <div className="flex-1 overflow-hidden">
                <h3 className="truncate text-sm font-bold text-gray-900 drop-shadow-sm">
                  {currentTrack.title}
                </h3>
                <p className="truncate text-xs text-gray-700 drop-shadow-sm">
                  {currentTrack.artist}
                </p>
              </div>

              {/* Ícono especial */}
              {currentTrack.icon && (
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-xl"
                >
                  {currentTrack.icon}
                </motion.div>
              )}
            </div>

            {/* Barra de progreso */}
            <div className="mb-3">
              <div
                className="group/progress relative h-1.5 cursor-pointer overflow-hidden rounded-full bg-gray-200"
                onClick={e => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const percent = x / rect.width
                  seekTo(percent * duration)
                }}
              >
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${currentTrack.color} shadow-lg`}
                  style={{ width: `${progressPercent}%` }}
                  animate={{
                    boxShadow: isPlaying
                      ? '0 0 15px rgba(236, 72, 153, 0.6)'
                      : '0 0 5px rgba(236, 72, 153, 0.3)',
                  }}
                />
                {/* Indicador de hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover/progress:opacity-100">
                  <div className="h-full w-full bg-white/30" />
                </div>
              </div>
              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controles */}
            <div className="flex items-center justify-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={previousTrack}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all hover:bg-gray-200 hover:shadow-md"
              >
                ⏮️
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlayPause}
                className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${currentTrack.color} text-2xl text-white shadow-lg transition-all hover:shadow-xl`}
                animate={{
                  boxShadow: isPlaying
                    ? [
                        '0 4px 20px rgba(236, 72, 153, 0.4)',
                        '0 4px 30px rgba(236, 72, 153, 0.6)',
                        '0 4px 20px rgba(236, 72, 153, 0.4)',
                      ]
                    : '0 4px 20px rgba(236, 72, 153, 0.3)',
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTrack}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all hover:bg-gray-200 hover:shadow-md"
              >
                ⏭️
              </motion.button>
            </div>

            {/* Ondas de sonido animadas (si está reproduciendo) */}
            {isPlaying && (
              <div className="absolute right-4 top-4 flex gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-0.5 rounded-full bg-gradient-to-t ${currentTrack.color}`}
                    animate={{
                      height: ['8px', '16px', '8px'],
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
            )}

            {/* Tooltip con el recuerdo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-2 text-center text-xs font-medium italic text-pink-700 drop-shadow-sm"
            >
              {currentTrack.memory}
            </motion.div>
          </div>
        </motion.div>

        {/* Corazón pulsante flotante */}
        <motion.div
          className="absolute -right-2 -top-2 text-2xl"
          animate={{
            scale: isPlaying ? [1, 1.3, 1] : 1,
            rotate: isPlaying ? [0, 10, -10, 0] : 0,
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          💗
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
