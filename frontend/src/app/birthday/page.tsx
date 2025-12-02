'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Confetti from '@/components/Confetti'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

export default function BirthdayPage() {
  const { isAuthenticated } = useAuth()
  const [showCard, setShowCard] = useState(false)
  const [cardOpened, setCardOpened] = useState(false)
  const [candleLit, setCandleLit] = useState(true)
  const [showWish, setShowWish] = useState(false)
  const [blowDetected, setBlowDetected] = useState(false)

  // Detectar soplido con micrófono
  const handleBlowCandle = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const audioContext = new AudioContext()
      const analyser = audioContext.createAnalyser()
      const microphone = audioContext.createMediaStreamSource(stream)
      microphone.connect(analyser)
      analyser.fftSize = 256

      const dataArray = new Uint8Array(analyser.frequencyBinCount)

      const checkVolume = () => {
        analyser.getByteFrequencyData(dataArray)
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length

        if (average > 50) {
          // Detectó soplido
          setCandleLit(false)
          setBlowDetected(true)
          stream.getTracks().forEach(track => track.stop())
          audioContext.close()
          
          setTimeout(() => {
            setShowWish(true)
          }, 1000)
        } else if (candleLit && !blowDetected) {
          requestAnimationFrame(checkVolume)
        }
      }

      checkVolume()

      // Timeout de seguridad
      setTimeout(() => {
        if (candleLit) {
          stream.getTracks().forEach(track => track.stop())
          audioContext.close()
        }
      }, 10000)
    } catch (err) {
      // Si no tiene micrófono, apagar con clic
      console.log('No microphone, using click')
    }
  }

  // Apagar vela con clic (fallback)
  const handleCandleClick = () => {
    if (candleLit) {
      setCandleLit(false)
      setTimeout(() => {
        setShowWish(true)
      }, 1000)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <Navbar />
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
          <div className="text-center">
            <div className="mb-4 text-6xl">🔒</div>
            <h1 className="mb-4 text-2xl font-bold text-gray-800">Área Especial</h1>
            <p className="mb-6 text-gray-600">Inicia sesión para ver esta sorpresa</p>
            <Link
              href="/auth"
              className="rounded-full bg-pink-500 px-6 py-3 font-medium text-white hover:bg-pink-600"
            >
              Iniciar Sesión 💕
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      <Navbar />
      
      {/* Confetti cuando se abre la tarjeta o se apaga la vela */}
      {(cardOpened || showWish) && <Confetti duration={8000} intensity="high" />}

      <div className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-4xl">
          
          {/* Título principal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center md:mb-12"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-4 text-5xl md:text-7xl"
            >
              🎂
            </motion.div>
            <h1 className="mb-2 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
              ¡Feliz Cumpleaños Josefa!
            </h1>
            <p className="text-lg text-gray-600 md:text-xl">Mi amor, este día es especial porque existes tú 💕</p>
          </motion.div>

          {/* Tarjeta de cumpleaños interactiva */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 md:mb-12"
          >
            <h2 className="mb-4 text-center text-xl font-bold text-gray-800 md:mb-6 md:text-2xl">
              💌 Tu Tarjeta Especial 💌
            </h2>

            <div className="flex justify-center">
              {!showCard ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCard(true)}
                  className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl"
                >
                  Abrir mi tarjeta 💝
                </motion.button>
              ) : (
                <div className="perspective-1000 w-full max-w-md">
                  <motion.div
                    className="relative h-[450px] w-full cursor-pointer md:h-[500px]"
                    onClick={() => setCardOpened(!cardOpened)}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Sobre / Tarjeta cerrada */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 p-1 shadow-2xl"
                      animate={{
                        rotateY: cardOpened ? 180 : 0,
                      }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="flex h-full w-full flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-pink-50 to-white">
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="mb-4 text-6xl md:text-8xl"
                        >
                          💌
                        </motion.div>
                        <p className="text-lg font-medium text-pink-600 md:text-xl">
                          Toca para abrir
                        </p>
                        <p className="mt-2 text-sm text-gray-500">Con mucho amor para ti ❤️</p>
                      </div>
                    </motion.div>

                    {/* Contenido de la tarjeta */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400 via-pink-400 to-rose-500 p-1 shadow-2xl"
                      initial={{ rotateY: -180 }}
                      animate={{
                        rotateY: cardOpened ? 0 : -180,
                      }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="flex h-full w-full flex-col items-center justify-center overflow-y-auto rounded-3xl bg-gradient-to-br from-white to-pink-50 p-4 text-center md:p-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: cardOpened ? 1 : 0 }}
                          transition={{ delay: 0.5, type: 'spring' }}
                          className="mb-2 text-3xl md:mb-3 md:text-4xl"
                        >
                          🎂✨🎉
                        </motion.div>
                        <motion.h3
                          initial={{ opacity: 0 }}
                          animate={{ opacity: cardOpened ? 1 : 0 }}
                          transition={{ delay: 0.7 }}
                          className="mb-2 font-script text-xl text-pink-600 md:mb-3 md:text-2xl"
                        >
                          Mi Josefa hermosa
                        </motion.h3>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: cardOpened ? 1 : 0 }}
                          transition={{ delay: 0.9 }}
                          className="text-xs leading-relaxed text-gray-700 md:text-sm"
                        >
                          <p className="mb-2">
                            Feliz cumpleaños a la mejor pololaaa del mundooooo amorshito te amo muchisimo la cosa mas linda del universo, el cual te merces y mas.
                          </p>
                          <p className="mb-2">
                            Ojala que hoy en su dia numero 9497 la pase lo mejor, y este año va a ser super wenisimo nos vamos a vivir juntitos y nos daremos muchos besitos y podremos dormir juntos todas las noches.
                          </p>
                          <p className="mb-2">
                            Te amo mucho mi amor feliz cumpleaños te lo mereces todo y mas
                          </p>
                          <p className="text-lg md:text-xl">
                            ❤️❤️❤️❤️�🎉🎉🎉🥳🥳🥳🥳🥳🥳🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊
                          </p>
                        </motion.div>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: cardOpened ? 1 : 0 }}
                          transition={{ delay: 1.1 }}
                          className="mt-3 font-script text-lg text-pink-500 md:mt-4 md:text-xl"
                        >
                          Te amo infinito 💕
                        </motion.p>
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  {cardOpened && (
                    <p className="mt-4 text-center text-sm text-gray-500">
                      Toca la tarjeta para cerrarla
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.section>

          {/* Vela interactiva mejorada */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <div className="rounded-3xl border border-purple-200 bg-white/80 p-6 shadow-xl backdrop-blur-sm md:p-8">
              <h2 className="mb-8 text-center text-xl font-bold text-gray-800 md:text-2xl">
                🕯️ Sopla la Vela y Pide un Deseo 🕯️
              </h2>

              <div className="flex flex-col items-center">
                {/* Pastel con vela - diseño simplificado */}
                <div className="relative mb-8 flex flex-col items-center">
                  
                  {/* Vela - arriba del pastel */}
                  <div className="relative mb-2 flex flex-col items-center">
                    {/* Llama */}
                    <AnimatePresence>
                      {candleLit && (
                        <motion.div
                          initial={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0, y: -10 }}
                          className="relative mb-1"
                        >
                          {/* Resplandor */}
                          <motion.div
                            animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="absolute -inset-3 rounded-full bg-yellow-300/40 blur-lg"
                          />
                          {/* Llama SVG */}
                          <motion.svg
                            width="28"
                            height="40"
                            viewBox="0 0 28 40"
                            animate={{
                              scaleY: [1, 1.1, 0.95, 1.05, 1],
                              x: [-1, 1, -0.5, 0.5, -1],
                            }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                          >
                            <defs>
                              <linearGradient id="flame1" x1="0%" y1="100%" x2="0%" y2="0%">
                                <stop offset="0%" stopColor="#ea580c" />
                                <stop offset="40%" stopColor="#f59e0b" />
                                <stop offset="70%" stopColor="#fbbf24" />
                                <stop offset="100%" stopColor="#fef3c7" />
                              </linearGradient>
                              <linearGradient id="flame2" x1="0%" y1="100%" x2="0%" y2="0%">
                                <stop offset="0%" stopColor="#2563eb" />
                                <stop offset="50%" stopColor="#60a5fa" />
                                <stop offset="100%" stopColor="#fff" />
                              </linearGradient>
                            </defs>
                            {/* Llama exterior */}
                            <path
                              d="M14 2 C14 2, 6 14, 6 24 C6 32, 10 38, 14 38 C18 38, 22 32, 22 24 C22 14, 14 2, 14 2Z"
                              fill="url(#flame1)"
                            />
                            {/* Llama interior */}
                            <path
                              d="M14 18 C14 18, 10 24, 10 30 C10 34, 12 36, 14 36 C16 36, 18 34, 18 30 C18 24, 14 18, 14 18Z"
                              fill="url(#flame2)"
                            />
                          </motion.svg>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Humo cuando se apaga */}
                    <AnimatePresence>
                      {!candleLit && !showWish && (
                        <motion.div className="relative mb-1 h-10">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0.5, y: 0, scale: 0.5 }}
                              animate={{ opacity: 0, y: -30, scale: 1.5, x: (i - 1) * 10 }}
                              transition={{ duration: 1.5, delay: i * 0.15 }}
                              className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-gray-400/60 blur-sm"
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Mecha */}
                    <div className="h-2 w-[3px] rounded-sm bg-gray-800" />
                    
                    {/* Cuerpo de la vela */}
                    <div className="relative h-16 w-6 overflow-hidden rounded-sm bg-gradient-to-b from-pink-100 to-pink-200 shadow-md md:h-20 md:w-8">
                      {/* Rayas decorativas */}
                      <div className="absolute inset-y-0 left-1 w-[3px] bg-gradient-to-b from-pink-300 to-pink-400" />
                      <div className="absolute inset-y-0 left-[45%] w-[3px] bg-gradient-to-b from-purple-300 to-purple-400" />
                      <div className="absolute inset-y-0 right-1 w-[3px] bg-gradient-to-b from-pink-300 to-pink-400" />
                      {/* Brillo */}
                      <div className="absolute inset-y-0 left-0 w-1 bg-white/30" />
                    </div>
                    
                    {/* Base de la vela */}
                    <div className="h-2 w-8 rounded-b-sm bg-gradient-to-b from-yellow-300 to-yellow-500 shadow-sm md:w-10" />
                  </div>

                  {/* Pastel */}
                  <div className="relative">
                    {/* Capa superior - crema */}
                    <div className="relative z-10 -mb-1 flex justify-center">
                      <div className="h-6 w-36 rounded-t-full bg-gradient-to-b from-white to-pink-50 shadow-inner md:w-48" />
                    </div>
                    
                    {/* Decoración de frutas en la crema */}
                    <div className="absolute -top-1 left-1/2 z-20 flex -translate-x-1/2 gap-6 md:gap-8">
                      {['🍓', '🫐', '🍓'].map((fruit, i) => (
                        <motion.span
                          key={i}
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                          className="text-lg md:text-xl"
                        >
                          {fruit}
                        </motion.span>
                      ))}
                    </div>

                    {/* Capa del pastel */}
                    <div className="relative h-20 w-40 rounded-2xl bg-gradient-to-b from-pink-200 via-pink-300 to-pink-400 shadow-lg md:h-24 md:w-52">
                      {/* Rayas verticales del pastel */}
                      <div className="absolute inset-0 overflow-hidden rounded-2xl">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute top-0 h-full w-[2px] bg-pink-100/30"
                            style={{ left: `${(i + 1) * 11}%` }}
                          />
                        ))}
                      </div>
                      
                      {/* Decoración de bolitas de crema en la base */}
                      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="h-3 w-3 rounded-full bg-white shadow-sm md:h-4 md:w-4"
                          />
                        ))}
                      </div>
                      
                      {/* Texto del pastel */}
                      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 md:bottom-8">
                        <span className="whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-pink-600 shadow-sm md:text-sm">
                          ¡Feliz Cumple! 🎉
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Plato */}
                  <div className="-mt-1 h-3 w-44 rounded-b-xl bg-gradient-to-b from-gray-100 to-gray-300 shadow-md md:w-56" />
                </div>

                {/* Instrucciones y botones */}
                {candleLit ? (
                  <div className="text-center">
                    <p className="mb-4 text-gray-600">
                      Sopla hacia el micrófono o toca la vela para apagarla 🌬️
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBlowCandle}
                        className="rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 px-6 py-3 font-medium text-white shadow-lg"
                      >
                        🎤 Usar micrófono
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCandleClick}
                        className="rounded-full bg-gradient-to-r from-pink-400 to-rose-400 px-6 py-3 font-medium text-white shadow-lg"
                      >
                        👆 Tocar para apagar
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <AnimatePresence>
                    {showWish && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="mb-4 text-5xl md:text-6xl"
                        >
                          ✨🌟⭐
                        </motion.div>
                        <h3 className="mb-2 text-2xl font-bold text-pink-600 md:text-3xl">
                          ¡Tu deseo se cumplirá!
                        </h3>
                        <p className="text-gray-600">
                          Guarda tu deseo en el corazón 💕
                        </p>
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setCandleLit(true)
                            setShowWish(false)
                            setBlowDetected(false)
                          }}
                          className="mt-4 rounded-full bg-purple-100 px-4 py-2 text-sm text-purple-600"
                        >
                          Encender de nuevo 🕯️
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </motion.section>

          {/* Mensaje final */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <p className="font-script text-2xl text-pink-600 md:text-3xl">
              Te amo con todo mi corazón 💕
            </p>
            <p className="mt-2 text-gray-500">- Cristóbal</p>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
