'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useMusicPlayer } from '@/contexts/MusicPlayerContext'
import Navbar from '@/components/Navbar'
import DrawOnView from '@/components/ui/DrawOnView'
import Turntable from '@/components/music/Turntable'
import {
  IconArrowRight,
  IconLock,
  IconPause,
  IconPlay,
  IconSkipNext,
  IconSkipPrev,
} from '@/components/icons'
import {
  BindingRings,
  MarkUnderline,
  TornEdge,
} from '@/components/illustrations'
import { EASE_OUT } from '@/lib/site'

function SheetHeader({
  left,
  right,
  children,
}: {
  left: string
  right: string
  children: ReactNode
}) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative bg-calipso text-ink [--accent:theme(colors.marker)]">
      <BindingRings className="h-8 w-full text-ink md:h-10" />
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-2 md:px-8 md:pb-24">
        <div className="flex items-baseline justify-between border-b-2 border-ink pb-2 font-display text-lg font-semibold uppercase tracking-wide md:text-2xl">
          <span>{left}</span>
          <span className="tabular-nums">{right}</span>
        </div>
        <motion.div
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }
          }
          animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
        >
          {children}
        </motion.div>
      </div>
      <TornEdge className="absolute inset-x-0 top-full z-10 -mt-px h-4 w-full text-calipso md:h-6" />
    </section>
  )
}

/** Ilustración que se desliza a otra velocidad que la lista al hacer scroll */
function ParallaxIllustration() {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion
      ? ['translateY(0px) rotate(-4deg)', 'translateY(0px) rotate(-4deg)']
      : ['translateY(60px) rotate(-4deg)', 'translateY(-90px) rotate(-4deg)']
  )

  return (
    <div ref={ref} aria-hidden className="w-28 shrink-0 sm:w-44 md:w-64 lg:mt-8 lg:w-[min(16rem,30vh)]">
      <motion.div style={{ transform }}>
        <Image
          src="/illustrations/musica.webp"
          alt=""
          width={1024}
          height={1024}
          sizes="(min-width: 768px) 256px, 176px"
          className="h-auto w-full"
        />
      </motion.div>
    </div>
  )
}

export default function MusicPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const {
    currentTrack,
    isPlaying,
    playlist,
    playTrack,
    togglePlayPause,
    nextTrack,
    previousTrack,
    audioRef,
  } = useMusicPlayer()
  const reduceMotion = useReducedMotion()
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  // El elemento de audio vive en el proveedor; se lee después de montar
  useEffect(() => setAudio(audioRef.current), [audioRef])

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className="pb-28">
          <SheetHeader left="Soundtrack" right=" ">
            <h1 className="pt-8 font-display text-[clamp(3.5rem,14vw,9rem)] font-black uppercase leading-[0.9]">
              Área Privada
            </h1>
          </SheetHeader>
          {!isLoading && (
            <section className="mx-auto max-w-7xl px-4 pt-20 md:px-8 md:pt-28">
              <div className="flex max-w-2xl items-start gap-5">
                <IconLock className="mt-1 h-10 w-10 shrink-0 md:h-12 md:w-12" />
                <div>
                  <p className="text-xl md:text-2xl">
                    Necesitas iniciar sesión para escuchar nuestra música
                  </p>
                  <Link
                    href="/auth"
                    className="btn-almanac group mt-8 border-ink bg-ink text-paper hover:border-calipso hover:bg-calipso hover:text-ink"
                  >
                    Iniciar Sesión
                    <IconArrowRight className="h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </section>
          )}
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main>
        <SheetHeader left="Soundtrack" right={`${playlist.length} canciones`}>
          <h1 className="pt-8 font-display text-[clamp(3.5rem,14vw,10rem)] font-black uppercase leading-[0.9]">
            Nuestra Música
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-calipso-shade md:text-xl">
            Las canciones que cuentan nuestra historia de amor
          </p>
        </SheetHeader>

        {/* Sonando ahora */}
        <section className="px-4 pb-16 pt-24 md:px-8 md:pb-24 md:pt-32 lg:flex lg:min-h-view lg:items-center lg:py-10">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, transform: 'translateY(-28px) rotate(4deg)' }
              }
              whileInView={{
                opacity: 1,
                transform: 'translateY(0px) rotate(0deg)',
              }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="mx-auto w-full max-w-[520px] lg:col-span-6 lg:max-w-[min(520px,calc(100svh_-_var(--nav-h)_-_var(--player-h)_-_10rem))]"
            >
              <Turntable audio={audio} isPlaying={isPlaying} />
            </motion.div>

            <div className="min-w-0 lg:col-span-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentTrack?.id ?? 'none'}
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, transform: 'translateY(14px)' }
                  }
                  animate={{ opacity: 1, transform: 'translateY(0px)' }}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, transform: 'translateY(-10px)' }
                  }
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                >
                  <h2 className="break-words font-display text-[clamp(2.75rem,9vw,6rem)] font-black uppercase leading-[0.9] lg:text-[clamp(2.5rem,min(6vw,9vh),5.5rem)]">
                    {currentTrack?.title}
                  </h2>
                  <p className="mt-3 text-lg text-dim md:text-xl">
                    {currentTrack?.artist}
                  </p>
                  <p className="relative mt-8 inline-block max-w-2xl font-hand text-3xl leading-snug text-calipso-deep [--accent:theme(colors.marker)] md:text-5xl lg:mt-5 lg:text-[clamp(1.75rem,min(3vw,5.5vh),3rem)]">
                    {currentTrack?.memory}
                    <DrawOnView
                      delay={250}
                      className="absolute -bottom-2 left-0 block h-3 w-full"
                    >
                      <MarkUnderline className="h-full w-full" />
                    </DrawOnView>
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex flex-wrap items-center gap-3 lg:mt-8">
                <button
                  type="button"
                  onClick={previousTrack}
                  aria-label="Canción anterior"
                  className="btn-almanac border-ink px-4 hover:bg-ink hover:text-paper"
                >
                  <IconSkipPrev className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={togglePlayPause}
                  className="btn-almanac min-w-[11rem] border-ink bg-ink text-paper hover:border-calipso hover:bg-calipso hover:text-ink"
                >
                  {isPlaying ? (
                    <IconPause className="h-6 w-6" />
                  ) : (
                    <IconPlay className="h-6 w-6" />
                  )}
                  {isPlaying ? 'Pausar' : 'Reproducir'}
                </button>
                <button
                  type="button"
                  onClick={nextTrack}
                  aria-label="Siguiente canción"
                  className="btn-almanac border-ink px-4 hover:bg-ink hover:text-paper"
                >
                  <IconSkipNext className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* La lista */}
        <section className="relative px-4 pb-20 md:px-8 md:pb-28">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="flex items-end justify-between gap-6 border-b-2 border-ink pb-6 lg:sticky lg:top-nav lg:col-span-4 lg:max-h-view lg:flex-col lg:items-start lg:justify-start lg:self-start lg:border-b-0 lg:pb-8 lg:pt-10">
              <div>
                <h2 className="font-display text-[clamp(3rem,10vw,7rem)] font-black uppercase leading-[0.9] lg:text-[clamp(3rem,min(4.6vw,10vh),5.5rem)]">
                  Nuestra Playlist del Corazón
                </h2>
                <p className="mt-3 text-lg text-dim md:text-xl">
                  {playlist.length} canciones que cuentan nuestra historia
                </p>
              </div>
              <ParallaxIllustration />
            </div>

            <ol className="lg:col-span-8 lg:mt-10 lg:border-t-2 lg:border-ink">
              {playlist.map((track, index) => {
                const active = track.id === currentTrack?.id
                return (
                  <motion.li
                    key={track.id}
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, transform: 'translateY(18px)' }
                    }
                    whileInView={{
                      opacity: 1,
                      transform: 'translateY(0px)',
                    }}
                    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                    transition={{
                      duration: 0.55,
                      delay: (index % 6) * 0.06,
                      ease: EASE_OUT,
                    }}
                    className="border-b border-rule"
                  >
                    <button
                      type="button"
                      onClick={() => playTrack(track)}
                      aria-current={active ? 'true' : undefined}
                      className={`group grid w-full grid-cols-[2.75rem_1fr_auto] items-baseline gap-x-3 px-2 py-5 text-left transition-colors duration-200 md:grid-cols-[5rem_1fr_auto] md:gap-x-6 md:px-4 md:py-6 ${
                        active
                          ? 'bg-marker text-ink'
                          : 'hover:bg-ink hover:text-paper'
                      }`}
                    >
                      <span className="font-display text-2xl font-black tabular-nums md:text-5xl">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0">
                        <span className="block break-words font-display text-2xl font-extrabold uppercase leading-[0.95] md:text-5xl">
                          {track.title}
                        </span>
                        <span
                          className={`mt-1 block text-base md:text-lg ${
                            active ? '' : 'text-dim group-hover:text-rule'
                          }`}
                        >
                          {track.artist}
                        </span>
                        {active && (
                          <motion.span
                            initial={
                              reduceMotion
                                ? { opacity: 0 }
                                : {
                                    opacity: 0,
                                    transform: 'translateY(8px) rotate(-1deg)',
                                  }
                            }
                            animate={{
                              opacity: 1,
                              transform: 'translateY(0px) rotate(-1deg)',
                            }}
                            transition={{ duration: 0.5, ease: EASE_OUT }}
                            className="mt-3 block max-w-2xl font-hand text-2xl leading-snug md:text-4xl"
                          >
                            {track.memory}
                          </motion.span>
                        )}
                      </span>
                      <span className="font-display text-lg font-semibold tabular-nums md:text-2xl">
                        {track.duration}
                      </span>
                    </button>
                  </motion.li>
                )
              })}
            </ol>
          </div>
        </section>
      </main>

      {/* Última hoja */}
      <footer className="bg-ink px-4 pb-28 pt-16 text-paper md:px-8 md:pb-32 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <p className="max-w-3xl font-hand text-4xl leading-snug text-marker md:text-6xl">
            &ldquo;Cada vez que suena esta canción, pienso en ti&rdquo;
          </p>
        </div>
      </footer>
    </>
  )
}
