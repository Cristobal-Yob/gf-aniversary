'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useState } from 'react'
import { useMusicPlayer } from '@/contexts/MusicPlayerContext'
import {
  IconChevronDown,
  IconPause,
  IconPlay,
  IconSkipNext,
  IconSkipPrev,
  IconVolume,
  IconVolumeMute,
} from '@/components/icons'
import SpinningVinyl from '@/components/music/SpinningVinyl'
import RuleSlider from '@/components/music/RuleSlider'
import { formatTime } from '@/components/music/formatTime'
import {
  discAccent,
  discPosition,
  groupByDisc,
  pad2,
} from '@/components/music/discs'
import { EASE_OUT } from '@/lib/site'

const iconButton =
  'flex h-10 w-10 shrink-0 items-center justify-center transition-colors duration-150 hover:bg-paper hover:text-ink active:bg-marker active:text-ink'

export default function GlobalMusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    volume,
    playlist,
    playTrack,
    togglePlayPause,
    nextTrack,
    previousTrack,
    seekTo,
    setVolume,
  } = useMusicPlayer()
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [isExpanded, setIsExpanded] = useState(false)
  const [lastVolume, setLastVolume] = useState(0.7)
  const sheetId = useId()

  useEffect(() => {
    if (!isExpanded) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isExpanded])

  if (!currentTrack) return null

  // En /music el tocadiscos grande es el que gira: un solo elemento en movimiento
  const spinHere = isPlaying && pathname !== '/music'
  const position = discPosition(currentTrack, playlist)
  const elapsed = `${formatTime(progress)} de ${formatTime(duration)}`

  const toggleMute = () => {
    if (volume > 0) {
      setLastVolume(volume)
      setVolume(0)
    } else {
      setVolume(lastVolume || 0.7)
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 text-paper">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="music-sheet"
            id={sheetId}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, transform: 'translateY(24px)' }
            }
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, transform: 'translateY(24px)' }
            }
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="max-h-view overflow-y-auto overscroll-contain border-t-2 border-paper bg-ink"
          >
            <div className="mx-auto max-w-7xl px-4 pb-4 pt-6 md:px-8">
              <p className="font-display text-3xl font-extrabold uppercase leading-[0.9] md:text-5xl">
                {currentTrack.title}
              </p>
              {currentTrack.artist && (
                <p className="mt-1 text-base text-rule">{currentTrack.artist}</p>
              )}
              {currentTrack.memory && (
                <p className="mt-4 max-w-2xl font-hand text-3xl leading-snug text-marker md:text-4xl">
                  {currentTrack.memory}
                </p>
              )}

              {/* Controles que en el teléfono no caben en la barra */}
              <div className="mt-5 flex items-center gap-3 md:hidden">
                <span className="w-10 text-xs tabular-nums text-rule">
                  {formatTime(progress)}
                </span>
                <RuleSlider
                  value={progress}
                  max={duration}
                  onChange={seekTo}
                  step={5}
                  label="Posición de la canción"
                  valueText={elapsed}
                  className="flex-1"
                />
                <span className="w-10 text-right text-xs tabular-nums text-rule">
                  {formatTime(duration)}
                </span>
              </div>

              {groupByDisc(playlist).map(({ disc, tracks }) => (
                <section key={disc.id} className="mt-6">
                  <h3 className="flex items-baseline justify-between gap-3 border-b-2 border-paper pb-1 font-display text-lg font-bold uppercase tracking-wide">
                    <span>{disc.title}</span>
                    <span className="truncate text-sm font-semibold text-rule">
                      {disc.subtitle}
                    </span>
                  </h3>
                  <ol>
                    {tracks.map((track, index) => {
                      const active = track.id === currentTrack.id
                      return (
                        <li key={track.id} className="border-b border-rule/40">
                          <button
                            type="button"
                            onClick={() => playTrack(track)}
                            aria-current={active ? 'true' : undefined}
                            className={`grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 px-2 py-2.5 text-left transition-colors duration-150 ${
                              active
                                ? 'bg-marker text-ink'
                                : 'hover:bg-paper hover:text-ink'
                            }`}
                          >
                            <span className="font-display text-lg font-bold tabular-nums">
                              {pad2(index + 1)}
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate font-display text-xl font-bold uppercase leading-tight">
                                {track.title}
                              </span>
                              {track.artist && (
                                <span className="block truncate text-sm opacity-80">
                                  {track.artist}
                                </span>
                              )}
                            </span>
                            <span className="text-sm tabular-nums">
                              {track.duration}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ol>
                </section>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative border-t-2 border-paper bg-ink">
        {/* Progreso en el teléfono: solo la regla, sin controles */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-0.5 origin-left bg-marker md:hidden"
          style={{
            transform: `scaleX(${duration > 0 ? progress / duration : 0})`,
          }}
        />

        <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-3 md:gap-4 md:px-8">
          <button
            type="button"
            onClick={() => setIsExpanded(open => !open)}
            aria-expanded={isExpanded}
            aria-controls={sheetId}
            aria-label={
              isExpanded
                ? 'Cerrar recuerdo y lista de canciones'
                : 'Ver recuerdo y lista de canciones'
            }
            className="group flex min-w-0 flex-1 items-center gap-3 text-left md:flex-none md:basis-72"
          >
            <SpinningVinyl
              spinning={spinHere}
              className={`h-11 w-11 shrink-0 text-paper [--groove:theme(colors.rule)] [--hole:theme(colors.ink)] ${discAccent[currentTrack.disc]}`}
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-display text-xl font-extrabold uppercase leading-none">
                {currentTrack.title}
              </span>
              <span className="block truncate text-sm text-rule">
                {currentTrack.artist || `${position.title} · ${pad2(position.number)} / ${pad2(position.total)}`}
              </span>
            </span>
            <IconChevronDown
              className={`hidden h-5 w-5 shrink-0 transition-transform duration-200 ease-out sm:block ${
                isExpanded ? '' : 'rotate-180'
              }`}
            />
          </button>

          <div className="flex items-center">
            <button
              type="button"
              onClick={previousTrack}
              aria-label="Canción anterior"
              className={`${iconButton} hidden md:flex`}
            >
              <IconSkipPrev className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={togglePlayPause}
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              className="flex h-11 w-11 shrink-0 items-center justify-center bg-paper text-ink transition-colors duration-150 hover:bg-marker"
            >
              {isPlaying ? (
                <IconPause className="h-5 w-5" />
              ) : (
                <IconPlay className="h-5 w-5" />
              )}
            </button>
            <button
              type="button"
              onClick={nextTrack}
              aria-label="Siguiente canción"
              className={iconButton}
            >
              <IconSkipNext className="h-5 w-5" />
            </button>
          </div>

          <div className="hidden min-w-0 flex-1 items-center gap-3 md:flex">
            <span className="w-11 text-right text-sm tabular-nums text-rule">
              {formatTime(progress)}
            </span>
            <RuleSlider
              value={progress}
              max={duration}
              onChange={seekTo}
              step={5}
              label="Posición de la canción"
              valueText={elapsed}
              className="flex-1"
            />
            <span className="w-11 text-sm tabular-nums text-rule">
              {formatTime(duration)}
            </span>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={volume > 0 ? 'Silenciar' : 'Activar sonido'}
              className={iconButton}
            >
              {volume > 0 ? (
                <IconVolume className="h-5 w-5" />
              ) : (
                <IconVolumeMute className="h-5 w-5" />
              )}
            </button>
            <RuleSlider
              value={volume}
              max={1}
              onChange={setVolume}
              step={0.05}
              label="Volumen"
              valueText={`${Math.round(volume * 100)}%`}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
