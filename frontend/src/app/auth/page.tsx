'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useMusicPlayer } from '@/contexts/MusicPlayerContext'
import Navbar from '@/components/Navbar'
import { IconArrowRight, IconHeart, IconLock } from '@/components/icons'
import {
  BindingRings,
  MarkUnderline,
  Perforation,
  TornEdge,
} from '@/components/illustrations'
import DrawOnView from '@/components/ui/DrawOnView'
import { EASE_OUT } from '@/lib/site'

const fieldClass =
  'w-full border-2 border-ink bg-paper px-4 py-3.5 text-base placeholder:text-dim focus:border-calipso-deep focus:outline-none focus:ring-0'
const labelClass =
  'mb-2 block font-display text-lg font-semibold uppercase tracking-wide'

export default function AuthPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const { playlist, playTrack } = useMusicPlayer()
  const reduceMotion = useReducedMotion()

  // Verificar si es 2 de diciembre (cumpleaños)
  const isBirthday = () => {
    const today = new Date()
    return today.getMonth() === 11 && today.getDate() === 2
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await login(username, password)
      // Si es cumpleaños, reproducir canción de cumpleaños, sino Come to Me
      const songToPlay = isBirthday()
        ? playlist.find(track => track.title === 'Cumpleaños Feliz')
        : playlist.find(track => track.title === 'Come to Me')

      if (songToPlay) {
        playTrack(songToPlay)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  // Entradas al montar; con movimiento reducido solo fundidos
  const enter = (delay: number) => ({
    initial: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, transform: 'translateY(14px)' },
    animate: reduceMotion
      ? { opacity: 1 }
      : { opacity: 1, transform: 'translateY(0px)' },
    transition: { duration: 0.7, delay, ease: EASE_OUT },
  })

  // La hoja cae sobre el campo azul y, al entrar, se arranca desde la esquina superior izquierda
  const sheetMotion = {
    initial: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, transform: 'translateY(-24px) rotate(4deg)' },
    animate: reduceMotion
      ? { opacity: 1 }
      : { opacity: 1, transform: 'translateY(0px) rotate(-1.5deg)' },
    exit: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, transform: 'translateY(-120px) rotate(-9deg)' },
    transition: { duration: 0.8, delay: 0.2, ease: EASE_OUT },
  }

  return (
    <>
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-calipso text-ink [--accent:theme(colors.marker)]">
          <BindingRings className="h-8 w-full text-ink md:h-10" />

          <div className="mx-auto grid min-h-[calc(100svh-6rem)] max-w-7xl items-center gap-12 px-4 pb-28 pt-8 md:px-8 lg:grid-cols-12 lg:gap-8 lg:pt-12">
            <div className="lg:col-span-7">
              <motion.h1
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }
                }
                animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                transition={{ duration: 0.9, ease: EASE_OUT }}
                className="font-display text-[clamp(3rem,12vw,7rem)] font-black uppercase leading-[0.9] break-words"
              >
                ¡Feliz Aniversario!
              </motion.h1>

              <motion.div {...enter(0.25)} className="mt-6 inline-block">
                <p className="relative text-xl font-semibold md:text-2xl">
                  {isAuthenticated
                    ? 'Bienvenida a tu espacio especial, mi amor'
                    : 'Ingresa para ver tu sorpresa especial'}
                  <DrawOnView
                    delay={900}
                    className="absolute -bottom-3 left-0 block h-3 w-full"
                  >
                    <MarkUnderline className="h-full w-full" />
                  </DrawOnView>
                </p>
              </motion.div>

              <motion.p
                {...enter(0.4)}
                className="mt-10 flex items-center gap-2 text-base text-calipso-shade md:text-lg"
              >
                <IconHeart className="h-5 w-5 text-marker" />
                Hecho con amor para ti
              </motion.p>
            </div>

            <div className="lg:col-span-5 lg:justify-self-end">
              <AnimatePresence mode="wait">
                {isAuthenticated ? (
                  <motion.div
                    key="welcome"
                    {...sheetMotion}
                    style={{ transformOrigin: 'top left' }}
                    className="w-full max-w-md bg-paper text-ink shadow-[0_22px_44px_-14px_rgba(15,17,21,0.5)]"
                  >
                    <BindingRings className="h-8 w-full bg-ink text-paper" />
                    <div className="p-6 md:p-8">
                      <IconHeart className="h-12 w-12 text-calipso-deep md:h-14 md:w-14" />
                      <p className="mt-5 font-display text-4xl font-extrabold uppercase leading-[0.9] md:text-5xl">
                        ¡Feliz Aniversario!
                      </p>
                      <Perforation className="mt-6 h-2 w-full text-rule" />
                      <Link
                        href="/"
                        className="btn-almanac group mt-6 w-full border-ink bg-ink text-paper hover:border-calipso hover:bg-calipso hover:text-ink"
                      >
                        Ir al Inicio
                        <IconArrowRight className="h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="login"
                    {...sheetMotion}
                    style={{ transformOrigin: 'top left' }}
                    className="w-full max-w-md bg-paper text-ink shadow-[0_22px_44px_-14px_rgba(15,17,21,0.5)]"
                  >
                    <BindingRings className="h-8 w-full bg-ink text-paper" />
                    <div className="p-6 md:p-8">
                      <div className="flex items-center justify-between border-b-2 border-ink pb-4">
                        <IconLock className="h-10 w-10 md:h-12 md:w-12" />
                        <span className="font-display text-lg font-semibold uppercase tracking-wide text-dim">
                          25 · Noviembre
                        </span>
                      </div>

                      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        <div>
                          <label htmlFor="username" className={labelClass}>
                            Usuario
                          </label>
                          <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className={fieldClass}
                            placeholder="Tu nombre"
                            required
                            autoComplete="username"
                          />
                        </div>

                        <div>
                          <label htmlFor="password" className={labelClass}>
                            Contraseña
                          </label>
                          <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className={fieldClass}
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                          />
                        </div>

                        <AnimatePresence>
                          {error && (
                            <motion.p
                              role="alert"
                              initial={
                                reduceMotion
                                  ? { opacity: 0 }
                                  : { opacity: 0, transform: 'translateY(-8px)' }
                              }
                              animate={
                                reduceMotion
                                  ? { opacity: 1 }
                                  : { opacity: 1, transform: 'translateY(0px)' }
                              }
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2, ease: EASE_OUT }}
                              className="border-2 border-ink bg-marker px-4 py-3 text-sm font-semibold text-ink"
                            >
                              {error}
                            </motion.p>
                          )}
                        </AnimatePresence>

                        <button
                          type="submit"
                          disabled={isLoading}
                          aria-busy={isLoading}
                          className="btn-almanac group w-full border-ink bg-ink text-paper hover:border-calipso hover:bg-calipso hover:text-ink disabled:cursor-wait disabled:border-dim disabled:bg-dim"
                        >
                          {isLoading ? (
                            <>
                              Ingresando...
                              <span
                                aria-hidden
                                className="h-4 w-4 border-2 border-paper border-t-transparent motion-safe:animate-spin"
                              />
                            </>
                          ) : (
                            <>
                              Ver mi sorpresa
                              <IconArrowRight className="h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <TornEdge className="absolute inset-x-0 bottom-0 z-10 h-4 w-full rotate-180 text-paper md:h-6" />
        </section>
      </main>
    </>
  )
}
