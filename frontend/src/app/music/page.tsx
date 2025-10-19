'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import Navbar from '@/components/Navbar'

export default function MusicPage() {
  const { isAuthenticated } = useAuth()
  const [currentSong, setCurrentSong] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Controlar reproducción
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentSong])

  // Actualizar tiempo
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  // Cambiar posición
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  // Formatear tiempo
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Reproducir/pausar
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Canción anterior
  const previousSong = () => {
    const newIndex = Math.max(0, currentSong - 1)
    setCurrentSong(newIndex)
    setIsPlaying(true)
  }

  // Siguiente canción
  const nextSong = () => {
    const newIndex = Math.min(ourSongs.length - 1, currentSong + 1)
    setCurrentSong(newIndex)
    setIsPlaying(true)
  }

  // Auto-play siguiente canción
  const handleSongEnd = () => {
    if (currentSong < ourSongs.length - 1) {
      nextSong()
    } else {
      setIsPlaying(false)
    }
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <div className="mb-12 text-center">
          <div className="mb-4 text-6xl">🎵</div>
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              Nuestra Música
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Las canciones que definen nuestro amor
          </p>
        </div>

        {/* Music Player */}
        <div className="mx-auto mb-12 max-w-2xl">
          <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
            {/* Audio Element (oculto) */}
            <audio
              ref={audioRef}
              src={ourSongs[currentSong].src}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleTimeUpdate}
              onEnded={handleSongEnd}
            />

            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-48 w-48 items-center justify-center rounded-lg bg-gradient-to-br from-pink-200 to-orange-200">
                <span className="text-6xl">{ourSongs[currentSong].emoji}</span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                {ourSongs[currentSong].title}
              </h3>
              <p className="mb-1 text-gray-600">
                {ourSongs[currentSong].artist}
              </p>
              <p className="text-sm text-pink-600">
                {ourSongs[currentSong].memory}
              </p>
            </div>

            <div className="mb-6 flex items-center justify-center space-x-4">
              <button
                onClick={previousSong}
                disabled={currentSong === 0}
                className="rounded-full bg-gray-100 p-3 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ⏮️
              </button>
              <button
                onClick={togglePlayPause}
                className="rounded-full bg-pink-600 p-4 text-white transition-colors hover:bg-pink-700"
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button
                onClick={nextSong}
                disabled={currentSong === ourSongs.length - 1}
                className="rounded-full bg-gray-100 p-3 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ⏭️
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-pink-600"
                style={{
                  background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Playlist */}
        <div className="mx-auto mb-12 max-w-4xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
            Nuestra Playlist del Corazón
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
            {ourSongs.map((song, index) => (
              <div
                key={index}
                onClick={() => setCurrentSong(index)}
                className={`cursor-pointer border-b border-gray-100 p-4 transition-colors last:border-b-0 ${
                  index === currentSong ? 'bg-pink-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-pink-200 to-orange-200">
                    <span>{song.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {song.title}
                    </h3>
                    <p className="text-gray-600">{song.artist}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-pink-600">
                      {song.memory}
                    </p>
                    <p className="text-sm text-gray-500">{song.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spotify Integration Info */}
        <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-lg">
          <div className="mb-4 text-4xl">🎧</div>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Próximamente: Integración con Spotify
          </h2>
          <p className="mb-6 text-gray-600">
            Pronto podrás controlar directamente nuestra música de Spotify desde
            aquí
          </p>
          <div className="rounded-lg bg-green-50 p-4">
            <p className="text-sm text-green-700">
              🎵 Spotify Web API integration coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ourSongs = [
  {
    emoji: '�',
    title: 'El Perro Duque - Doggy Style',
    artist: '31 Minutos',
    memory: 'Nuestra canción favorita 🎵',
    duration: '3:24',
    src: '/music/31 minutos - El perro Duque - Doggy style.mp3',
  },
  {
    emoji: '�💕',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    memory: 'Nuestra canción',
    duration: '4:23',
    src: '/music/perfect.mp3', // Agregar archivo si existe
  },
  {
    emoji: '🌟',
    title: 'All of Me',
    artist: 'John Legend',
    memory: 'Primera cita',
    duration: '4:29',
    src: '/music/all-of-me.mp3', // Agregar archivo si existe
  },
  {
    emoji: '💖',
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
    memory: 'Aniversario',
    duration: '4:41',
    src: '/music/thinking-out-loud.mp3', // Agregar archivo si existe
  },
  {
    emoji: '🎵',
    title: 'A Thousand Years',
    artist: 'Christina Perri',
    memory: 'Momento especial',
    duration: '4:45',
    src: '/music/a-thousand-years.mp3', // Agregar archivo si existe
  },
]
