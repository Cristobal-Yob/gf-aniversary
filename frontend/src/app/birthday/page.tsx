'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Confetti from '@/components/Confetti'
import { useAuth } from '@/contexts/AuthContext'
import { IconArrowRight, IconHeart, IconVolume } from '@/components/icons'
import { MarkHeart, Perforation } from '@/components/illustrations'
import DrawOnView from '@/components/ui/DrawOnView'
import PrivateSheet from '@/components/secondary/PrivateSheet'
import SheetHeader from '@/components/secondary/SheetHeader'
import BirthdayCake from '@/components/secondary/BirthdayCake'
import { useReveal } from '@/components/secondary/motion'
import { EASE_OUT } from '@/lib/site'

const MOVE_ACROSS = [0.77, 0, 0.175, 1] as const

export default function BirthdayPage() {
  const { isAuthenticated } = useAuth()
  const [showCard, setShowCard] = useState(false)
  const [cardOpened, setCardOpened] = useState(false)
  const [candleLit, setCandleLit] = useState(true)
  const [showWish, setShowWish] = useState(false)
  const [blowDetected, setBlowDetected] = useState(false)
  const reduceMotion = useReducedMotion()
  const reveal = useReveal()

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

      // El micrófono se libera una sola vez: al soplar o al vencer el tiempo
      let finished = false
      const release = () => {
        if (finished) return
        finished = true
        stream.getTracks().forEach(track => track.stop())
        audioContext.close()
      }

      const checkVolume = () => {
        if (finished) return
        analyser.getByteFrequencyData(dataArray)
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length

        if (average > 50) {
          // Detectó soplido
          setCandleLit(false)
          setBlowDetected(true)
          release()

          setTimeout(() => {
            setShowWish(true)
          }, 1000)
        } else {
          requestAnimationFrame(checkVolume)
        }
      }

      checkVolume()

      // Timeout de seguridad
      setTimeout(release, 10000)
    } catch (err) {
      // Sin micrófono o sin permiso: la vela se apaga con un clic
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

  const toggleCard = () => setCardOpened(!cardOpened)

  if (!isAuthenticated) {
    return (
      <PrivateSheet
        title="Área Especial"
        message="Inicia sesión para ver esta sorpresa"
      />
    )
  }

  // Giro de la tarjeta; con movimiento reducido, un fundido entre caras
  const face = (visible: boolean, hiddenAngle: number) =>
    reduceMotion
      ? { opacity: visible ? 1 : 0 }
      : {
          opacity: 1,
          transform: `perspective(1400px) rotateY(${visible ? 0 : hiddenAngle}deg)`,
        }

  const lateFade = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: cardOpened ? 1 : 0 },
    transition: { delay: cardOpened ? delay : 0, duration: 0.5, ease: EASE_OUT },
  })

  return (
    <>
      <Navbar />

      {/* Confetti cuando se abre la tarjeta o se apaga la vela */}
      {(cardOpened || showWish) && <Confetti duration={8000} intensity="high" />}

      <main>
        <SheetHeader label="Cumpleaños" title="¡Feliz Cumpleaños Josefa!">
          <p>Mi amor, este día es especial porque existes tú</p>
        </SheetHeader>

        {/* Tarjeta de cumpleaños interactiva */}
        <section className="px-4 pb-16 pt-20 md:px-8 md:pb-24 md:pt-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-12">
            <motion.div {...reveal()} className="lg:col-span-5">
              <h2 className="font-display text-5xl font-black uppercase leading-[0.9] md:text-7xl">
                Tu Tarjeta Especial
              </h2>
              {!showCard && (
                <button
                  type="button"
                  onClick={() => setShowCard(true)}
                  className="btn-almanac group mt-8 border-ink bg-ink text-paper hover:border-calipso hover:bg-calipso hover:text-ink"
                >
                  Abrir mi tarjeta
                  <IconArrowRight className="h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                </button>
              )}
              {showCard && cardOpened && (
                <p className="mt-6 text-base text-dim">
                  Toca la tarjeta para cerrarla
                </p>
              )}
            </motion.div>

            <div className="lg:col-span-7">
              <AnimatePresence>
                {showCard && (
                  <motion.div
                    key="card"
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, transform: 'translateY(-32px) rotate(6deg)' }
                    }
                    animate={
                      reduceMotion
                        ? { opacity: 1 }
                        : { opacity: 1, transform: 'translateY(0px) rotate(-1.5deg)' }
                    }
                    transition={{ duration: 0.8, ease: EASE_OUT }}
                    className="mx-auto w-full max-w-md"
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      aria-pressed={cardOpened}
                      aria-label={cardOpened ? 'Cerrar la tarjeta' : 'Abrir la tarjeta'}
                      onClick={toggleCard}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          toggleCard()
                        }
                      }}
                      className="relative h-[480px] w-full cursor-pointer md:h-[520px]"
                    >
                      {/* Tarjeta cerrada */}
                      <motion.div
                        className="absolute inset-0 flex flex-col items-center justify-center border-2 border-ink bg-calipso p-6 text-center text-ink"
                        initial={false}
                        animate={face(!cardOpened, 180)}
                        transition={{ duration: 0.8, ease: MOVE_ACROSS }}
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <svg
                          viewBox="0 0 120 84"
                          aria-hidden="true"
                          className="h-24 w-32 md:h-28 md:w-40"
                        >
                          <rect x={3} y={3} width={114} height={78} className="fill-paper stroke-ink" strokeWidth={3} />
                          <path d="M3 3L60 48L117 3" className="fill-none stroke-ink" strokeWidth={3} strokeLinejoin="round" />
                          <path d="m60 66-8-8a5 5 0 0 1 7-7l1 1 1-1a5 5 0 0 1 7 7Z" className="fill-marker stroke-ink" strokeWidth={2} />
                        </svg>
                        <p className="mt-6 font-display text-3xl font-extrabold uppercase leading-none md:text-4xl">
                          Toca para abrir
                        </p>
                        <p className="mt-3 text-base text-calipso-shade">
                          Con mucho amor para ti
                        </p>
                      </motion.div>

                      {/* Contenido de la tarjeta */}
                      <motion.div
                        className="absolute inset-0 flex flex-col overflow-y-auto border-2 border-ink bg-paper p-5 text-ink [--accent:theme(colors.calipso.deep)] md:p-7"
                        initial={false}
                        animate={face(cardOpened, -180)}
                        transition={{ duration: 0.8, ease: MOVE_ACROSS }}
                        style={{ backfaceVisibility: 'hidden' }}
                        aria-hidden={!cardOpened}
                      >
                        <motion.h3
                          {...lateFade(0.6)}
                          className="font-hand text-4xl leading-none text-calipso-deep md:text-5xl"
                        >
                          Mi Josefa hermosa
                        </motion.h3>
                        <Perforation className="mt-4 h-2 w-full text-rule" />
                        <motion.div
                          {...lateFade(0.8)}
                          className="mt-4 space-y-3 text-sm leading-relaxed md:text-base"
                        >
                          <p>
                            Feliz cumpleaños a la mejor pololaaa del mundooooo amorshito te amo muchisimo la cosa mas linda del universo, el cual te merces y mas.
                          </p>
                          <p>
                            Ojala que hoy en su dia numero 9497 la pase lo mejor, y este año va a ser super wenisimo nos vamos a vivir juntitos y nos daremos muchos besitos y podremos dormir juntos todas las noches.
                          </p>
                          <p>
                            Te amo mucho mi amor feliz cumpleaños te lo mereces todo y mas
                          </p>
                          <p className="flex gap-2 pt-1 text-calipso-deep">
                            {[0, 1, 2, 3].map(i => (
                              <IconHeart key={i} className="h-5 w-5" />
                            ))}
                          </p>
                        </motion.div>
                        <motion.p
                          {...lateFade(1)}
                          className="mt-auto pt-4 font-hand text-3xl leading-none text-calipso-deep md:text-4xl"
                        >
                          Te amo infinito
                        </motion.p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Vela interactiva */}
        <section className="px-4 pb-20 md:px-8 md:pb-28">
          <motion.div
            {...reveal()}
            className="mx-auto grid max-w-7xl items-center gap-10 border-t-2 border-ink pt-12 lg:grid-cols-12 lg:gap-12 lg:pt-16"
          >
            <div className="lg:col-span-6">
              <h2 className="font-display text-5xl font-black uppercase leading-[0.9] md:text-7xl">
                Sopla la Vela y Pide un Deseo
              </h2>

              <AnimatePresence mode="wait">
                {candleLit ? (
                  <motion.div
                    key="instructions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-6"
                  >
                    <p className="max-w-xl text-lg text-dim">
                      Sopla hacia el micrófono o toca la vela para apagarla
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={handleBlowCandle}
                        className="btn-almanac border-ink bg-ink text-paper hover:border-calipso hover:bg-calipso hover:text-ink"
                      >
                        <IconVolume className="h-5 w-5" />
                        Usar micrófono
                      </button>
                      <button
                        type="button"
                        onClick={handleCandleClick}
                        className="btn-almanac border-ink hover:bg-ink hover:text-paper"
                      >
                        Tocar para apagar
                      </button>
                    </div>
                  </motion.div>
                ) : showWish ? (
                  <motion.div
                    key="wish"
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, transform: 'translateY(14px) scale(0.94)' }
                    }
                    animate={
                      reduceMotion
                        ? { opacity: 1 }
                        : { opacity: 1, transform: 'translateY(0px) scale(1)' }
                    }
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                    className="mt-6 [--accent:theme(colors.calipso.deep)]"
                  >
                    <div className="flex items-center gap-4">
                      <DrawOnView className="block h-12 w-12 shrink-0 md:h-14 md:w-14">
                        <MarkHeart className="h-full w-full" />
                      </DrawOnView>
                      <h3 className="font-display text-3xl font-extrabold uppercase leading-[0.9] text-calipso-deep md:text-4xl">
                        ¡Tu deseo se cumplirá!
                      </h3>
                    </div>
                    <p className="mt-4 text-lg text-dim">
                      Guarda tu deseo en el corazón
                    </p>
                    <motion.button
                      type="button"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2, duration: 0.4 }}
                      onClick={() => {
                        setCandleLit(true)
                        setShowWish(false)
                        setBlowDetected(false)
                      }}
                      className="btn-almanac mt-8 border-ink hover:bg-ink hover:text-paper"
                    >
                      Encender de nuevo
                    </motion.button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-6">
              <button
                type="button"
                onClick={handleCandleClick}
                disabled={!candleLit}
                aria-label="Tocar para apagar"
                className="mx-auto block w-full max-w-sm disabled:cursor-default"
              >
                <BirthdayCake
                  lit={candleLit}
                  smoking={!candleLit && !showWish}
                  className="h-auto w-full"
                />
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Mensaje final */}
      <footer className="bg-ink px-4 pb-28 pt-16 text-paper md:px-8 md:pb-32 md:pt-24">
        <motion.div {...reveal()} className="mx-auto max-w-7xl">
          <p className="font-hand text-4xl leading-snug text-marker md:text-6xl">
            Te amo con todo mi corazón
          </p>
          <p className="mt-4 font-display text-xl font-semibold uppercase tracking-wide text-rule">
            - Cristóbal
          </p>
        </motion.div>
      </footer>
    </>
  )
}
