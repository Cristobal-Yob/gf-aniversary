'use client'

import { useState, useRef, useEffect } from 'react'

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
      <div className="fixed bottom-8 right-8 z-50">
        {isVisible ? (
          <div className="flex items-center space-x-3 rounded-full bg-gradient-to-r from-pink-600 to-orange-600 px-6 py-3 shadow-2xl transition-all hover:scale-105 hover:shadow-pink-500/70">
            <button
              onClick={togglePlay}
              className="text-2xl text-white transition-transform hover:scale-125"
              title={isPlaying ? 'Pausar música' : 'Reproducir música'}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-white">
                {isPlaying ? '🎵 Sonando...' : '🎵 Pausada'}
              </span>
              {isPlaying && (
                <div className="flex space-x-1">
                  <div
                    className="h-3 w-1 animate-pulse rounded-full bg-white"
                    style={{ animationDelay: '0s' }}
                  ></div>
                  <div
                    className="h-3 w-1 animate-pulse rounded-full bg-white"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                  <div
                    className="h-3 w-1 animate-pulse rounded-full bg-white"
                    style={{ animationDelay: '0.4s' }}
                  ></div>
                </div>
              )}
            </div>

            <button
              onClick={toggleVisibility}
              className="text-white transition-transform hover:scale-125"
              title="Minimizar"
            >
              ➖
            </button>
          </div>
        ) : (
          <button
            onClick={toggleVisibility}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-600 to-orange-600 text-3xl shadow-2xl transition-all hover:scale-110 hover:shadow-pink-500/70"
            title="Mostrar reproductor"
          >
            {isPlaying ? '🎵' : '🎵'}
          </button>
        )}
      </div>
    </>
  )
}
