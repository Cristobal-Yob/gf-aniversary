'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useAuth } from '@/contexts/AuthContext'
import {
  birthdayTrack,
  playlist as basePlaylist,
  type Track,
} from '@/content/playlist'

export type { Track }

interface MusicPlayerContextType {
  currentTrack: Track | null
  isPlaying: boolean
  progress: number
  duration: number
  volume: number
  playlist: Track[]
  playTrack: (track: Track) => void
  togglePlayPause: () => void
  nextTrack: () => void
  previousTrack: () => void
  seekTo: (time: number) => void
  setVolume: (volume: number) => void
  audioRef: React.RefObject<HTMLAudioElement>
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(
  undefined
)

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext)
  if (!context) {
    throw new Error('useMusicPlayer must be used within MusicPlayerProvider')
  }
  return context
}

// 2 de diciembre: el cumpleaños de Josefa (diciembre es el mes 11)
const isBirthdayToday = () => {
  const today = new Date()
  return today.getMonth() === 11 && today.getDate() === 2
}

const defaultTrack = basePlaylist.find(t => t.id === '1') ?? basePlaylist[0]

export const MusicPlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth()

  // La fecha se revisa en el navegador: el proveedor se prerenderiza al compilar
  const [mounted, setMounted] = useState(false)
  const [isBirthday, setIsBirthday] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(defaultTrack)
  const [isPlaying, setIsPlaying] = useState(true) // Intenta reproducir al entrar
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.7)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (isBirthdayToday()) {
      setIsBirthday(true)
      setCurrentTrack(birthdayTrack)
    }
    setMounted(true)
  }, [])

  const playlist = useMemo(
    () => (isBirthday ? [birthdayTrack, ...basePlaylist] : basePlaylist),
    [isBirthday]
  )

  // Referencias para que los manejadores de eventos lean siempre el estado actual
  const playlistRef = useRef(playlist)
  const currentTrackRef = useRef(currentTrack)
  playlistRef.current = playlist
  currentTrackRef.current = currentTrack

  const playTrack = useCallback((track: Track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }, [])

  const togglePlayPause = useCallback(() => {
    setIsPlaying(playing => !playing)
  }, [])

  const stepTrack = useCallback(
    (step: 1 | -1) => {
      const list = playlistRef.current
      const current = currentTrackRef.current
      if (!current || list.length === 0) return
      const index = list.findIndex(t => t.id === current.id)
      const nextIndex = (index + step + list.length) % list.length
      playTrack(list[nextIndex])
    },
    [playTrack]
  )

  const nextTrack = useCallback(() => stepTrack(1), [stepTrack])
  const previousTrack = useCallback(() => stepTrack(-1), [stepTrack])

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(time)) return
    audio.currentTime = time
    setProgress(time)
  }, [])

  const setVolume = useCallback((vol: number) => {
    setVolumeState(Math.min(1, Math.max(0, vol)))
  }, [])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  // Eventos del elemento de audio: se registran una sola vez
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => setProgress(audio.currentTime)
    const updateDuration = () =>
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
    const handlePlay = () => setIsPlaying(true)
    const handleEnded = () => stepTrack(1)

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('durationchange', updateDuration)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('durationchange', updateDuration)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [stepTrack])

  // Sincroniza con el elemento al montar y al cambiar de canción: el audio
  // prerenderizado puede haber cargado sus metadatos antes de la hidratación
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    setProgress(audio.currentTime || 0)
    setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
  }, [currentTrack?.id])

  // Al iniciar sesión, vuelve a intentar reproducir después de un segundo
  useEffect(() => {
    if (!isAuthenticated) return
    const timer = setTimeout(() => setIsPlaying(true), 1000)
    return () => clearTimeout(timer)
  }, [isAuthenticated])

  // Controlar reproducción
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !mounted) return

    if (!isPlaying) {
      audio.pause()
      return
    }

    audio.play().catch((error: unknown) => {
      // AbortError: otra carga interrumpió esta reproducción; la siguiente la reemplaza.
      // Cualquier otro rechazo (p. ej. el navegador bloquea el autoplay) deja el
      // reproductor en pausa, sin ruido en la consola.
      if (error instanceof DOMException && error.name === 'AbortError') return
      setIsPlaying(false)
    })
  }, [isPlaying, currentTrack, mounted])

  // Atajo de teclado: espacio para play/pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === 'Space' &&
        currentTrackRef.current &&
        e.target === document.body
      ) {
        e.preventDefault()
        togglePlayPause()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [togglePlayPause])

  const value = useMemo(
    () => ({
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
      audioRef,
    }),
    [
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
    ]
  )

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
      {/* Elemento de audio global */}
      <audio ref={audioRef} src={currentTrack?.src} preload="metadata" />
    </MusicPlayerContext.Provider>
  )
}
