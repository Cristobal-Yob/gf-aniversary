'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Auto-play cuando carga la página
  useEffect(() => {
    // Pequeño delay para evitar problemas con políticas de autoplay
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch(error => {
            console.log('Auto-play bloqueado:', error)
            // Si el autoplay falla, mostramos el control para que el usuario pueda iniciar
          })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/music/31 minutos - El perro Duque - Doggy style.mp3"
        loop
        preload="auto"
      />

      {/* Control Flotante */}
      <AnimatePresence>
        {isVisible ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <div className="flex items-center space-x-3 rounded-full bg-gradient-to-r from-pink-600 to-orange-600 px-6 py-3 shadow-2xl transition-all hover:scale-105 hover:shadow-pink-500/70">
              <button
                onClick={togglePlay}
                className="text-2xl text-white transition-transform hover:scale-125"
                title={isPlaying ? 'Pausar música' : 'Reproducir música'}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>

              <span className="text-sm font-semibold text-white">
                {isPlaying ? '🎵 Sonando...' : '🎵 Pausada'}
              </span>

              {isPlaying && (
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ scaleY: [1, 1.5, 1] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="h-3 w-1 rounded-full bg-white"
                  />
                  <motion.div
                    animate={{ scaleY: [1, 1.8, 1] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.1,
                    }}
                    className="h-3 w-1 rounded-full bg-white"
                  />
                  <motion.div
                    animate={{ scaleY: [1, 1.5, 1] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.2,
                    }}
                    className="h-3 w-1 rounded-full bg-white"
                  />
                </div>
              )}

              <button
                onClick={toggleVisibility}
                className="text-white transition-transform hover:scale-125"
                title="Minimizar"
              >
                ➖
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={toggleVisibility}
            className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-600 to-orange-600 text-3xl shadow-2xl transition-all hover:scale-110 hover:shadow-pink-500/70"
            title="Mostrar reproductor"
          >
            {isPlaying ? '🎵' : '🎵'}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
